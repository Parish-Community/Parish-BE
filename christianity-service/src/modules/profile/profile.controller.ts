import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { ProfileService } from './profile.service';
import { CreateProfileReqDto } from './dto/req.dto';
import { GetProfileResDto, GetProfilesResDto } from './dto/res.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //Get all profile
  // @Get('list')
  // @ApiOperation({ summary: 'Get all profile' })
  // @ApiOkResponse({ description: 'The list profile were returned successfully' })
  @MessagePattern({ object: 'profile', cmd: 'get-list-profile' })
  async getProfiles(): Promise<GetProfilesResDto> {
    return await this.profileService.getProfiles();
  }

  @MessagePattern({ object: 'profile', cmd: 'get-profile-by-id' })
  async getProfile(param: { id: number }): Promise<GetProfileResDto> {
    return await this.profileService.getProfile(param.id);
  }

  @MessagePattern({ object: 'profile', cmd: 'create-profile' })
  async createProfile(
    @Body() data: CreateProfileReqDto,
  ): Promise<GetProfileResDto> {
    return await this.profileService.createProfile(data);
  }
}
