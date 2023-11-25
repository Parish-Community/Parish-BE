import { Inject, Injectable } from '@nestjs/common';
import { POSITION_PARISH, STATUS_COUPLE, TYPEORM } from '../../core/constants';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AppResponse } from '@/core/app.response';
import { ErrorHandler } from '@/core/common/error';
import { Course } from './entities/course.entity';
import { GetCourseResDto } from './dto/res';
import { CoupleRegisReqDto, CreateCourseReqDto } from './dto/req';
import { Parishioner } from '../parishioner/parishioner.entity';
import { Account } from '../account/account.entity';
import { CoupleRegistration } from './entities/couple-registration.entity';
import e from 'express';

@Injectable()
export class CourseService {
  private _dataSource: DataSource;
  private _courseRepository: Repository<Course>;
  private _profileRepository: Repository<Parishioner>;
  private _accountRepository: Repository<Account>;
  private _coupleRegisRepository: Repository<CoupleRegistration>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._courseRepository = dataSource.getRepository(Course);
    this._profileRepository = dataSource.getRepository(Parishioner);
    this._accountRepository = dataSource.getRepository(Account);
    this._coupleRegisRepository = dataSource.getRepository(CoupleRegistration);
  }

  async getCourses(query: any): Promise<GetCourseResDto> {
    try {
      let options = {};
      if (query.courseStatus) {
        options = {
          where: {
            courseStatus: query.courseStatus,
          },
          relations: ['parishioner'],
          order: {
            id: 'DESC',
          },
        };
      } else {
        options = {
          relations: ['parishioner'],
          order: {
            id: 'DESC',
          },
        };
      }
      const courses = await this._courseRepository.find(options);
      return AppResponse.setSuccessResponse<GetCourseResDto>(courses);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async createCourse(
    accountId: number,
    data: CreateCourseReqDto,
  ): Promise<GetCourseResDto> {
    try {
      const account = await this._accountRepository.findOne({
        where: { id: accountId },
      });

      if (!account) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(`Account ${accountId}`),
        );
      }

      const { profileId } = data;
      const profile = await this._profileRepository.findOne({
        where: { id: profileId },
      });

      if (profile.position === POSITION_PARISH.CHRISTIANITY) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          'Profile has position not specified',
        );
      }

      const newCourse = {
        courseName: data.courseName,
        startDate: data.startDate,
        endDate: data.endDate,
        teacherId: profileId,
        createdBy: accountId,
      };

      const course = await this._courseRepository
        .createQueryBuilder()
        .insert()
        .into(Course)
        .values(newCourse)
        .execute();

      return AppResponse.setSuccessResponse<GetCourseResDto>(
        course.identifiers[0],
        {
          message: 'Created course',
        },
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async coupleRegistration(
    partner1Id: number,
    payload: CoupleRegisReqDto,
  ): Promise<any> {
    console.log(payload);
    try {
      const getPartner1 = await this._profileRepository.findOne({
        where: { id: partner1Id },
      });

      if (!getPartner1) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(`parishioner ${partner1Id}`),
        );
      }

      if (getPartner1.isMarried) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          'Parishioner is married',
        );
      }

      if (getPartner1.isReqMarriageCatechism) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          'Parishioner is requested marriage catechism',
        );
      }

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
      console.log('debug', parish_clusterId);

      const getPartner2 = await this._profileRepository.findOne({
        where: {
          phonenumber: payload.partner2_phonenumber,
          fullname: payload.partner2_fullname,
          christianName: payload.partner2_christianName,
          name_father: payload.partner2_name_father,
          name_mother: payload.partner2_name_mother,
          parish_clusterId: parish_clusterId,
        },
      });

      if (!getPartner2) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(
            `Partner 2 ${payload.partner2_christianName} ${payload.partner2_fullname}`,
          ),
        );
      }

      if (getPartner2.isMarried) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          'Partner 2 is married',
        );
      }

      if (getPartner2.isReqMarriageCatechism) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          'Partner 2 is requested marriage catechism',
        );
      }

      const coupleRegis = {
        partner1Id,
        partner2Id: getPartner2.id,
      };

      const queryRunner = this._dataSource.createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        await queryRunner.manager
          .createQueryBuilder()
          .update(Parishioner)
          .set({ isReqMarriageCatechism: true })
          .where('id = :id', { id: partner1Id })
          .execute();

        await queryRunner.manager
          .createQueryBuilder()
          .update(Parishioner)
          .set({ isReqMarriageCatechism: true })
          .where('id = :id', { id: getPartner2.id })
          .execute();

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(CoupleRegistration)
          .values(coupleRegis)
          .execute();

        await queryRunner.commitTransaction();

        return AppResponse.setSuccessResponse<GetCourseResDto>(coupleRegis, {
          message: 'Created couple registration',
        });
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async getCoupleRegisDetail(parishionerId: number): Promise<any> {
    try {
      const [parishioner1, parishioner2] = await Promise.all([
        this._coupleRegisRepository.findOne({
          where: { partner1Id: parishionerId },
          relations: ['parishioner1', 'parishioner2', 'course'],
        }),
        this._coupleRegisRepository.findOne({
          where: { partner2Id: parishionerId },
          relations: ['parishioner1', 'parishioner2', 'course'],
        }),
      ]);
      console.log(parishioner1);
      console.log(parishioner2);

      if (parishioner1 === undefined && parishioner2 === undefined) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(`Registration with ${parishionerId}`),
        );
      }

      let coupleRegis = {};
      if (parishioner1 !== null) {
        coupleRegis = parishioner1;
      } else {
        coupleRegis = parishioner2;
      }
      console.log(coupleRegis);

      return AppResponse.setSuccessResponse<GetCourseResDto>(coupleRegis);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async getCoupleRegistration(): Promise<any> {
    try {
      const coupleRegis = await this._coupleRegisRepository.find({
        relations: ['parishioner1', 'parishioner2', 'course'],
      });

      return AppResponse.setSuccessResponse<GetCourseResDto>(coupleRegis);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  // async getCoupleRegistrationDetail(id: number): Promise<any> {
  //   try {
  //     const coupleRegis = await this._coupleRegisRepository.findOne({
  //       relations: ['parishioner1', 'parishioner2', 'course'],
  //       where: [
  //         { id: id }, // Your first where condition
  //         {
  //           // Your OR condition
  //           or: [
  //             {
  //               /* Add your OR conditions here */
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return AppResponse.setSuccessResponse<GetCourseResDto>(coupleRegis);
  //   } catch (error) {
  //     return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
  //   }
  // }

  async acceptCoupleRegistration(
    coupleRegisId: number,
    courseId: number,
  ): Promise<any> {
    try {
      const coupleRegis = await this._coupleRegisRepository.findOne({
        where: { id: coupleRegisId },
      });

      if (!coupleRegis) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(`Couple registration ${coupleRegisId}`),
        );
      }

      const acceptCouple = await this._coupleRegisRepository
        .createQueryBuilder()
        .update(CoupleRegistration)
        .set({ status: STATUS_COUPLE.ACCEPT, courseId: courseId })
        .where('id = :id', { id: coupleRegisId })
        .execute();

      return AppResponse.setSuccessResponse<GetCourseResDto>(acceptCouple, {
        message: 'Accepted couple registration',
      });
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async rejectCoupleRegistration(
    coupleRegisId: number,
    payload: any,
  ): Promise<any> {
    try {
      const coupleRegis = await this._coupleRegisRepository.findOne({
        where: { id: coupleRegisId },
      });

      if (!coupleRegis) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(`Couple registration ${coupleRegisId}`),
        );
      }

      const rejectCouple = await this._coupleRegisRepository
        .createQueryBuilder()
        .update(CoupleRegistration)
        .set({
          status: STATUS_COUPLE.REJECT,
          rejectReason: payload.rejectReason,
        })
        .where('id = :id', { id: coupleRegisId })
        .execute();

      return AppResponse.setSuccessResponse<GetCourseResDto>(rejectCouple, {
        message: 'Rejected couple registration',
      });
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async completeCourse(coupleRegisId: number): Promise<any> {
    try {
      const coupleRegis = await this._coupleRegisRepository.findOne({
        where: { id: coupleRegisId },
      });

      if (!coupleRegis) {
        return AppResponse.setUserErrorResponse<GetCourseResDto>(
          ErrorHandler.notFound(`Couple registration ${coupleRegisId}`),
        );
      }

      const completedCourse = await this._coupleRegisRepository
        .createQueryBuilder()
        .update(CoupleRegistration)
        .set({ status: STATUS_COUPLE.COMPLETED })
        .where('id = :id', { id: coupleRegisId })
        .execute();

      return AppResponse.setSuccessResponse<GetCourseResDto>(completedCourse, {
        message: 'Couple registration completed course',
      });
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetCourseResDto>(error.message);
    }
  }

  async countAllCourses(): Promise<any> {
    try {
      const count = await this._courseRepository.count();
      const res = {
        data: count,
        status: 200,
      };
      return res;
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }

  async countAllCouple(): Promise<any> {
    try {
      const count = await this._coupleRegisRepository.count();
      const res = {
        data: count,
        status: 200,
      };
      return res;
    } catch (error) {
      return AppResponse.setAppErrorResponse<any>(error.message);
    }
  }
}
