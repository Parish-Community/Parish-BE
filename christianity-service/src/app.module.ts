import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileService } from './modules/profile/profile.service';
import { ProfileModule } from './modules/profile/profile.module';
import { RoleModule } from './modules/role/role.module';
import { RoleController } from './modules/role/role.controller';
import { RoleService } from './modules/role/role.service';
import { ParishClusterModule } from './modules/parish_cluster/parish_cluster.module';
import { ParishClusterController } from './modules/parish_cluster/parish_cluster.controller';
import { ParishClusterService } from './modules/parish_cluster/parish_cluster.service';

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
  ],
  controllers: [
    AppController,
    ProfileController,
    RoleController,
    ParishClusterController,
  ],
  providers: [AppService, ProfileService, RoleService, ParishClusterService],
})
export class AppModule {}
