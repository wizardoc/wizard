import {
  HTTPModule,
  HTTPFactory,
  RequestHook,
  HTTPMethod,
  ResValueArea,
} from '../../../..';
import ServerConfig from '../configs/sever-config.json';
import {RequestLogger} from './interceptors/request-logger.interceptor';

@HTTPModule({
  server: ServerConfig,
  interceptors: [RequestLogger],
})
export class AppModule implements RequestHook {
  beforeRequest() {
    console.info('before request');
  }
  afterResponse() {
    console.info('after response');
  }
}

const http = HTTPFactory.create(AppModule);

(async () => {
  const res = await http.get('/users/youncccat');

  // console.info(res);
})();
