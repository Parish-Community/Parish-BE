import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomClientProxy {
  constructor(
    @Inject('PROJECT_MICROSERVICE') private projectClient: ClientProxy,
    @Inject('SHARE_MICROSERVICE') private shareClient: ClientProxy,
  ) {}

  send(pattern: { object: string; cmd: string }, payload: any) {
    return this.projectClient.send(pattern, payload);
  }
  sendSharedService(pattern: { object: string; cmd: string }, payload: any) {
    return this.shareClient.send(pattern, payload);
  }
}
