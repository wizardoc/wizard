import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
  AxiosError,
} from '@wizardoc/http-request';
import {Injectable, extract, Inject} from '@wizardoc/injector';
import {RequestPayloadParser} from '@wizardoc/shared';

import ServerConfig from '../../.config/server-config.json';
import {ErrorManager} from '../error-manager';
import {Toast} from '../toast';

import {ResErrorCatcher, ResData, RequestType} from './@interceptors';

@Injectable()
class HTTPFactory extends HTTPRequestFactory implements HTTPConfigure {
  @Inject
  errorManager!: ErrorManager;

  @Inject
  toast!: Toast;

  configure(consume: IConfigure): void {
    consume.interceptor.use([
      ResErrorCatcher,
      ResData,
      RequestPayloadParser,
      RequestType,
    ]);

    consume.serverConfigure.setConfig(ServerConfig);
  }

  errorInteract(errMsg: string, err: AxiosError): void {
    const result = this.errorManager.getErrorMessage(
      err.response?.data.err?.code,
    );

    this.toast.error(result ?? errMsg);

    if (!result && !errMsg) {
      this.errorManager.spurtError(err);
    }
  }
}

@Injectable()
export class HTTP extends HTTPService {
  constructor(httpFactory: HTTPFactory) {
    super(httpFactory.getHTTPClientOptions());
  }
}

export const httpFactory = extract(HTTPFactory);
