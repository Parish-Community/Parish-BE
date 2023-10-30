import { Module } from '@nestjs/common';
import { ChristianityModule } from './christianity/module';
import { AuthModule } from './auth/module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ChristianityModule,
    AuthModule,
  ],
})
export class MicroservicesModule {}
