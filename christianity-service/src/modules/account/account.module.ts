import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AccountController, AuthController],
  providers: [AccountService, AuthService],
  exports: [AccountService, AuthService],
})
export class AccountModule {}
