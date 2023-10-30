import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProfileReqDto, UpdateProfileReqDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('CHRISTIANITY_MICROSERVICE')
    private readonly profileService: ClientProxy,
  ) {}

  getProfiles() {
    return this.profileService.send(
      {
        object: 'profile',
        cmd: 'get-list-profile',
      },
      true,
    );
  }

  getProfile(id: number) {
    return this.profileService.send(
      {
        object: 'profile',
        cmd: 'get-profile-by-id',
      },
      { id },
    );
  }

  createProfile(data: CreateProfileReqDto) {
    return this.profileService.send(
      {
        object: 'profile',
        cmd: 'create-profile',
      },
      data,
    );
  }

  updateProfile(data: UpdateProfileReqDto) {
    return this.profileService.send(
      {
        object: 'profile',
        cmd: 'update-profile',
      },
      data,
    );
  }
}
