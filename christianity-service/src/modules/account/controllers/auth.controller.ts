import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateAccountResDto,
  GetAccountResDto,
  RefreshTokenResDto,
} from '../dto/res.dto';
import { CreateAccountReqDto, SigninReqDto } from '../dto/req.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard, RefreshTokenGuard } from '@/core/utils/guards';
import { GetAccount } from '@/core/utils/decorator/account.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'Login',
  })
  @ApiBody({
    type: SigninReqDto,
  })
  async login(@Body() data: SigninReqDto): Promise<CreateAccountResDto> {
    return await this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'Logout' })
  async logout(@GetAccount() account): Promise<any> {
    return await this.authService.logout(account);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  @ApiBearerAuth('access_token')
  async refreshToken(
    @GetAccount() account,
  ): Promise<string | RefreshTokenResDto> {
    return await this.authService.refreshToken(
      account.payload.accountId,
      account.refreshToken,
    );
  }
}
