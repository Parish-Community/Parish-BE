import { Module } from '@nestjs/common';
import { ChristianityModule } from './christianity/module';

@Module({
  imports: [ChristianityModule],
})
export class MicroservicesModule {}
