import { Test, TestingModule } from '@nestjs/testing';
import { HouseHoldService } from './house-hold.service';

describe('HouseHoldService', () => {
  let service: HouseHoldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseHoldService],
    }).compile();

    service = module.get<HouseHoldService>(HouseHoldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
