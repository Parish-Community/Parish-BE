import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetAccount = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const req: Request & { user: any } = context.switchToHttp().getRequest();
    return req.user;
  },
);
