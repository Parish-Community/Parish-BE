import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaptismService } from './baptism.service';
import { GetBaptismResDto } from './dto/res.dto';
import { CreateBaptismReqDto } from './dto/req.dto';
import { JwtAuthGuard } from '@/core/utils/guards';
import { GetAccount } from '@/core/utils/decorator/account.decorator';

@ApiTags('Baptism')
@Controller('baptism')
export class BaptismController {
  constructor(private readonly baptismService: BaptismService) {}

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
}
