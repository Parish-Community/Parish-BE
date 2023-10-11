import { Test, TestingModule } from '@nestjs/testing';
import { ParishClusterService } from './parish_cluster.service';

describe('ParishClusterService', () => {
  let service: ParishClusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParishClusterService],
    }).compile();

    service = module.get<ParishClusterService>(ParishClusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
