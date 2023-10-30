import { Module } from '@nestjs/common';
import { ChristianityModule } from './christianity/module';
import { AuthModule } from './auth/module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ChristianityModule,
    AuthModule,
    CloudinaryModule,
  ],
})
export class MicroservicesModule {}
