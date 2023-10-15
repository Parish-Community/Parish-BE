import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParishClusterController } from './parish_cluster.controller';
import { ParishClusterService } from './parish_cluster.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [ParishClusterController],
  providers: [ParishClusterService],
  exports: [ParishClusterService],
})
export class ParishClusterModule {}
