import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/req.dto';
import { JwtAuthGuard, RefreshTokenGuard } from '@/core/utils/guards';
import { GetAccount } from '@/core/utils/decorator/account.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  //get all payments
  @Get('/donations')
  // @ApiBearerAuth('access_token')
  // @UseGuards(JwtAuthGuard)
  getPaymentsDonations() {
    return this.paymentsService.getPaymentsDonations();
  }

  @Post('')
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  create(@Body() createPaymentDto: CreatePaymentDto, @GetAccount() account) {
    return this.paymentsService.createPayment(
      createPaymentDto,
      account.payload,
    );
  }
}