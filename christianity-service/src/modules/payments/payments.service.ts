import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Currency, PaymentStatus, TYPEORM } from '@/core/constants';
import { AppResponse } from '@/core/app.response';
import { Payment } from './payments.entity';
import { StripeProvider } from './providers/stripe.provider';
import Stripe from 'stripe';
import { CreatePaymentDto, GetPaymentsReqDto } from './dto/req.dto';
import { IAuthPayload } from '../account/account.interface';
import { Account } from '../account/account.entity';
import { ICreateCustomerStripe } from './payments.interface';
import { ExtraQueryBuilder } from '@/core/utils/querybuilder.typeorm';
import { ErrorHandler } from '@/core/common/error';
// import { generateCSV } from '@/core/utils/export.csv';
import { createObjectCsvWriter } from 'csv-writer';
import * as json2csv from 'json2csv';
import * as fs from 'fs';

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

  async getPaymentsDonations(queries: GetPaymentsReqDto): Promise<any> {
    try {
      const userTableFields: Array<string> = this._dataSource
        .getMetadata(Payment)
        .columns.map((column) => {
          return column.propertyName;
        });
      const mappingUserFieldType: Array<string> = this._dataSource
        .getMetadata(Payment)
        .columns.map((column) => {
          return `${column.propertyName}:${column.type}`;
        });

      let query: SelectQueryBuilder<Payment> = this._dataSource
        .createQueryBuilder()
        .select([
          'payment.id',
          'payment.amount',
          'payment.createdAt',
          'payment.description',
          'payment.initiatedAt',
          'payment.finalisedAt',
          'payment.paymentStatus',
          'payment.accountId',
          'account.fullname',
          'account.christianName',
          'account.email',
          'account.phonenumber',
          'account.parishionerId',
          'parishioner.avatar',
          'parishioner.parish_clusterId',
          'parish_cluster.parish_clusterId',
          'parish_cluster.name',
        ])
        .from(Payment, 'payment')
        .innerJoin(
          'payment.account',
          'account',
          'payment.accountId = account.id',
        )
        .innerJoin(
          'account.parishioner',
          'parishioner',
          'account.parishionerId = parishioner.id',
        )
        .innerJoin(
          'parishioner.parish_cluster',
          'parish_cluster',
          'parishioner.parish_clusterId = parish_cluster.parish_clusterId',
        );

      // if (queries.searchText) {
      //   query = query.where(
      //     `account.fullname ILIKE '%${queries.searchText}%' OR account.email ILIKE '%${queries.searchText}%'`,
      //   );
      // }

      query = ExtraQueryBuilder.addWhereAnd<Payment>(
        query,
        mappingUserFieldType,
        queries,
        'payment',
      );

      query = ExtraQueryBuilder.addWhereOr<Payment>(
        query,
        ['payment.initiatedAt', 'account.fullname', 'payment.paymentStatus'],
        queries,
      );
      if (queries.sortBy) {
        if (!userTableFields.includes(queries.sortBy)) {
          return AppResponse.setUserErrorResponse<any>(
            ErrorHandler.invalid(queries.sortBy),
          );
        }
        query.orderBy(
          `payment.${queries.sortBy}`,
          queries.order === 'ASC' ? 'ASC' : 'DESC',
        );
      } else {
        query.orderBy('payment.createdAt', 'DESC');
      }

      const { fullQuery, pages, nextPage, totalDocs, prevPage, currentPage } =
        await ExtraQueryBuilder.paginateBy<Payment>(query, {
          page: queries.page,
          pageSize: queries.pageSize,
        });
      const payments: any[] = await fullQuery.getMany();

      const data = [];
      payments.forEach((payment) => {
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(payment.amount / 100);
        data.push({
          ...payment,
          amount: formattedAmount,
        });
      });

      return AppResponse.setSuccessResponse<any>(data, {
        page: currentPage,
        pageSize: queries.pageSize,
        totalPages: pages,
        nextPage: nextPage,
        prevPage: prevPage,
        totalDocs: totalDocs,
      });
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
        initiatedAt: new Date(),
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

  async generateCSV(
    data: any[],
    filename: string,
    headers: string[],
  ): Promise<any> {
    try {
      const csvWriter = createObjectCsvWriter({
        path: filename,
        header: headers.map((header) => ({ id: header, title: header })),
      });

      const file = await csvWriter.writeRecords(data);
      console.log(file);
      return { status: 200, message: 'CSV file created successfully' };
    } catch (error) {
      return { status: 500, message: 'Error exporting to CSV' };
    }
  }

  async convertJsonToCsv(
    data: any[],
    fields: string[],
    fileName: string,
  ): Promise<any> {
    try {
      const csv = json2csv.parse(data, { fields });
      this.writeJsonFile(fileName, csv);
    } catch (err) {
      return { status: 500, message: 'Error exporting to CSV' };
    }
  }

  private writeJsonFile = (jsonfile, item) => {
    const savePath = `./src/modules/payments/jsons/${jsonfile}`;

    fs.appendFile(savePath, ',\n' + JSON.stringify(item), function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  };

  async getTotalAmount(): Promise<any> {
    try {
      const payments = await this._paymentService.find();
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
        status: 200,
      };

      return res;
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }
}
