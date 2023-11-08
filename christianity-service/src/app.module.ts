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
} from './modules/controller';
import {
  AccountService,
  CourseService,
  ParishClusterService,
  PaymentsService,
  ParishionerService,
  RoleService,
} from './modules/service';
import {
  AccountModule,
  CourseModule,
  ParishClusterModule,
  PaymentsModule,
  ParishionerModule,
  RoleModule,
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
  ],
  controllers: [
    ParishionerController,
    RoleController,
    ParishClusterController,
    AccountController,
    CourseController,
    PaymentsController,
  ],
  providers: [
    ParishionerService,
    RoleService,
    ParishClusterService,
    AccountService,
    CourseService,
    PaymentsService,
  ],
})
export class AppModule {}
