import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ParisClusterService {
  constructor(
    @Inject('CHRISTIANITY_MICROSERVICE')
    private readonly parishClusterService: ClientProxy,
  ) {}

  getParisClusters() {
    return this.parishClusterService.send(
      {
        object: 'parish-cluster',
        cmd: 'get-parish-clusters',
      },
      true,
    );
  }
}
