import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, GetPaymentsReqDto } from './dto/req.dto';
import { JwtAuthGuard, RefreshTokenGuard } from '@/core/utils/guards';
import { GetAccount } from '@/core/utils/decorator/account.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '@/core/utils/decorator/auth.decorator';
import { ACCOUNT_ROLE } from '@/core/constants';
import * as fs from 'fs';
import { Response } from 'express';
import * as fastCsv from 'fast-csv';
import * as json2csv from 'json2csv';

@ApiTags('Payment')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('/donations')
  // @Auth(ACCOUNT_ROLE.ADM)
  getPaymentsDonations(@Query() queries: GetPaymentsReqDto) {
    return this.paymentsService.getPaymentsDonations(queries);
  }
  @Get('/donations/user')
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  getPaymentsOfUser(@GetAccount() account) {
    return this.paymentsService.getPaymentsOfUser(account.payload.accountId);
  }

  @Get('/donations/total')
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  getTotalDonations(@GetAccount() account) {
    return this.paymentsService.getTotalDonations(account.payload.accountId);
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

  @Get('/total')
  @Auth(ACCOUNT_ROLE.ADM)
  getTotalAmount() {
    return this.paymentsService.getTotalAmount();
  }

  // @Get('export-donations')
  // @Auth(ACCOUNT_ROLE.ADM)
  // async downloadCSV() {
  //   const data: any[] = [
  //     {
  //       id: 1,
  //       name: 'Rouky',
  //       email: 'helo@gmail.com',
  //     },
  //     {
  //       id: 2,
  //       name: 'Keiko',
  //       email: 'duytuan@gmail.com',
  //     },
  //   ];
  //   const headers = ['id', 'name', 'email'];
  //   const filename = 'exported_data.csv';
  //   return await this.paymentsService.generateCSV(data, filename, headers);
  // }

  // @Post('convert')
  // async convertJsonToCsv(@Res() res: any): Promise<string> {
  //   const data: any[] = [
  //     {
  //       id: 1,
  //       name: 'Rouky',
  //       email: 'helo@gmail.com',
  //     },
  //     {
  //       id: 2,
  //       name: 'Keiko',
  //       email: 'duytuan@gmail.com',
  //     },
  //   ];
  //   const fields = ['id', 'name', 'email'];
  //   try {
  //     const fileName = 'output.csv';
  //     const csvData = await this.paymentsService.convertJsonToCsv(
  //       data,
  //       fields,
  //       fileName,
  //     );

  //     const jsonPath = `./src/modules/payments/jsons/${fileName}`;
  //     const readerDataCsv = fs.readFileSync(jsonPath, 'utf8');
  //     // const dataCsv = JSON.parse(reader);

  //     res.setHeader('Content-Type', 'text/csv');
  //     res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  //     res.send(readerDataCsv);
  //     return `Conversion successful. CSV file created: ${fileName}`;
  //   } catch (err) {
  //     return 'Conversion failed. Please try again.';
  //   }
  // }

  // @Get('export')
  // async exportCsv(@Body() data: any[], @Res() res: Response): Promise<void> {
  //   try {
  //     const data = [
  //       { name: 'John Doe', age: 30, email: 'john@example.com' },
  //       { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  //     ];
  //     const fields = ['id', 'name', 'email'];

  //     const fileName = 'export_donation.csv';
  //     const csv = json2csv.parse(data, { fields });

  //     res.setHeader('Content-Type', 'text/csv');
  //     res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

  //     fastCsv.write(data, { headers: true }).pipe(res);
  //     res.send(csv);
  //     // res.status(200).send('Exported CSV successfully');
  //   } catch (error) {
  //     res.status(500).send('Error exporting CSV');
  //   }
  // }

  // @Post('export')
  // async exportDonationCsv(
  //   @Body() data: any[],
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     const data = [
  //       { name: 'John Doe', age: 30, email: 'john@example.com' },
  //       { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  //     ];

  //     const fileName = 'export_donation.csv';

  //     res.setHeader('Content-Type', 'text/csv');
  //     res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

  //     fastCsv.write(data, { headers: true }).pipe(res);
  //   } catch (error) {
  //     res.status(500).send('Error exporting CSV');
  //   }
  // }
}
