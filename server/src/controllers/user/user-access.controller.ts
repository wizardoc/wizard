import {Body, Controller, Post, Put} from '@nestjs/common';
import {gql} from 'graphql-request';

import {HTTP} from 'src/services';

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
  constructor(private readonly http: HTTP) {}

  @Post('register')
  register(@Body() registerBody: RegisterBody) {
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

    return this.http.sendQuery(query, {userInfo: registerBody});
  }

  @Put('login')
  login(@Body() loginBody: LoginBody) {
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

    return this.http.sendQuery(query, loginBody);
  }
}
