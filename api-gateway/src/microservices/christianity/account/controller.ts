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
import { AccountService } from './service';
import { CreateAccountReqDto } from './dto/account.dto';

@ApiTags('Account')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get account by id' })
  @ApiOkResponse({ description: 'The account was returned successfully' })
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.getAccount(id);
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
  createRole(@Body() data: CreateAccountReqDto) {
    return this.accountService.createAccount(data);
  }
}
