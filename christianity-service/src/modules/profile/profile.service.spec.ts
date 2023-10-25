import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { CreateProfileReqDto } from './dto/req.dto';
import { GENDER } from '@/core/constants';
import { DatabaseModule } from '@/database/database.module';
import { ProfileModule } from './profile.module';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
      imports: [DatabaseModule, ProfileModule],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a profile when valid input data is provided', async () => {
    const data: CreateProfileReqDto = {
      fullname: 'John Doe',
      christianName: 'John',
      gender: GENDER.MALE,
      dateOfBirth: new Date('1990-01-01'),
      name_father: 'Father Doe',
      name_mother: 'Mother Doe',
      god_parent: 'God Parent',
      phonenumber: '1234567890',
      avatar: 'avatar.jpg',
      address: '123 Main St',
      diocese: 'Diocese',
      parish: 'Parish',
      parish_clusterId: 1,
    };
    const createdProfile = await service.createProfile(data);

    expect(createdProfile).toBeDefined();
    expect(createdProfile.data.id).toBeDefined();
    expect(createdProfile.data.fullname).toBeDefined();
    expect(createdProfile.data.fullname).toBe('John John Doe');
    expect(createdProfile.status).toBe(201);
    expect(createdProfile.message).toBe('Created profile');
  });
});
