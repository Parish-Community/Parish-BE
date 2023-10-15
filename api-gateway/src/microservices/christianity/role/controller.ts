import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './service';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all role' })
  @ApiResponse({
    status: 200,
    description: 'Get all role',
  })
  getRoles() {
    return this.roleService.getRoles();
  }
}
