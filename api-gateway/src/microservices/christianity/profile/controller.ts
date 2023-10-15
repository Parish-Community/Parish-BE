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
  constructor(private readonly roleService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get all profile' })
  @ApiOkResponse({ description: 'The list profile were returned successfully' })
  getRoles() {
    return this.roleService.getProfiles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one profile' })
  @ApiOkResponse({ description: 'The profile was returned successfully' })
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getProfile(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create new profile' })
  @ApiResponse({
    status: 200,
    description: 'Created Profile',
  })
  @ApiBody({
    type: CreateProfileReqDto,
  })
  createRole(@Body() data: CreateProfileReqDto) {
    return this.roleService.createProfile(data);
  }
}
