import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { AppResponse } from '@/core/app.response';
import { Currency, GENDER, PaymentStatus, TYPEORM } from '@/core/constants';
import { Baptism } from './baptism.entity';
import { Account } from '../account/account.entity';
import { Parishioner } from '../parishioner/parishioner.entity';
import { CreateBaptismReqDto } from './dto/req.dto';

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

  async getBaptism(): Promise<any> {
    try {
      const baptism = await this._baptismRepository.find({
        relations: ['parish_cluster'],
      });

      return AppResponse.setSuccessResponse<any>(baptism);
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
}
