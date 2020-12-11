import {
  HTTPRequestInterceptor,
  AxiosRequestConfig,
} from '@wizardoc/http-request';
import {Inject} from '@wizardoc/injector';

import {JWT} from '../../jwt-service';

export class RequestType implements HTTPRequestInterceptor {
  @Inject
  jwtService!: JWT;

  onRequest(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // attach jwt in authentication of header
    const JWT = this.jwtService.JWTString;

    return {
      ...config,
      headers: {
        ...config.headers,
        Authentication: JWT,
      },
    };
  }
}
