import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as XLSX from 'xlsx';
import { multerOptions } from '@/core/utils/multerconfig';
import { FileUploadReqDto } from './dto/req.dto';
import { HouseHoldService } from './house-hold.service';

@ApiTags('House-hold')
@Controller('house-hold')
export class HouseHoldController {
  constructor(private readonly houseHoldService: HouseHoldService) {}

  @Get('list')
  async getHouseHolds() {
    return await this.houseHoldService.getHouseHolds();
  }

  @Post('upload-xlsx')
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
    console.log('Hello');
    console.log(file);
    // const filePath = `../../assets/upload/${file.filename}`;

    // fs.renameSync(file.path, filePath);

    const workBook: XLSX.WorkBook = XLSX.read(file.buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });

    const sheetName = workBook?.SheetNames[0];
    const sheet: XLSX.WorkSheet = workBook.Sheets[sheetName];

    const jsonData: FileUploadReqDto[] = XLSX.utils.sheet_to_json(sheet, {
      dateNF: 'YYYY-MM-DD',
    });

    const data = jsonData.map((item) => {
      return {
        houseHoldCode: item['houseHoldCode'].toString(),
        parish_clusterId: item['parish_clusterId'],
        address: item['address'],
      };
    });

    console.log(data);
    return await this.houseHoldService.importData(data);
  }
}
