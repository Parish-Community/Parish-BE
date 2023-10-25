import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAccountReqDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('CHRISTIANITY_MICROSERVICE')
    private readonly accountService: ClientProxy,
  ) {}

  getAccount(id: number) {
    return this.accountService.send(
      {
        object: 'account',
        cmd: 'get-account-by-id',
      },
      { id },
    );
  }

  createAccount(payload: CreateAccountReqDto) {
    return this.accountService.send(
      {
        object: 'account',
        cmd: 'create-account',
      },
      payload,
    );
  }
}
