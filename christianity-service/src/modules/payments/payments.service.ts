import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Currency, PaymentStatus, TYPEORM } from '@/core/constants';
import { AppResponse } from '@/core/app.response';
import { Payment } from './payments.entity';
import { StripeProvider } from './providers/stripe.provider';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/req.dto';
import { IAuthPayload } from '../account/account.interface';
import { Account } from '../account/account.entity';
import { ICreateCustomerStripe } from './payments.interface';

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

  async getPaymentsDonations(): Promise<any> {
    try {
      const payments = await this._paymentService.find({
        relations: ['account'],
      });

      return AppResponse.setSuccessResponse<any>(payments);
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async getPaymentsOfUser(accountId: number): Promise<any> {
    try {
      const payments = await this._paymentService.find({
        where: { accountId: accountId },
      });

      const data = [];
      payments.forEach((payment) => {
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(payment.amount / 100);
        data.push({
          id: payment.id,
          amount: formattedAmount,
          description: payment.description,
          initiatedAt: payment.initiatedAt,
          finalisedAt: payment.finalisedAt,
          paymentStatus: payment.paymentStatus,
          accountId: payment.accountId,
        });
      });

      return AppResponse.setSuccessResponse<any>(data);
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async getTotalDonations(accountId: number): Promise<any> {
    try {
      const payments = await this._paymentService.find({
        where: { accountId: accountId },
      });

      let total = 0;
      payments.forEach((payment) => {
        total += payment.amount;
      });

      const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(total / 100);

      const res = {
        total: formattedAmount,
      };

      return AppResponse.setSuccessResponse<any>(res);
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async createPayment(payload: CreatePaymentDto, account: IAuthPayload) {
    let stripeSession: Stripe.Response<Stripe.Checkout.Session>;
    let customerId: any;
    try {
      const paymentRecord = await this._paymentService.findOneBy({
        accountId: account.accountId,
      });

      if (!paymentRecord) {
        const customerData: ICreateCustomerStripe = {
          fullname: account.fullname,
          email: account.email,
          description: 'Customer for one time checkout',
        };
        const customer = await this.createCustomerStripe(customerData);
        customerId = customer.id;
      } else {
        customerId = paymentRecord.customerId;
      }

      // const cardPaymentMethod = await this.stripeProvider
      //   .getInstance()
      //   .paymentMethods.create({
      //     type: 'card',
      //     card: {
      //       number: payload.cardNumber,
      //       exp_month: payload.exp_month,
      //       exp_year: payload.exp_year,
      //       cvc: payload.cvc,
      //     },
      //   });
      // console.log(cardPaymentMethod);

      const paymentIntent = await this.stripeProvider
        .getInstance()
        .paymentIntents.create({
          amount: payload.amount,
          currency: 'usd',
          payment_method_types: ['card'],
          customer: customerId,
          description: payload.description,
          receipt_email: account.email,
          // payment_method: cardPaymentMethod.id,
          confirm: true,
          payment_method: 'pm_card_visa',
        });

      const newPayment = {
        stripeSessionId: paymentIntent.id,
        amount: payload.amount,
        currency: Currency.Usd,
        accountId: account.accountId,
        description: payload.description,
        initiatedAt: this.getCurrentTimestamp(),
        paymentStatus: PaymentStatus.Paid,
        finalisedAt: null,
        customerId: customerId,
      };

      await this._paymentService.save(newPayment);

      return { status: 200, paymentIntent: paymentIntent };
    } catch (error) {
      Logger.error(error);
      await this.expireStripeSession(stripeSession);

      throw new InternalServerErrorException(error);
    }
  }

  // async createPayment(payload: CreatePaymentDto, account: IAuthPayload) {
  //   let stripeSession: Stripe.Response<Stripe.Checkout.Session>;
  //   let customer: any;
  //   try {
  //     const paymentRecord = await this._paymentService.findOneBy({
  //       accountId: account.accountId,
  //     });

  //     if (!paymentRecord) {
  //       const customerData: ICreateCustomerStripe = {
  //         fullname: account.fullname,
  //         email: account.email,
  //         description: 'Customer for one time checkout',
  //       };
  //       customer = await this.createCustomerStripe(customerData);
  //     }

  //     stripeSession = await this.createStripeSession(payload, account);
  //     const newPayment = {
  //       stripeSessionId: stripeSession.id,
  //       amount: payload.amount,
  //       currency: payload.currency,
  //       accountId: account.accountId,
  //       description: payload.description,
  //       initiatedAt: this.getCurrentTimestamp(),
  //       paymentStatus: PaymentStatus.Pending,
  //       finalisedAt: null,
  //     };

  //     await this._paymentService.save(newPayment);

  //     return { status: 200, url: stripeSession.url };
  //   } catch (error) {
  //     Logger.error(error);
  //     await this.expireStripeSession(stripeSession);

  //     throw new InternalServerErrorException(error);
  //   }
  // }

  private async createCustomerStripe(
    customerData: ICreateCustomerStripe,
  ): Promise<any> {
    try {
      const customer = await this.stripeProvider
        .getInstance()
        .customers.create({
          name: customerData.fullname,
          email: customerData.email,
          description: customerData.description,
        });

      return customer;
    } catch (error) {
      console.log(error);
    }
  }

  private async getCustomerStripe(): Promise<any> {
    try {
    } catch (error) {
      console.log(error);
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
      currency: 'usd',
      customer_email: account.email,
      line_items: [
        {
          price_data: {
            unit_amount: payload.amount,
            currency: 'usd',
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
