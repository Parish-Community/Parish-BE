import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
