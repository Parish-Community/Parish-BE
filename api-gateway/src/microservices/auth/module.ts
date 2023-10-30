import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvService } from '../../common/env.service';
import { AuthController } from './controller';
import { AuthService } from './service';
import { JwtStrategy, RefreshTokenStrategy } from '@/strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ClientsModule.register([
      {
        name: 'CHRISTIANITY_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: new EnvService().read().ChristianityService.host,
          port: new EnvService().read().ChristianityService.port,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService, RefreshTokenStrategy, JwtStrategy],
})
export class AuthModule {}
