import { Injectable, Inject } from '@nestjs/common';
import { TYPEORM } from '../../core/constants';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Marriage } from './marriage.entity';
import { Account } from '../account/account.entity';
import { GetMarriageResDto } from './dto/res';
import { AppResponse } from '@/core/app.response';
import { ErrorHandler } from '@/core/common/error';

@Injectable()
export class MarriageService {
  private _dataSource: DataSource;
  private _accountRepository: Repository<Account>;
  private _marriageRepository: Repository<Marriage>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._marriageRepository = dataSource.getRepository(Marriage);
    this._accountRepository = dataSource.getRepository(Account);
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

  async createMarriage(
    accountId: number,
    data: any,
  ): Promise<GetMarriageResDto> {
    try {
      const account = await this._accountRepository.findOne({
        where: { id: accountId },
      });

      if (!account) {
        return AppResponse.setUserErrorResponse<GetMarriageResDto>(
          ErrorHandler.notFound(`Account ${accountId}`),
        );
      }

      data.accountId = accountId;
      const marriage = await this._marriageRepository
        .createQueryBuilder()
        .insert()
        .into(Marriage)
        .values(data)
        .execute();

      return AppResponse.setSuccessResponse<GetMarriageResDto>(
        marriage.identifiers[0],
        {
          message: 'Created marriage',
        },
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetMarriageResDto>(error.message);
    }
  }

  async updateMarriageAcceptStatus(
    marriageId: number,
  ): Promise<GetMarriageResDto> {
    try {
      const marriage = await this._dataSource
        .createQueryBuilder()
        .from(Marriage, 'marriage')
        .where('marriage.id = :marriageId', { marriageId })
        .getOne();

      if (!marriage) {
        return AppResponse.setUserErrorResponse<GetMarriageResDto>(
          ErrorHandler.notFound(`Marriage ${marriageId}`),
        );
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
      return AppResponse.setAppErrorResponse<GetMarriageResDto>(error.message);
    }
  }
}
