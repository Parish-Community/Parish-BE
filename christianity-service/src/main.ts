import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
const logger = new Logger('Microservice');
import Swagger from './core/common/swagger.config';
import { HttpInterceptor } from './core/utils/decorator/http.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: '*',
    methods: '*',
  });
  app.setGlobalPrefix('api/v1');
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new HttpInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  Swagger(app);
  await app.listen(8888);
}
bootstrap();
