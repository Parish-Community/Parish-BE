import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HasRoles } from './role.decorator';
import { ACCOUNT_ROLE } from '@/core/constants';
import { JwtAuthGuard, RolesGuard } from '../guards';

export function Auth(...roles: ACCOUNT_ROLE[]) {
  return roles.length === 0
    ? applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth('access_token'))
    : applyDecorators(
        UseGuards(JwtAuthGuard, RolesGuard),
        HasRoles(...roles),
        ApiBearerAuth('access_token'),
      );
}
