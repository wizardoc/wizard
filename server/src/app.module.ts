import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HTTP, HTTPFactory} from './services/http-services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HTTP, HTTPFactory],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(ReverseProxyMiddleware).forRoutes('*');
  // }
}
