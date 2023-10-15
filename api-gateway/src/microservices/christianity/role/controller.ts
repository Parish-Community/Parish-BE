import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @ApiResponse({
    status: 200,
    description: 'Get all role',
  })
  getRoles() {
    return this.roleService.getRoles();
  }
}
