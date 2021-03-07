import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {isArray} from '@wizardoc/shared';

import {HTTP, AuthService} from 'src/services';
import {AUTH_KEY} from 'src/constants';
import {GraphQLClientRequest} from 'src/decorators';

@Injectable()
export class Auth implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<GraphQLClientRequest>();
    const token = req.headers[AUTH_KEY];

    // The token cannot be a array
    if (isArray(token)) {
      return false;
    }

    const hasToken = this.authService.validateToken(token);

    if (!hasToken) {
      return false;
    }

    req.token = token;

    return true;
  }
}
