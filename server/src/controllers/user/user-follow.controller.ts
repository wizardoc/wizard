import {Controller, Put, Get, Param, UseGuards} from '@nestjs/common';
import {gql, GraphQLClient} from 'graphql-request';

import {GraphQL} from 'src/decorators';
import {Auth} from 'src/guards';

type ParamsWithID<T> = T & {
  id: string;
};

type FollowParams = ParamsWithID<{}>;

type UnFollowParams = ParamsWithID<{}>;

@Controller('user')
@UseGuards(Auth)
export class UserFollowController {
  @Put('follow/:id')
  follow(@Param() params: FollowParams, @GraphQL() client: GraphQLClient) {
    const query = gql`
      mutation followUser($id: String!) {
        followUser(id: $id)
      }
    `;

    return client.request(query, params);
  }

  @Put('unfollow/:id')
  unfollow(@Param() params: UnFollowParams, @GraphQL() client: GraphQLClient) {
    const query = gql`
      mutation unfollow($id: String!) {
        unfollowUser(id: $id)
      }
    `;

    return client.request(query, params);
  }

  @Get('followings')
  followings(@GraphQL() client: GraphQLClient) {
    const query = gql`
      query userInfo {
        userInfo {
          followings {
            username
          }
        }
      }
    `;

    return client.request(query);
  }

  @Get('followers')
  followers(@GraphQL() client: GraphQLClient) {
    const query = gql`
      query userInfo {
        userInfo {
          followers {
            username
          }
        }
      }
    `;

    return client.request(query);
  }
}
