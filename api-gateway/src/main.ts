import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { ValidationConfig } from './validation.configs';
import Swagger from './common/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: '*',
    methods: '*',
  });
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  Swagger(app);
  await app.listen(5000);
}
bootstrap();
