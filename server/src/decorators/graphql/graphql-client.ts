import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Request} from 'express';
import {GraphQLClient as GraphQLRequestClient} from 'graphql-request';

import {AUTH_KEY} from 'src/constants';

export interface GraphQLClientRequest extends Request {
  graphQLEndpoint: string;
  token: string;
}

class GraphQLClientFactory {
  private client: GraphQLRequestClient;

  private constructor(endpoint: string) {
    this.client = new GraphQLRequestClient(endpoint);
  }

  private static instance: GraphQLClientFactory | undefined;

  static getClient(endpoint: string): GraphQLRequestClient {
    const instance =
      GraphQLClientFactory.instance ??
      (GraphQLClientFactory.instance = new GraphQLClientFactory(endpoint));

    return instance.client;
  }
}

export const GraphQL = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<GraphQLClientRequest>();
  const {graphQLEndpoint, token} = req;

  if (!graphQLEndpoint) {
    throw new Error('Cannot find endpoint of GraphQL from the request');
  }

  const client = GraphQLClientFactory.getClient(graphQLEndpoint);

  client.setHeader(AUTH_KEY, token);

  return client;
});
