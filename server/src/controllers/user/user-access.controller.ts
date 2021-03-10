import {Body, Controller, Post, Put} from '@nestjs/common';
import {gql, GraphQLClient} from 'graphql-request';

import {GraphQL} from 'src/decorators';

interface RegisterBody {
  displayName: string;
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

@Controller('user')
export class UserAccessController {
  @Post('register')
  register(@Body() registerBody: RegisterBody, @GraphQL() client: GraphQLClient) {
    const query = gql`
      mutation register($userInfo: CreateUserInfo!) {
        createUser(userInfo: $userInfo) {
          id
          username
          displayName
          avatar
          registerTime
        }
      }
    `;

    return client.request(query, {userInfo: registerBody});
  }

  @Put('login')
  login(@Body() loginBody: LoginBody, @GraphQL() client: GraphQLClient) {
    const query = gql`
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          user {
            id
            username
            displayName
            avatar
            registerTime
            loginTime
          }
          token
        }
      }
    `;

    return client.request(query, loginBody);
  }
}
