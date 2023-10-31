import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  AccountController,
  MarriageController,
  ParishClusterController,
  ProfileController,
  RoleController,
} from './modules/controller';
import {
  AccountService,
  MarriageService,
  ParishClusterService,
  ProfileService,
  RoleService,
} from './modules/service';
import {
  AccountModule,
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
  ],
  controllers: [
    ProfileController,
    RoleController,
    ParishClusterController,
    AccountController,
    MarriageController,
  ],
  providers: [
    ProfileService,
    RoleService,
    ParishClusterService,
    AccountService,
    MarriageService,
  ],
})
export class AppModule {}
