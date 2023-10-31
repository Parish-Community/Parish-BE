import { Injectable, Inject } from '@nestjs/common';
import { TYPEORM } from '../../core/constants';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Marriage } from './marriage.entity';
import { Account } from '../account/account.entity';
import { GetMarriageResDto } from './dto/res';
import { AppResponse } from '@/core/app.response';

@Injectable()
export class MarriageService {
  private _dataSource: DataSource;
  private _marriageRepository: Repository<Marriage>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._marriageRepository = dataSource.getRepository(Marriage);
  }

  async getMarriages(): Promise<GetMarriageResDto> {
    try {
      const marriages = await this._marriageRepository.find();
      return {
        status: 200,
        message: 'Get marriages',
        data: marriages,
      };
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetMarriageResDto>(error.message);
    }
  }

  async createMarriage(accountId: number, data: any): Promise<any> {
    try {
      const account = await this._dataSource
        .createQueryBuilder()
        .from(Account, 'account')
        .where('account.id = :accountId', { accountId })
        .getOne();

      if (!account) {
        return {
          status: 404,
          message: 'Account not found',
        };
      }

      data.accountId = accountId;
      const marriage = await this._marriageRepository
        .createQueryBuilder()
        .insert()
        .into(Marriage)
        .values(data)
        .execute();

      return {
        status: 201,
        message: 'Created marriage',
        data: marriage.identifiers[0],
      };
    } catch (error) {
      return error;
    }
  }

  async updateMarriageAcceptStatus(marriageId: number): Promise<any> {
    try {
      const marriage = await this._dataSource
        .createQueryBuilder()
        .from(Marriage, 'marriage')
        .where('marriage.id = :marriageId', { marriageId })
        .getOne();

      if (!marriage) {
        return {
          status: 404,
          message: 'Marriage not found',
        };
      }

      await this._dataSource
        .createQueryBuilder()
        .update(Marriage)
        .set({ isAccept: true })
        .where('id = :marriageId', { marriageId })
        .execute();

      return {
        status: 200,
        message: 'Updated marriage accept status',
      };
    } catch (error) {
      return error;
    }
  }
}
