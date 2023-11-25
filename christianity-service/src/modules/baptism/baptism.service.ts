import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AppResponse } from '@/core/app.response';
import { Currency, GENDER, PaymentStatus, TYPEORM } from '@/core/constants';
import { Baptism } from './baptism.entity';
import { Account } from '../account/account.entity';
import { Parishioner } from '../parishioner/parishioner.entity';
import {
  CreateBaptismReqDto,
  EmailScheduleDto,
  GetProfilesReqDto,
  UpdateBaptismReqDto,
} from './dto/req.dto';
import { ExtraQueryBuilder } from '@/core/utils/querybuilder.typeorm';
import { ErrorHandler } from '@/core/common/error';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ParishCluster } from '../parish-cluster/parish-cluster.entity';
import { CronJob } from 'cron';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class BaptismService {
  private _dataSource: DataSource;
  private _profileRepository: Repository<Parishioner>;
  private _accountRepository: Repository<Account>;
  private _baptismRepository: Repository<Baptism>;
  private readonly _parishClusterRepository: Repository<ParishCluster>;
  private readonly _mailerService: MailerService;
  constructor(
    @Inject(TYPEORM) dataSource: DataSource,
    mailerService: MailerService,
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this._dataSource = dataSource;
    this._profileRepository = dataSource.getRepository(Parishioner);
    this._accountRepository = dataSource.getRepository(Account);
    this._baptismRepository = dataSource.getRepository(Baptism);
    this._mailerService = mailerService;
    this._parishClusterRepository = dataSource.getRepository(ParishCluster);
  }
  private readonly logger = new Logger(BaptismService.name);

  async getBaptisms(queries: GetProfilesReqDto): Promise<any> {
    try {
      const userTableFields: Array<string> = this._dataSource
        .getMetadata(Baptism)
        .columns.map((column) => {
          return column.propertyName;
        });
      const mappingUserFieldType: Array<string> = this._dataSource
        .getMetadata(Baptism)
        .columns.map((column) => {
          return `${column.propertyName}:${column.type}`;
        });

      let query: SelectQueryBuilder<Baptism> = this._dataSource
        .createQueryBuilder()
        .select([
          'baptism.id',
          'baptism.createdAt',
          'baptism.parishionerId',
          'baptism.isAccepted',
          'baptism.priestBaptism',
          'baptism.parish_clusterId',
          'baptism.dateBaptism',
          'parishioner.fullname',
          'parishioner.christianName',
          'parishioner.name_father',
          'parishioner.name_mother',
          'parishioner.phonenumber',
          'parishioner.dateOfBirth',
          'parishioner.gender',
          'parishioner.avatar',
          'parishioner.address',
          'parishioner.god_parent',
          'parishioner.parish',
          'parish_cluster.parish_clusterId',
          'parish_cluster.name',
          'parishioner.position',
          'account.fullname',
          'account.christianName',
          'account.email',
          'account.phonenumber',
        ])
        .from(Baptism, 'baptism')
        .innerJoin(
          'baptism.parishioner',
          'parishioner',
          'baptism.parishionerId = parishioner.id',
        )
        .innerJoin(
          'baptism.account',
          'account',
          'baptism.accountId = account.id',
        )
        .innerJoin(
          'parishioner.parish_cluster',
          'parish_cluster',
          'parishioner.parish_clusterId = parish_cluster.parish_clusterId',
        );

      query = ExtraQueryBuilder.addWhereAnd<Baptism>(
        query,
        mappingUserFieldType,
        queries,
        'baptism',
      );

      query = ExtraQueryBuilder.addWhereOr<Baptism>(
        query,
        ['parishioner.fullname', 'parishioner.dateOfBirth'],
        queries,
      );

      if (queries.sortBy) {
        if (!userTableFields.includes(queries.sortBy)) {
          return AppResponse.setUserErrorResponse<any>(
            ErrorHandler.invalid(queries.sortBy),
          );
        }
        query.orderBy(
          `parishioner.${queries.sortBy}`,
          queries.order === 'ASC' ? 'ASC' : 'DESC',
        );
      } else {
        query.orderBy('baptism.createdAt', 'DESC');
      }

      const { fullQuery, pages, nextPage, totalDocs, prevPage, currentPage } =
        await ExtraQueryBuilder.paginateBy<Baptism>(query, {
          page: queries.page,
          pageSize: queries.pageSize,
        });
      const baptism: any[] = await fullQuery.getMany();

      return AppResponse.setSuccessResponse<any>(baptism, {
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

  async getBaptismById(id: number): Promise<any> {
    try {
      const baptism = await this._baptismRepository.findOne({
        where: { id: id },
      });

      return AppResponse.setSuccessResponse<any>(baptism);
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async getBaptismByAccountId(accountId: number): Promise<any> {
    try {
      const baptism = await this._baptismRepository.find({
        where: { accountId: accountId },
        relations: ['parishioner'],
      });

      return AppResponse.setSuccessResponse<any>(baptism);
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async createBaptism(
    accountId: number,
    payload: CreateBaptismReqDto,
  ): Promise<any> {
    try {
      const gender = (() => {
        switch (payload.christianName) {
          case 'Anna':
            return GENDER.FEMALE;
          case 'Maria':
            return GENDER.FEMALE;
          case 'Teresa':
            return GENDER.FEMALE;
          case 'Cecilia':
            return GENDER.FEMALE;
          default:
            return GENDER.MALE;
        }
      })();

      const parish_clusterId = (() => {
        switch (payload.parishCluster) {
          case 'Tân Lộc':
            return 1;
          case 'Tràng Thị':
            return 2;
          case 'Tràng Lưu':
            return 3;
          case 'Giang Lĩnh':
            return 4;
          case 'Đồng Lưu':
            return 5;
          case 'Đô Khê':
            return 6;
          default:
            return 0;
        }
      })();

      const checkProfile = await this._profileRepository.findOne({
        where: {
          fullname: payload.fullname,
          christianName: payload.christianName,
          name_father: payload.name_father,
          name_mother: payload.name_mother,
          parish_clusterId: parish_clusterId,
        },
      });

      if (checkProfile) {
        const checkBaptism = await this._baptismRepository.findOne({
          where: { parishionerId: checkProfile.id },
        });

        if (checkBaptism) {
          return AppResponse.setAppErrorResponse<any>(
            'This profile has been baptized',
          );
        }
      }

      const queryRunner = this._dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction('SERIALIZABLE');

      const addNewProfile = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Parishioner)
        .values({
          fullname: payload.fullname,
          christianName: payload.christianName,
          name_father: payload.name_father,
          name_mother: payload.name_mother,
          parish_clusterId: parish_clusterId,
          god_parent: payload.god_parent,
          dateOfBirth: payload.dateOfBirth,
          gender: gender,
          parish: 'Tràng Lưu',
          diocese: 'Hà Tĩnh',
          address: payload.address,
        })
        .execute();

      const profileId = addNewProfile.identifiers[0].id;

      const addNewBaptism = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Baptism)
        .values({
          parishionerId: profileId,
          accountId: accountId,
        })
        .execute();

      await queryRunner.commitTransaction();

      return AppResponse.setSuccessResponse<any>(addNewBaptism);
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async acceptBaptism(id: number, payload: UpdateBaptismReqDto): Promise<any> {
    try {
      const baptism = await this._baptismRepository.findOne({
        where: { id: id },
      });

      if (!baptism) {
        return AppResponse.setAppErrorResponse<any>('Baptism not found', 404);
      }

      const data = {
        priestBaptism: payload.priestBaptism,
        dateBaptism: payload.dateBaptism,
        parish_clusterId: payload.parish_clusterId,
        isAccepted: true,
      };

      await this._baptismRepository.update({ id: id }, data);

      const parishClusterName = await this._parishClusterRepository.findOne({
        where: { parish_clusterId: payload.parish_clusterId },
      });

      const emailData = {
        regisName: payload.regisname,
        christianName: payload.christianName,
        fullname: payload.fullname,
        parishClusterName: parishClusterName.name,
        priestBaptism: payload.priestBaptism,
        dateBaptism: payload.dateBaptism,
      };

      await this.sendAcceptedToEmail(payload.email, emailData);

      return AppResponse.setSuccessResponse<any>(
        null,
        'Accept baptism success',
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async deleteBaptism(id: number): Promise<any> {
    try {
      const baptism = await this._baptismRepository.findOne({
        where: { id: id },
      });

      if (!baptism) {
        return AppResponse.setAppErrorResponse<any>('Baptism not found', 404);
      }

      await this._baptismRepository.delete({ id: id });

      return AppResponse.setSuccessResponse<any>(
        null,
        'Delete baptism success',
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async importData(data: any): Promise<any> {
    try {
      await this._baptismRepository.save(data);
      const res = {
        status: 200,
        message: 'Import data successfully',
      };
      return res;
    } catch (error) {
      throw error;
    }
  }

  private async sendAcceptedToEmail(
    sendEmailTo: string,
    emailData: any,
  ): Promise<void> {
    console.log('send email');
    try {
      await this._mailerService.sendMail({
        to: sendEmailTo,
        from: this.configService.get<string>('MAILER_DEFAULT_FROM'),
        subject: 'Giáo xứ Tràng Lưu - Xác nhận đơn xin rửa tội',
        template: 'index',
        context: {
          regisName: emailData.regisName,
          christianName: emailData.christianName,
          fullname: emailData.fullname,
          parishClusterName: emailData.parishClusterName,
          priestBaptism: emailData.priestBaptism,
          dateBaptism: emailData.dateBaptism,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  addCronJob(name: string, dates: number) {
    const job: any = new CronJob(`${0} 0 ${8} ${dates} 11 *`, () => {
      this.logger.warn(`Play time (${dates}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each minute at ${dates} dates!`);

    const jobs = this.schedulerRegistry.getCronJobs();
    console.log(jobs);

    const res = {
      status: 200,
      message: `job ${name} added for each minute at ${dates} seconds!`,
    };

    return res;
  }

  getCrons() {
    const jobsList = [];
    const jobs = this.schedulerRegistry.getCronJobs();
    // console.log(jobs);
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates()[0].toJSDate().toISOString();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
      jobsList.push({ name: key, time: next });
    });
    // const jobs = this.schedulerRegistry.getCronJobs();
    // jobs.forEach((value, key) => {
    //   let next;
    //   try {
    //     next = new Date(value.nextDates()[0].toJSDate().toISOString());
    //   } catch (e) {
    //     next = 'error: next fire date is in the past!';
    //   }
    //   this.logger.log(`job: ${key} -> next: ${next}`);
    //   jobsList.push({ name: key, time: next });
    // });

    const res = {
      status: 200,
      message: 'get all jobs',
      data: jobsList,
    };

    return res;
  }

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    const date = new Date(emailSchedule.date);
    const scheduleDate = date.setMilliseconds(date.getMilliseconds() - 1);
    console.log(typeof scheduleDate);
    // new Date((d = new Date()).setMilliseconds(d.getMilliseconds() - 1))
    console.log(date);
    const job: any = new CronJob(`${15} * * * * *`, async () => {
      await this._mailerService.sendMail({
        to: 'duytuanndt20@gmail.com',
        from: this.configService.get<string>('MAILER_DEFAULT_FROM'),
        subject: 'Giáo xứ Tràng Lưu - Xác nhận đơn xin rửa tội',
        template: 'mail',
        // context: {
        //   regisName: 'ScheduleModule',
        //   christianName: 'ScheduleModule',
        //   fullname: 'ScheduleModule',
        //   parishClusterName: 'ScheduleModule',
        //   priestBaptism: 'ScheduleModule',
        //   dateBaptism: 'ScheduleModule',
        // },
      });
    });

    this.schedulerRegistry.addCronJob(`${Date.now()}-${'Reminder-mail'}`, job);
    job.start();
    const schedulerRes = {
      status: 200,
      message: 'Schedule email successfully',
    };
    return schedulerRes;
  }

  cancelAllScheduledEmails() {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
      job.stop();
    });
    const res = {
      status: 200,
      message: 'Cancel all scheduled emails',
    };
    return res;
  }
}
