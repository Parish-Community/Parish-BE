import { Controller } from '@nestjs/common';
import { ParishClusterService } from './parish_cluster.service';
import { MessagePattern } from '@nestjs/microservices';
import { GetParisClustersResDto } from './dto/res.dto';

@Controller('parish-cluster')
export class ParishClusterController {
  constructor(private readonly parishClusterService: ParishClusterService) {}

  @MessagePattern({ object: 'parish-cluster', cmd: 'get-parish-clusters' })
  async getParishClusters(): Promise<GetParisClustersResDto> {
    return await this.parishClusterService.getParishClusters();
  }
}
