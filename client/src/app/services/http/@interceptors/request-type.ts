import {
  HTTPRequestInterceptor,
  AxiosRequestConfig,
} from '@wizardoc/http-request';

import {LocalStorage} from 'src/app/utils';

export class RequestType implements HTTPRequestInterceptor {
  onRequest(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    // attach jwt in authentication of header
    const JWT = LocalStorage.getItem('jwt');

    return {
      ...config,
      headers: {
        ...config.headers,
        Authentication: JWT,
      },
    };
  }
}
