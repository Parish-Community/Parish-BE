import { ACCOUNT_ROLE } from '@/core/constants';
import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...roles: ACCOUNT_ROLE[]) =>
  SetMetadata('roles', roles);
