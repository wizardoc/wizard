import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ReverseProxyMiddleware} from './middlewares';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ReverseProxyMiddleware).forRoutes('*');
  }
}
