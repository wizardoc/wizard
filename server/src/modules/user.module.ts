import {Module} from '@nestjs/common';

import {UserAccessController} from 'src/controllers';
import {HTTP, HTTPFactory} from 'src/services';

@Module({
  imports: [],
  controllers: [UserAccessController],
  providers: [HTTPFactory, HTTP],
})
export class UserModule {}
