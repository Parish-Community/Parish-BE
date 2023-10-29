import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TYPEORM } from '@/core/constants';
import { AppResponse } from '@/core/app.response';
import { Account } from '../account.entity';
import { Profile } from '@/modules/profile/profile.entity';
import { CreateAccountResDto, GetAccountResDto } from '../dto/res.dto';
import { CreateAccountReqDto } from '../dto/req.dto';
import { ErrorHandler } from '@/core/common/error';
import { Bcrypt } from '@/core/utils/bcrypt';

@Injectable()
export class AccountService {
  private _dataSource: DataSource;
  private _accountRepository: Repository<Account>;
  private _profileRepository: Repository<Profile>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._accountRepository = dataSource.getRepository(Account);
    this._profileRepository = dataSource.getRepository(Profile);
  }

  async getAccount(id: number): Promise<GetAccountResDto> {
    try {
      const account = await this._accountRepository.findOne({
        where: { id },
        relations: ['profile', 'role'],
      });
      if (!account) {
        return AppResponse.setUserErrorResponse<GetAccountResDto>(
          ErrorHandler.notFound(`Account ${id}`),
        );
      }

      return AppResponse.setSuccessResponse<GetAccountResDto>(account);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetAccountResDto>(error.message);
    }
  }

  async createAccount(
    payload: CreateAccountReqDto,
  ): Promise<CreateAccountResDto> {
    try {
      const { phonenumber, password, profileId } = payload;

      const profileData = await this._profileRepository.findOne({
        where: { id: profileId },
      });

      if (!profileData) {
        return AppResponse.setUserErrorResponse<CreateAccountResDto>(
          ErrorHandler.notFound(`The profile ${profileId}`),
        );
      }

      const existPhoneNumber = await this._accountRepository.findOne({
        where: { phonenumber },
      });

      if (phonenumber === existPhoneNumber?.phonenumber) {
        return AppResponse.setUserErrorResponse<CreateAccountResDto>(
          ErrorHandler.alreadyExists('The phone number'),
        );
      }

      const hashPassword = Bcrypt.handleHashPassword(password);
      const data = { ...payload, password: hashPassword };

      const account = await this._accountRepository
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values(data)
        .execute();

      return AppResponse.setSuccessResponse<CreateAccountResDto>(
        account.identifiers[0].id,
        {
          status: 201,
          message: 'Created',
        },
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetAccountResDto>(error.message);
    }
  }

  // async updateRefreshToken(
  //   id: number,
  //   payload: UpdateAccountReqDto,
  // ): Promise<Account> {
  //   try {
  //     const account = await this._accountRepository.findOneBy({ id });
  //     account.refreshToken = payload.refreshToken;
  //     return await this._accountRepository.save(account);
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
}
