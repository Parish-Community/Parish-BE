import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoleService {
  constructor(
    @Inject('CHRISTIANITY_MICROSERVICE')
    private readonly roleService: ClientProxy,
  ) {}

  getRoles() {
    return this.roleService.send(
      {
        object: 'role',
        cmd: 'get-roles',
      },
      true,
    );
  }
}
