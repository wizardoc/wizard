import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {GlobalErrorFilter} from './filters';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalErrorFilter());

  await app.listen(3000);
}

bootstrap();
