import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvService } from '../../common/env.service';
import { RoleService } from './role/service';
import { RoleController } from './role/controller';

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
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class ChristianityModule {}
