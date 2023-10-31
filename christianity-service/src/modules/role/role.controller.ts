import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { GetRolesResDto } from './dto/res.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get all role' })
  @ApiOkResponse({ description: 'The list role were returned successfully' })
  async getRoles(): Promise<GetRolesResDto> {
    return await this.roleService.getRoles();
  }
}
