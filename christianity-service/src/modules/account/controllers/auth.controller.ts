import { MessagePattern } from '@nestjs/microservices';
import {
  CreateAccountResDto,
  GetAccountResDto,
  RefreshTokenResDto,
} from '../dto/res.dto';
import { CreateAccountReqDto, SigninReqDto } from '../dto/req.dto';
import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @MessagePattern({ object: 'account', cmd: 'get-account-by-id' })
  // async getAccount(param: { id: number }): Promise<GetAccountResDto> {
  //   return await this.authService.getAccount(param.id);
  // }

  @MessagePattern({ object: 'auth', cmd: 'route-login' })
  async login(@Body() data: SigninReqDto): Promise<CreateAccountResDto> {
    return await this.authService.login(data);
  }

  @MessagePattern({ object: 'auth', cmd: 'route-logout' })
  async logout(payload: any): Promise<any> {
    return await this.authService.logout(payload);
  }

  @MessagePattern({ object: 'auth', cmd: 'route-refresh-token' })
  async refreshToken(data: any): Promise<string | RefreshTokenResDto> {
    return await this.authService.refreshToken(
      data.payload.accountId,
      data.refreshToken,
    );
  }
}
