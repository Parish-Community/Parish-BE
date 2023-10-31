import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule, MarriageModule } from './modules';
import { CourseService, MarriageService } from './modules/service';
import { CourseController, MarriageController } from './modules/controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MarriageModule,
    CourseModule,
  ],
  controllers: [MarriageController, CourseController],
  providers: [MarriageService, CourseService],
})
export class AppModule {}
