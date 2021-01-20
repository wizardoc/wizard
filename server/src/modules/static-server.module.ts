import {join} from 'path';

import {ServeStaticModule} from '@nestjs/serve-static';

export const StaticServerModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', '..', 'client-dist'),
});
