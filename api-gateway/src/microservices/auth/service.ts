import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginReqDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CHRISTIANITY_MICROSERVICE')
    private readonly authService: ClientProxy,
  ) {}

  login(payload: LoginReqDto) {
    return this.authService.send(
      {
        object: 'auth',
        cmd: 'route-login',
      },
      payload,
    );
  }

  logout(payload: any) {
    return this.authService.send(
      {
        object: 'auth',
        cmd: 'route-logout',
      },
      payload,
    );
  }

  refreshToken(payload: any) {
    return this.authService.send(
      {
        object: 'auth',
        cmd: 'route-refresh-token',
      },
      payload,
    );
  }
}
