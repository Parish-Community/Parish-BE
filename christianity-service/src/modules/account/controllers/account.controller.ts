import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountResDto, GetAccountResDto } from '../dto/res.dto';
import { CreateAccountReqDto } from '../dto/req.dto';
import { AccountService } from '../services/account.service';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get account by id' })
  @ApiOkResponse({ description: 'The account was returned successfully' })
  async getAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetAccountResDto> {
    return await this.accountService.getAccount(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create new account' })
  @ApiResponse({
    status: 201,
    description: 'Created account',
  })
  @ApiBody({
    type: CreateAccountReqDto,
  })
  async createAccount(
    @Body() data: CreateAccountReqDto,
  ): Promise<CreateAccountResDto> {
    return await this.accountService.createAccount(data);
  }
}
