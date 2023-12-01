import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { DatabaseModule } from '@/database/database.module';
import { AccountModule } from '../account.module';
import { ConfigModule } from '@nestjs/config';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
      ],
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
