import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { ParishionerService } from './parishioner.service';
import {
  CreateProfileReqDto,
  FileImportDataReqDto,
  RegistrationAccountReqDto,
  UpdateProfileReqDto,
} from './dto/req.dto';
import { GetProfileResDto, GetProfilesResDto } from './dto/res.dto';
import { Auth } from '@/core/utils/decorator/auth.decorator';
import { ACCOUNT_ROLE } from '@/core/constants';
import * as XLSX from 'xlsx';

@ApiTags('Parishioner')
@Controller('parishioner')
export class ParishionerController {
  constructor(private readonly parishionerService: ParishionerService) {}

  @Get()
  // @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Get all profile' })
  @ApiOkResponse({ description: 'The list profile were returned successfully' })
  async getProfiles(): Promise<GetProfilesResDto> {
    return await this.parishionerService.getProfiles();
  }

  @Get(':id')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Get profile by id' })
  @ApiOkResponse({ description: 'The profile was returned successfully' })
  async getProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetProfileResDto> {
    return await this.parishionerService.getProfile(id);
  }

  @Post('')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Create new profile' })
  @ApiResponse({
    status: 201,
    description: 'Created Profile',
  })
  async createProfile(
    @Body() data: CreateProfileReqDto,
  ): Promise<GetProfileResDto> {
    return await this.parishionerService.createProfile(data);
  }

  @Patch(':id')
  @Auth(ACCOUNT_ROLE.ADM)
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({
    status: 200,
    description: 'Updated profile',
  })
  @ApiBody({
    type: UpdateProfileReqDto,
  })
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProfileReqDto,
  ): Promise<GetProfileResDto> {
    return await this.parishionerService.updateProfile(id, body);
  }

  @Post('registration-account')
  @ApiOperation({ summary: 'registration account' })
  @ApiResponse({
    status: 200,
    description: 'registration account successfully',
  })
  @ApiBody({
    type: RegistrationAccountReqDto,
  })
  async registrationAccount(@Body() body: RegistrationAccountReqDto) {
    return await this.parishionerService.registrationAccount(body);
  }

  @Post('import-parishioner')
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
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  @UseInterceptors(FileInterceptor('file'))
  async UploadExcelFile(@UploadedFile() file: Express.Multer.File) {
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
        fullname: item['fullname'],
        christianName: item['christianName'],
        dateOfBirth: item['dateOfBirth'].toISOString().split('T')[0],
        gender: item['gender'],
        name_father: item['name_father'],
        name_mother: item['name_mother'],
        phonenumber: item['phonenumber'],
        address: item['address'],
        parish_clusterId: item['parish_clusterId'],
        position: item['position'],
        parish: item['parish'],
        diocese: item['diocese'],
      };
    });

    // console.log(data);
    // return data;
    return await this.parishionerService.importData(data);
  }
}
