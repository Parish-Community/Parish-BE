import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
const logger = new Logger('Microservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4001,
    },
  });

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen();
}
bootstrap();
