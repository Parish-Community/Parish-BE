import { Role } from '@/modules/role/role.entity';
import { Module } from '@nestjs/common';
import { ParishionerController } from './parishioner.controller';
import { ConfigModule } from '@nestjs/config';
import { ParishionerService } from './parishioner.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [ParishionerController],
  providers: [ParishionerService],
  exports: [ParishionerService],
})
export class ParishionerModule {}
