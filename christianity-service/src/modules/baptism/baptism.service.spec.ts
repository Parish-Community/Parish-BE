import { Test, TestingModule } from '@nestjs/testing';
import { BaptismService } from './baptism.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/database.module';
import { BaptismModule } from './baptism.module';

describe('BaptismService', () => {
  let service: BaptismService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BaptismModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
      ],
      providers: [BaptismService],
    }).compile();

    service = module.get<BaptismService>(BaptismService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
