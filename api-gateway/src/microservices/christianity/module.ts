import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvService } from '../../common/env.service';
import { RoleService } from './role/service';
import { RoleController } from './role/controller';
import { ProfileService } from './profile/service';
import { ProfileController } from './profile/controller';
import { ParisClusterController } from './parish_cluster/controller';
import { ParisClusterService } from './parish_cluster/service';

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
  controllers: [RoleController, ProfileController, ParisClusterController],
  providers: [RoleService, ProfileService, ParisClusterService],
  exports: [RoleService, ProfileService, ParisClusterService],
})
export class ChristianityModule {}
