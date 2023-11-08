import { Test, TestingModule } from '@nestjs/testing';
import { ParishionerService } from './parishioner.service';
import { CreateProfileReqDto } from './dto/req.dto';
import { GENDER } from '@/core/constants';
import { DatabaseModule } from '@/database/database.module';
import { ParishionerModule } from './parishioner.module';

describe('ProfileService', () => {
  let service: ParishionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParishionerService],
      imports: [DatabaseModule, ParishionerModule],
    }).compile();

    service = module.get<ParishionerService>(ParishionerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
