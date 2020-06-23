import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HTTP, HTTPFactory} from './services';
import {CategoryController, DocumentDetailController} from './controllers';
// import {OverviewModule} from './modules/overview/overview.module';

@Module({
  imports: [],
  controllers: [AppController, CategoryController, DocumentDetailController],
  providers: [AppService, HTTP, HTTPFactory],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(ReverseProxyMiddleware).forRoutes('*');
  // }
}
