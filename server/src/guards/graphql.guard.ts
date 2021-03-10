import {CanActivate, Injectable, ExecutionContext} from '@nestjs/common';

import {HTTP} from 'src/services';
import {GraphQLClientRequest} from 'src/decorators';

@Injectable()
export class GraphQL implements CanActivate {
  constructor(private http: HTTP) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<GraphQLClientRequest>();

    // Mount endpoint of GraphQL on request object to visit it
    // by GraphQL client later
    req.graphQLEndpoint = this.http.graphqlEndpoint;

    return true;
  }
}
