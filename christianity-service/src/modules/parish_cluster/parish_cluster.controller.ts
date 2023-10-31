import { Controller, Get } from '@nestjs/common';
import { ParishClusterService } from './parish_cluster.service';
import { GetParisClustersResDto } from './dto/res.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Parish-cluster')
@Controller('parish-cluster')
export class ParishClusterController {
  constructor(private readonly parishClusterService: ParishClusterService) {}

  @Get()
  @ApiOperation({ summary: 'Get all parish-cluster' })
  @ApiResponse({
    status: 200,
    description: 'Get all parish-cluster',
  })
  async getParishClusters(): Promise<GetParisClustersResDto> {
    return await this.parishClusterService.getParishClusters();
  }
}
