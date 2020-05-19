import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export interface HTTPResponseInterceptor {
  onResponse(res: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;
}

export interface HTTPRequestInterceptor {
  onRequest(
    req: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig>;
}

export interface HTTPRequestErrorCatch {
  catchReq(err: AxiosError): void;
}

export interface HTTPResponseErrorCatch {
  catchRes(err: AxiosError): void;
}
