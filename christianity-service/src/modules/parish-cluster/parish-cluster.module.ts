import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParishClusterController } from './parish-cluster.controller';
import { ParishClusterService } from './parish-cluster.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [ParishClusterController],
  providers: [ParishClusterService],
  exports: [ParishClusterService],
})
export class ParishClusterModule {}
