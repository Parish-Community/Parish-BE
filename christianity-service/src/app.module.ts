import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  AccountController,
  ParishClusterController,
  ProfileController,
  RoleController,
} from './modules/controller';
import {
  AccountService,
  ParishClusterService,
  ProfileService,
  RoleService,
} from './modules/service';
import {
  AccountModule,
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
  ],
  controllers: [
    ProfileController,
    RoleController,
    ParishClusterController,
    AccountController,
  ],
  providers: [
    ProfileService,
    RoleService,
    ParishClusterService,
    AccountService,
  ],
})
export class AppModule {}
