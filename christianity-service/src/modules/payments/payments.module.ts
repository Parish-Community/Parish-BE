import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeProvider } from './providers/stripe.provider';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeProvider],
  exports: [StripeProvider],
})
export class PaymentsModule {}
