import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TYPEORM } from '../../core/constants';
import { Role } from './role.entity';
import { GetRolesResDto } from './dto/res.dto';
import { AppResponse } from '@/core/app.response';

@Injectable()
export class RoleService {
  private _dataSource: DataSource;
  private readonly _roleRepository: Repository<Role>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._roleRepository = dataSource.getRepository(Role);
  }

  async getRoles(): Promise<GetRolesResDto> {
    try {
      const roles = await this._roleRepository.find();
      return AppResponse.setSuccessResponse<GetRolesResDto>(roles);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetRolesResDto>(error.message);
    }
  }
}
