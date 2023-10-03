import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseOrmModule } from './database/database.module';
import { ShareBaseEntity } from './entities/base.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../development.env',
    }),
    DatabaseOrmModule(),
    TypeOrmModule.forFeature([ShareBaseEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
