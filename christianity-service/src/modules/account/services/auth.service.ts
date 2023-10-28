import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TYPEORM } from '@/core/constants';
import { AppResponse } from '@/core/app.response';
import { Account } from '../account.entity';

@Injectable()
export class AuthService {
  private _accountRepository: Repository<Account>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._accountRepository = dataSource.getRepository(Account);
  }
}
