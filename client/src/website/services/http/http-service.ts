import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
  AxiosError,
} from '@wizardoc/http-request';
import {Injectable, extract, Inject} from '@wizardoc/injector';
import {RequestPayloadParser} from '@wizardoc/shared';

import ServerDevConfig from 'website/.config/server-config.dev.json';
import ServerProdConfig from 'website/.config/server-config.prod.json';
import {runtimeEnv} from 'website/utils';

import {ErrorManager} from '../error-manager';
import {Toast} from '../toast';
import {BackdropService} from '../backdrop-service';

import {ResErrorCatcher, ResData, RequestType} from './@interceptors';

@Injectable()
class HTTPFactory extends HTTPRequestFactory implements HTTPConfigure {
  @Inject
  errorManager!: ErrorManager;

  @Inject
  backdropService!: BackdropService;

  @Inject
  toast!: Toast;

  configure({interceptor, serverConfigure, hooks}: IConfigure): void {
    interceptor.use([ResErrorCatcher, ResData, RequestPayloadParser, RequestType]);

    serverConfigure.setConfig(
      runtimeEnv({DEVELOPMENT: ServerDevConfig, PRODUCTION: ServerProdConfig}),
    );

    hooks.beforeRequest = (): void => {
      this.backdropService.show();
    };

    hooks.afterResponse = (): void => {
      this.backdropService.hide();
    };
  }

  errorInteract(errMsg: string, err: AxiosError): void {
    const result = this.errorManager.getErrorMessage(err.response?.data.err?.code);

    this.toast.error(result ?? errMsg);

    if (!result && !errMsg) {
      this.errorManager.spurtError(err);
    }
  }
}

@Injectable()
export class HTTP extends HTTPService {
  constructor(httpFactory: HTTPFactory) {
    super(httpFactory.getHTTPClientOptions(), httpFactory.getHooks());
  }
}

export const httpFactory = extract(HTTPFactory);
