import { MessagePattern } from '@nestjs/microservices';
import { CreateAccountResDto, GetAccountResDto } from './dto/res.dto';
import { CreateAccountReqDto } from './dto/req.dto';
import { AccountService } from './account.service';
import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ object: 'account', cmd: 'get-account-by-id' })
  async getAccount(param: { id: number }): Promise<GetAccountResDto> {
    return await this.accountService.getAccount(param.id);
  }

  @MessagePattern({ object: 'account', cmd: 'create-account' })
  async createAccount(
    @Body() data: CreateAccountReqDto,
  ): Promise<CreateAccountResDto> {
    return await this.accountService.createAccount(data);
  }
}
