import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  AccountController,
  CourseController,
  MarriageController,
  ParishClusterController,
  ProfileController,
  RoleController,
} from './modules/controller';
import {
  AccountService,
  CourseService,
  MarriageService,
  ParishClusterService,
  ProfileService,
  RoleService,
} from './modules/service';
import {
  AccountModule,
  CourseModule,
  MarriageModule,
  ParishClusterModule,
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
  ],
  controllers: [
    ProfileController,
    RoleController,
    ParishClusterController,
    AccountController,
    MarriageController,
    CourseController,
  ],
  providers: [
    ProfileService,
    RoleService,
    ParishClusterService,
    AccountService,
    MarriageService,
    CourseService,
  ],
})
export class AppModule {}
