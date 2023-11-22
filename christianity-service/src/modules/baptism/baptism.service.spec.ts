import { Test, TestingModule } from '@nestjs/testing';
import { BaptismService } from './baptism.service';

describe('BaptismService', () => {
  let service: BaptismService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaptismService],
    }).compile();

    service = module.get<BaptismService>(BaptismService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
