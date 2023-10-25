import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvService } from '../../common/env.service';
import { RoleService } from './role/service';
import { RoleController } from './role/controller';
import { ProfileService } from './profile/service';
import { ProfileController } from './profile/controller';
import { ParisClusterController } from './parish_cluster/controller';
import { ParisClusterService } from './parish_cluster/service';
import { AccountController } from './account/controller';
import { AccountService } from './account/service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHRISTIANITY_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: new EnvService().read().ChristianityService.host,
          port: new EnvService().read().ChristianityService.port,
        },
      },
    ]),
    // forwardRef(() => ProjectModule),
    // forwardRef(() => DayOffModule),
  ],
  controllers: [
    RoleController,
    ProfileController,
    ParisClusterController,
    AccountController,
  ],
  providers: [RoleService, ProfileService, ParisClusterService, AccountService],
  exports: [RoleService, ProfileService, ParisClusterService, AccountService],
})
export class ChristianityModule {}
