import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { ParishionerService } from './parishioner.service';
import { CreateProfileReqDto, UpdateProfileReqDto } from './dto/req.dto';
import { GetProfileResDto, GetProfilesResDto } from './dto/res.dto';
import { Auth } from '@/core/utils/decorator/auth.decorator';
import { ACCOUNT_ROLE } from '@/core/constants';

@ApiTags('Parishioner')
@Controller('parishioner')
export class ParishionerController {
  constructor(private readonly parishionerService: ParishionerService) {}

  @Get()
  @Auth(ACCOUNT_ROLE.ADM)
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
}
