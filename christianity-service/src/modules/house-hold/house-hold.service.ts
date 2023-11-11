import { Injectable, Inject } from '@nestjs/common';
import { TYPEORM } from '../../core/constants';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { HouseHold } from './entities/house-hold.entity';

@Injectable()
export class HouseHoldService {
  private _dataSource: DataSource;
  private readonly _houseHoldRepository: Repository<HouseHold>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._houseHoldRepository = dataSource.getRepository(HouseHold);
  }

  async getHouseHolds(): Promise<HouseHold[]> {
    try {
      const houseHolds = await this._houseHoldRepository.find({
        relations: ['parish_cluster'],
      });
      return houseHolds;
    } catch (error) {
      throw error;
    }
  }

  async importData(data: any): Promise<any> {
    try {
      const houseHolds = await this._houseHoldRepository.save(data);
      const res = {
        status: 200,
        message: 'Import data successfully',
        data: houseHolds,
      };
      return res;
    } catch (error) {
      throw error;
    }
  }
}
