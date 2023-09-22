import { DataSource } from 'typeorm';
import { EnvService } from './env.service';

const config = new EnvService().read();
export const typeOrmConfig = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT || 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
});
