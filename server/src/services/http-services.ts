import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
} from '@wizardoc/http-request';
import {Injectable} from '@nestjs/common';

import ServerConfig from '../.config/proxy-config.json';

@Injectable()
export class HTTPFactory extends HTTPRequestFactory implements HTTPConfigure {
  configure(consume: IConfigure): void {
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
