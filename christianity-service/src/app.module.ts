import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  AccountController,
  CourseController,
  ParishClusterController,
  PaymentsController,
  ParishionerController,
  RoleController,
  CloudinaryController,
  HouseHoldController,
} from './modules/controller';
import {
  AccountService,
  CourseService,
  ParishClusterService,
  PaymentsService,
  ParishionerService,
  RoleService,
  CloudinaryService,
  HouseHoldService,
} from './modules/service';
import {
  AccountModule,
  CourseModule,
  ParishClusterModule,
  PaymentsModule,
  ParishionerModule,
  RoleModule,
  CloudinaryModule,
  HouseHoldModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ParishionerModule,
    RoleModule,
    ParishClusterModule,
    AccountModule,
    CourseModule,
    PaymentsModule,
    CloudinaryModule,
    HouseHoldModule,
  ],
  controllers: [
    ParishionerController,
    RoleController,
    ParishClusterController,
    AccountController,
    CourseController,
    PaymentsController,
    CloudinaryController,
    HouseHoldController,
  ],
  providers: [
    ParishionerService,
    RoleService,
    ParishClusterService,
    AccountService,
    CourseService,
    PaymentsService,
    CloudinaryService,
    HouseHoldService,
  ],
})
export class AppModule {}
