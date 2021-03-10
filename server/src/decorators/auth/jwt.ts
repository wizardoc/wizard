import {createParamDecorator, ExecutionContext, CustomDecorator} from '@nestjs/common';
import {Request} from 'express';

import {AUTH_KEY} from 'src/constants';

export const Jwt = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const {headers}: Request = ctx.switchToHttp().getRequest();

  return headers[AUTH_KEY];
});
