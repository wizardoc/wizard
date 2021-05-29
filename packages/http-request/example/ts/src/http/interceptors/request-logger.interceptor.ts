import {HTTPRequestInterceptor, AxiosRequestConfig} from '../../../../..';

export class RequestLogger implements HTTPRequestInterceptor {
  onRequest(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    console.info('request ===> ', config.url);

    return config;
  }
}
