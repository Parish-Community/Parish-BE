import { DynamicModule } from '@nestjs/common';
import { EnvService } from './env.service';
import { TypeOrmModule } from '@nestjs/typeorm';

export function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();

  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,

    synchronize: true,
    autoLoadEntities: true,
  });
}
