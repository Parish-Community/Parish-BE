import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ShareBaseEntity } from './core/base.entity';
import { ProfileController } from './modules/profile/profile.controller';
import { ProfileService } from './modules/profile/profile.service';
import { ProfileModule } from './modules/profile/profile.module';
import { RoleModule } from './modules/role/role.module';
import { RoleController } from './modules/role/role.controller';
import { RoleService } from './modules/role/role.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProfileModule,
    RoleModule,
  ],
  controllers: [AppController, ProfileController, RoleController],
  providers: [AppService, ProfileService, RoleService],
})
export class AppModule {}
