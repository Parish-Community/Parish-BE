import { Role } from '@/modules/role/role.entity';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ConfigModule } from '@nestjs/config';
import { ProfileService } from './profile.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
