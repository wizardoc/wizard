import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {GlobalErrorFilter} from './filters';
import {HTTP} from './services';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:4200',
    },
  });

  app.useGlobalFilters(new GlobalErrorFilter(app.select(AppModule).get(HTTP)));

  await app.listen(3000);
}

bootstrap();
