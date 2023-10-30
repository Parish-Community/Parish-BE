import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TYPEORM } from '@/core/constants';
import { AppResponse } from '@/core/app.response';
import { Account } from '../account.entity';
import {
  LogoutResDto,
  RefreshTokenResDto,
  RegisterAccountResDto,
  SigninResDto,
} from '../dto/res.dto';
import { RegisterReqDto, SigninReqDto } from '../dto/req.dto';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '@/core/common/error';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ErrorMessage } from '../constants/error';
import { IAuthPayload } from '../account.interface';
import { AccountService } from './account.service';

@Injectable()
export class AuthService {
  private _accountRepository: Repository<Account>;
  constructor(
    @Inject(TYPEORM) dataSource: DataSource,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {
    this._accountRepository = dataSource.getRepository(Account);
  }

  async register(payload: RegisterReqDto): Promise<RegisterAccountResDto> {
    try {
      const { email, password, phonenumber, confirmPassword } = payload;
      const account = await this._accountRepository.findOne({
        where: { email },
        relations: ['profile', 'role'],
      });

      if (account) {
        return AppResponse.setUserErrorResponse<RegisterAccountResDto>(
          ErrorHandler.alreadyExists(`The account with ${email} already exist`),
        );
      }

      if (phonenumber === account?.phonenumber) {
        return AppResponse.setUserErrorResponse<RegisterAccountResDto>(
          ErrorHandler.alreadyExists(`The phonenumber ${phonenumber}`),
        );
      }

      if (password !== confirmPassword) {
        return AppResponse.setUserErrorResponse<RegisterAccountResDto>(
          ErrorHandler.invalid('The password and confirm password'),
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newAccount = await this._accountRepository.save({
        ...payload,
        password: hashPassword,
      });

      return AppResponse.setSuccessResponse<RegisterAccountResDto>(newAccount);
    } catch (error) {
      return AppResponse.setAppErrorResponse<RegisterAccountResDto>(
        error.message,
      );
    }
  }

  async login(payload: SigninReqDto): Promise<SigninResDto> {
    try {
      const account = await this.validateAccount(payload);
      if (typeof account !== 'object') {
        return AppResponse.setUserErrorResponse<SigninResDto>(account, {
          status: 400,
        });
      }

      if (!account.isActive) {
        return AppResponse.setUserErrorResponse<SigninResDto>(
          ErrorMessage.ACCESS_DENIED,
          {
            status: 403,
          },
        );
      }

      const authPayload: IAuthPayload = this.createAuthPayload(account);

      const tokens = await this.handleGenerateTokens(authPayload);
      await this.accountService.updateRefreshToken(
        account['id'],
        tokens.refreshToken,
      );
      return AppResponse.setSuccessResponse<SigninResDto>(tokens);
    } catch (error) {
      return AppResponse.setAppErrorResponse<SigninResDto>(error.message);
    }
  }

  async logout(accessToken: string): Promise<LogoutResDto> {
    try {
      const account = await this.verifyAccessToken(accessToken);
      const updateRefreshToken = await this.accountService.updateRefreshToken(
        account['id'],
        null,
      );
      const result = {
        refreshToken: updateRefreshToken.refresh_token,
      };
      return AppResponse.setSuccessResponse<LogoutResDto>(result);
    } catch (error) {
      return AppResponse.setAppErrorResponse<LogoutResDto>(error.message);
    }
  }
  async refreshToken(
    accountId: number,
    refreshToken: string,
  ): Promise<RefreshTokenResDto | string> {
    try {
      const account = await this._accountRepository.findOne({
        where: { id: accountId },
        relations: ['profile', 'role'],
      });
      if (!account) {
        return ErrorHandler.notFound(`Account ${accountId}`);
      }

      const isMatch = await bcrypt.compare(
        refreshToken,
        account['refresh_token'],
      );

      if (!isMatch) {
        return ErrorHandler.invalid('Refresh token');
      }

      const authPayload: IAuthPayload = this.createAuthPayload(account);
      const tokens = await this.handleGenerateTokens(authPayload);
      await this.accountService.updateRefreshToken(
        account['id'],
        tokens.refreshToken,
      );
      return AppResponse.setSuccessResponse<RefreshTokenResDto>(tokens);
    } catch (error) {
      return error.message;
    }
  }

  async validateAccount(payload: SigninReqDto): Promise<Account | string> {
    try {
      const { email, password } = payload;
      const account = await this._accountRepository.findOne({
        where: { email },
        relations: ['profile', 'role'],
      });
      if (!account) {
        return ErrorHandler.notFound(`The account with ${email}`);
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        account['password'],
      );

      if (!passwordIsValid) {
        return ErrorHandler.invalid('The phone number or password');
      }
      return account;
    } catch (error) {
      return error.message;
    }
  }

  async verifyAccessToken(access_token: string): Promise<Account | string> {
    try {
      const decodedToken = this.jwtService.verify(access_token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
      });

      const account = await this._accountRepository.findOne({
        where: {
          id: decodedToken['payload']['accountId'],
        },
      });

      if (!account) {
        return ErrorHandler.invalid('Access token');
      }

      return account;
    } catch (error) {
      return error.message;
    }
  }

  private createAuthPayload(account: Account): IAuthPayload {
    return {
      accountId: account['id'],
      fullname: account['fullname'],
      phonenumber: account['phonenumber'],
      email: account['email'],
      roleId: account['roleId'],
      role: account['role']['name'],
      isActive: account['isActive'],
      firstLogin: account['firstLogin'],
    };
  }

  private async handleGenerateTokens(
    payload: IAuthPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
