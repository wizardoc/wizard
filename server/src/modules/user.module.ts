import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';

import {UserAccessController, UserFollowController} from 'src/controllers';
import {HTTP, HTTPFactory, AuthService} from 'src/services';
import {GraphQL} from 'src/guards';

@Module({
  imports: [],
  controllers: [UserAccessController, UserFollowController],
  providers: [
    HTTPFactory,
    AuthService,
    HTTP,
    {
      provide: APP_GUARD,
      useClass: GraphQL,
    },
  ],
})
export class UserModule {}
