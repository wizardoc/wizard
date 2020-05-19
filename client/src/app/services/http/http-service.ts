import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
} from '@wizardoc/http-request';
import {Injectable, extract} from '@wizardoc/injector';
import {RequestPayloadParser} from '@wizardoc/shared';

import ServerConfig from '../../.config/server-config.json';

import {ResErrorCatcher, ResData, RequestType} from './@interceptors';

@Injectable()
class HTTPFactory extends HTTPRequestFactory implements HTTPConfigure {
  configure(consume: IConfigure): void {
    consume.interceptor.use([
      ResErrorCatcher,
      ResData,
      RequestPayloadParser,
      RequestType,
    ]);

    consume.serverConfigure.setConfig(ServerConfig);
  }

  errorInteract(errMsg: string): void {
    console.info(errMsg);
  }
}

@Injectable()
export class HTTP extends HTTPService {
  constructor(httpFactory: HTTPFactory) {
    super(httpFactory.getHTTPClientOptions());
  }
}

export const httpFactory = extract(HTTPFactory);
