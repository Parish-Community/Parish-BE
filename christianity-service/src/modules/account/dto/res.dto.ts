import { ShareResDto } from '@/core/common/share.dto';

export class CreateAccountResDto extends ShareResDto {}
export class GetAccountResDto extends ShareResDto {}

export class SigninResDto extends ShareResDto {
  accessToken?: string;
  refreshToken?: string;
}

export class RefreshTokenResDto extends ShareResDto {
  accessToken?: string;
  refreshToken?: string;
}

export class RegisterAccountResDto extends ShareResDto {
  accessToken?: string;
  refreshToken?: string;
}

export class LogoutResDto extends ShareResDto {}
