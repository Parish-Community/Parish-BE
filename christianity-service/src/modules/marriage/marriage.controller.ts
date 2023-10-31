import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MarriageService } from './marriage.service';
import { GetMarriageResDto } from './dto/res';
import { CreateReqMarriageDto } from './dto/req';
import { JwtAuthGuard } from '@/core/utils/guards';
import { GetAccount } from '@/core/utils/decorator/account.decorator';

@ApiTags('Marriage')
@Controller('marriages')
export class MarriageController {
  constructor(private readonly marriageService: MarriageService) {}

  @Get('')
  async getMarriages(): Promise<GetMarriageResDto> {
    return await this.marriageService.getMarriages();
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  async createMarriage(
    @GetAccount() account,
    @Body() data: CreateReqMarriageDto,
  ): Promise<any> {
    return await this.marriageService.createMarriage(
      account.payload.accountId,
      data,
    );
  }
}
