import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaptismService } from './baptism.service';
import { GetBaptismResDto } from './dto/res.dto';
import {
  CreateBaptismReqDto,
  CronDto,
  EmailScheduleDto,
  FileImportDataReqDto,
  GetProfilesReqDto,
  UpdateBaptismReqDto,
} from './dto/req.dto';
import { JwtAuthGuard } from '@/core/utils/guards';
import { GetAccount } from '@/core/utils/decorator/account.decorator';
import { Auth } from '@/core/utils/decorator/auth.decorator';
import { ACCOUNT_ROLE } from '@/core/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@ApiTags('Baptism')
@Controller('baptism')
export class BaptismController {
  constructor(private readonly baptismService: BaptismService) {}

  @Get('')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Get all baptism' })
  @ApiOkResponse({ description: 'The list baptism were returned successfully' })
  async getBaptisms(
    @Query() queries: GetProfilesReqDto,
  ): Promise<GetBaptismResDto> {
    return await this.baptismService.getBaptisms(queries);
  }

  @Get('/:baptismId')
  @Auth(ACCOUNT_ROLE.ADM, ACCOUNT_ROLE.USER)
  @ApiOperation({ summary: 'Get baptism by id' })
  @ApiOkResponse({ description: 'The baptism was returned successfully' })
  async getBaptism(
    @Param('baptismId', ParseIntPipe) baptismId: number,
  ): Promise<GetBaptismResDto> {
    return await this.baptismService.getBaptismById(baptismId);
  }

  @Get('/baptism-registration')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  async getCoupleRegistration(
    @GetAccount() account,
  ): Promise<GetBaptismResDto> {
    return await this.baptismService.getBaptismByAccountId(
      account.payload.accountId,
    );
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'Create new baptism' })
  @ApiResponse({
    status: 201,
    description: 'Created baptism',
  })
  @ApiBody({
    type: CreateBaptismReqDto,
  })
  async createAccount(
    @GetAccount() account,
    @Body() data: CreateBaptismReqDto,
  ): Promise<GetBaptismResDto> {
    return await this.baptismService.createBaptism(
      account.payload.accountId,
      data,
    );
  }

  @Patch('/:baptismId/accept')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Update accept baptism' })
  @ApiOkResponse({ description: 'The baptism was updated successfully' })
  async acceptBaptism(
    @Param('baptismId', ParseIntPipe) baptismId: number,
    @Body() data: UpdateBaptismReqDto,
  ): Promise<GetBaptismResDto> {
    return await this.baptismService.acceptBaptism(baptismId, data);
  }

  @Delete('/:baptismId')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Delete baptism by id' })
  @ApiOkResponse({ description: 'The baptism was deleted successfully' })
  async deleteBaptism(
    @Param('baptismId', ParseIntPipe) baptismId: number,
  ): Promise<GetBaptismResDto> {
    return await this.baptismService.deleteBaptism(baptismId);
  }

  @Post('import')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async UploadExcelFile(
    @UploadedFile() file: Express.Multer.File,
    @GetAccount() account,
  ) {
    const workBook: XLSX.WorkBook = XLSX.read(file.buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });

    const sheetName = workBook?.SheetNames[0];
    const sheet: XLSX.WorkSheet = workBook.Sheets[sheetName];

    const jsonData: FileImportDataReqDto[] = XLSX.utils.sheet_to_json(sheet, {
      dateNF: 'YYYY-MM-DD',
    });

    const data = jsonData.map((item) => {
      return {
        // parish_clusterId: item['parish_clusterId'],
        // dateBaptism: item['dateBaptism'].toISOString().split('T')[0],
        // priestBaptism: item['priestBaptism'],
        accountId: account.payload.accountId,
        parishionerId: item['parishionerId'],
        isAccepted: false,
      };
    });

    return await this.baptismService.importData(data);
  }

  @Post('cronJob')
  @ApiOperation({ summary: 'Create new cron job' })
  addCronJob(@Body() cronDto: CronDto) {
    const { name, seconds } = cronDto;
    return this.baptismService.addCronJob(name, seconds);
  }

  @Get('cronJobs-test')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Get all cron jobs' })
  getCronJobs() {
    return this.baptismService.getCrons();
  }

  @Post('email-scheduling')
  @ApiOperation({ summary: 'Create new cron job for email schedule' })
  scheduleEmail(@Body() cronDto: EmailScheduleDto) {
    return this.baptismService.scheduleEmail(cronDto);
  }

  @Delete('email-scheduling')
  @ApiOperation({ summary: 'cancel email schedule' })
  deleteEmailSchedule() {
    return this.baptismService.cancelAllScheduledEmails();
  }
}
