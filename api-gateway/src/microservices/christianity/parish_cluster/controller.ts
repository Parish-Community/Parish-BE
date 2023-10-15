import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParisClusterService } from './service';

@ApiTags('Parish-cluster')
@Controller('parish-clusters')
export class ParisClusterController {
  constructor(private readonly parisClusterService: ParisClusterService) {}

  @Get()
  @ApiOperation({ summary: 'Get all parish-cluster' })
  @ApiResponse({
    status: 200,
    description: 'Get all parish-cluster',
  })
  getRoles() {
    return this.parisClusterService.getParisClusters();
  }
}
