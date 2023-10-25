import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from './service';
import { CreateProfileReqDto } from './dto/profile.dto';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get all profile' })
  @ApiOkResponse({ description: 'The list profile were returned successfully' })
  getProfiles() {
    return this.profileService.getProfiles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by id' })
  @ApiOkResponse({ description: 'The profile was returned successfully' })
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getProfile(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create new profile' })
  @ApiResponse({
    status: 201,
    description: 'Created Profile',
  })
  @ApiBody({
    type: CreateProfileReqDto,
  })
  createRole(@Body() data: CreateProfileReqDto) {
    return this.profileService.createProfile(data);
  }
}