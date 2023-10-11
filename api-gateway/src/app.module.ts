import { Module } from '@nestjs/common';
import { MicroservicesModule } from './microservices/microservices.module';
// import { AuthenticationModule } from './middlewares/authentications/authentication.module';

@Module({
  imports: [MicroservicesModule],
})
export class AppModule {}
