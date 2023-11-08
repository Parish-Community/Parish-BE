import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUploadDto, FileUploadDto, UploadInput } from './dto';
import * as XLSX from 'xlsx';
import { multerOptions } from '@/core/utils/multerconfig';
import * as fs from 'fs';

@ApiTags('Upload')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload-image')
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
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Post('upload-file')
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
  uploadOtherFile(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadOtherFile(file);
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
  UploadExcelFile(@UploadedFile() file: Express.Multer.File) {
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

    const jsonData: FileUploadDto[] = XLSX.utils.sheet_to_json(sheet, {
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
    return data;
  }
}
