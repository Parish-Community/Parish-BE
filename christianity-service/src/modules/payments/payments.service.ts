import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PaymentStatus, TYPEORM } from '@/core/constants';
import { AppResponse } from '@/core/app.response';
import { Payment } from './payments.entity';
import { StripeProvider } from './providers/stripe.provider';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/req.dto';
import { IAuthPayload } from '../account/account.interface';
import { Account } from '../account/account.entity';

@Injectable()
export class PaymentsService {
  private _dataSource: DataSource;
  private _paymentService: Repository<Payment>;
  private _accountRepository: Repository<Account>;
  constructor(
    @Inject(TYPEORM) dataSource: DataSource,
    private stripeProvider: StripeProvider,
  ) {
    this._dataSource = dataSource;
    this._paymentService = dataSource.getRepository(Payment);
    this._accountRepository = dataSource.getRepository(Account);
  }

  async createPayment(payload: CreatePaymentDto, account: IAuthPayload) {
    let stripeSession: Stripe.Response<Stripe.Checkout.Session>;
    try {
      const accountRecord = await this._accountRepository.findOneBy({
        id: account.accountId,
      });
      stripeSession = await this.createStripeSession(payload, account);
      const newPayment = {
        stripeSessionId: stripeSession.id,
        amount: payload.amount,
        currency: payload.currency,
        accountId: account.accountId,
        description: payload.description,
        initiatedAt: this.getCurrentTimestamp(),
        paymentStatus: PaymentStatus.Pending,
        finalisedAt: null,
      };

      await this._paymentService.save(newPayment);

      return { url: stripeSession.url };
    } catch (error) {
      Logger.error(error);
      await this.expireStripeSession(stripeSession);

      throw new InternalServerErrorException(error);
    }
  }

  private async createStripeSession(
    payload: CreatePaymentDto,
    account: IAuthPayload,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return this.stripeProvider.getInstance().checkout.sessions.create({
      success_url: `http://localhost:3000/payments/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payments/success?id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ['card'],
      mode: 'payment',
      currency: payload.currency,
      customer_email: account.email,
      line_items: [
        {
          price_data: {
            unit_amount: payload.amount,
            currency: payload.currency,
            product_data: {
              name: 'One time checkout',
            },
          },
          quantity: 1,
        },
      ],
    });
  }

  private async expireStripeSession(
    session: Stripe.Response<Stripe.Checkout.Session>,
  ): Promise<void> {
    if (session) {
      await this.stripeProvider
        .getInstance()
        .checkout.sessions.expire(session.id);

      Logger.debug('Stripe session cancelled');
    }
  }

  private getCurrentTimestamp(): any {
    return new Date();
  }
}
