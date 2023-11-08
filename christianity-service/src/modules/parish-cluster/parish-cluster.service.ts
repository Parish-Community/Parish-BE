import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TYPEORM } from '../../core/constants';
import { ParishCluster } from './parish-cluster.entity';
import { AppResponse } from '@/core/app.response';
import { GetParisClustersResDto } from './dto/res.dto';

@Injectable()
export class ParishClusterService {
  private _dataSource: DataSource;
  private readonly _parishClusterRepository: Repository<ParishCluster>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._parishClusterRepository = dataSource.getRepository(ParishCluster);
  }

  async getParishClusters(): Promise<GetParisClustersResDto> {
    try {
      const parishClusters = await this._parishClusterRepository.find();
      return AppResponse.setSuccessResponse<GetParisClustersResDto>(
        parishClusters,
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetParisClustersResDto>(
        error.message,
      );
    }
  }
}
