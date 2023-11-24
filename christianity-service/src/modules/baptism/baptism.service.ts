import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AppResponse } from '@/core/app.response';
import { Currency, GENDER, PaymentStatus, TYPEORM } from '@/core/constants';
import { Baptism } from './baptism.entity';
import { Account } from '../account/account.entity';
import { Parishioner } from '../parishioner/parishioner.entity';
import {
  CreateBaptismReqDto,
  GetProfilesReqDto,
  UpdateBaptismReqDto,
} from './dto/req.dto';
import { ExtraQueryBuilder } from '@/core/utils/querybuilder.typeorm';
import { ErrorHandler } from '@/core/common/error';

@Injectable()
export class BaptismService {
  private _dataSource: DataSource;
  private _profileRepository: Repository<Parishioner>;
  private _accountRepository: Repository<Account>;
  private _baptismRepository: Repository<Baptism>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._profileRepository = dataSource.getRepository(Parishioner);
    this._accountRepository = dataSource.getRepository(Account);
    this._baptismRepository = dataSource.getRepository(Baptism);
  }

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
}
