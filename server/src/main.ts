import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {GlobalErrorFilter, TransferRequest} from './filters';
import {HTTP} from './services';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: `http://localhost:${process.env.CLIENT_PORT}`,
    },
  });

  app.useGlobalFilters(
    new TransferRequest(app.select(AppModule).get(HTTP)),
    new GlobalErrorFilter(),
  );

  await app.listen(3000);
}

bootstrap();
