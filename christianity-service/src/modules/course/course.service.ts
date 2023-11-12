import { Inject, Injectable } from '@nestjs/common';
import { POSITION_PARISH, TYPEORM } from '../../core/constants';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AppResponse } from '@/core/app.response';
import { ErrorHandler } from '@/core/common/error';
import { Course } from './entities/course.entity';
import { GetCourseResDto } from './dto/res';
import { CreateCourseReqDto } from './dto/req';
import { Parishioner } from '../parishioner/parishioner.entity';
import { Account } from '../account/account.entity';

@Injectable()
export class CourseService {
  private _dataSource: DataSource;
  private _courseRepository: Repository<Course>;
  private _profileRepository: Repository<Parishioner>;
  private _accountRepository: Repository<Account>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._courseRepository = dataSource.getRepository(Course);
    this._profileRepository = dataSource.getRepository(Parishioner);
    this._accountRepository = dataSource.getRepository(Account);
  }

  async getCourses(): Promise<GetCourseResDto> {
    try {
      const courses = await this._courseRepository.find({
        relations: ['parishioner'],
      });
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
}
