import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';

import {UserAccessController} from 'src/controllers';
import {HTTP, HTTPFactory} from 'src/services';
import {GraphQL} from 'src/guards';

@Module({
  imports: [],
  controllers: [UserAccessController],
  providers: [
    HTTPFactory,
    HTTP,
    {
      provide: APP_GUARD,
      useClass: GraphQL,
    },
  ],
})
export class UserModule {}
