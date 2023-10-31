import { Test, TestingModule } from '@nestjs/testing';
import { MarriageService } from './marriage.service';

describe('MarriageService', () => {
  let service: MarriageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarriageService],
    }).compile();

    service = module.get<MarriageService>(MarriageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
