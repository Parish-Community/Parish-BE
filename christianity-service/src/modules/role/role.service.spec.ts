import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role.module';
import { AppResponse } from '@/core/app.response';

const mockRoleRepository = {
  getRoles: jest.fn(),
};

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RoleModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
      ],
      providers: [RoleService],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a successful response with all roles when the database is not empty', async () => {
    const expectedResponse = {
      message: 'Success',
      status: 200,
      data: [
        {
          id: 1,
          name: 'admin',
          roleId: 1,
        },
        {
          id: 2,
          name: 'user',
          roleId: 2,
        },
      ],
      version: 'v1',
    };
    jest.spyOn(service, 'getRoles').mockReturnValueOnce({
      find: jest.fn().mockResolvedValueOnce(expectedResponse),
    } as any);

    const result = await service.getRoles();

    expect(result).toEqual(expectedResponse);
  });
});
