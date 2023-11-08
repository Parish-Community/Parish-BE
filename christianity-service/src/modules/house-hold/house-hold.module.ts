import { Module } from '@nestjs/common';
import { HouseHoldController } from './house-hold.controller';
import { HouseHoldService } from './house-hold.service';

@Module({
  controllers: [HouseHoldController],
  providers: [HouseHoldService],
})
export class HouseHoldModule {}
