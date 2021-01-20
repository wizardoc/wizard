import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HTTP, HTTPFactory} from './services';
import {CategoryController, DocumentProcessorController} from './controllers';
import {UserModule, StaticServerModule} from './modules';

@Module({
  imports: [UserModule, StaticServerModule],
  controllers: [AppController, CategoryController, DocumentProcessorController],
  providers: [AppService, HTTP, HTTPFactory],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(ReverseProxyMiddleware).forRoutes('*');
  // }
}
