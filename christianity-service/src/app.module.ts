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
  BaptismController,
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
  BaptismService,
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
  BaptismModule,
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
    BaptismModule,
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
    BaptismController,
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
    BaptismService,
  ],
})
export class AppModule {}
