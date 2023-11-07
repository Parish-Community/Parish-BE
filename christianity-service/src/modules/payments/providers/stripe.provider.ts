import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeProvider {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const privateKey = this.configService.get<string>('STRIPE_API_KEY');
    if (!privateKey) {
      throw new Error('Stripe private key not present');
    }
    this.stripe = new Stripe(privateKey, { apiVersion: '2023-10-16' });
  }

  public getInstance(): Stripe {
    return this.stripe;
  }
}
