import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  AccountController,
  CourseController,
  MarriageController,
  ParishClusterController,
  PaymentsController,
  ProfileController,
  RoleController,
} from './modules/controller';
import {
  AccountService,
  CourseService,
  MarriageService,
  ParishClusterService,
  PaymentsService,
  ProfileService,
  RoleService,
} from './modules/service';
import {
  AccountModule,
  CourseModule,
  MarriageModule,
  ParishClusterModule,
  PaymentsModule,
  ProfileModule,
  RoleModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProfileModule,
    RoleModule,
    ParishClusterModule,
    AccountModule,
    MarriageModule,
    CourseModule,
    PaymentsModule,
  ],
  controllers: [
    ProfileController,
    RoleController,
    ParishClusterController,
    AccountController,
    MarriageController,
    CourseController,
    PaymentsController,
  ],
  providers: [
    ProfileService,
    RoleService,
    ParishClusterService,
    AccountService,
    MarriageService,
    CourseService,
    PaymentsService,
  ],
})
export class AppModule {}
