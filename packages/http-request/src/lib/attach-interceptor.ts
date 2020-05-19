import {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosStatic,
} from 'axios';

import {
  HTTPRequestInterceptor,
  HTTPResponseInterceptor,
  HTTPRequestErrorCatch,
  HTTPResponseErrorCatch,
} from './interceptor';

enum InterceptorType {
  Req = 'request',
  Res = 'response',
}

export type RequestInterceptor = (
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

export type ResponseInterceptor = (
  value: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;

export type ResponseErrorCatcher = (err: AxiosError) => void;

export type RequestErrorCatcher = (err: AxiosError) => void;

export type Use = (
  interceptors: AllowInterceptorTypes[],
  interceptorType: InterceptorType,
  isError?: boolean,
) => void;

type AllowInterceptorTypes =
  | RequestInterceptor
  | ResponseInterceptor
  | ResponseErrorCatcher
  | RequestErrorCatcher;

type HTTPInterceptors =
  | HTTPRequestInterceptor
  | HTTPResponseInterceptor
  | HTTPRequestErrorCatch
  | HTTPResponseErrorCatch;

type InterceptorArgument = AxiosRequestConfig | AxiosResponse;

interface Constructable<T> {
  new (...args: any[]): T;
}

function attach(
  interceptor: AllowInterceptorTypes,
  isError?: boolean,
): (undefined | AllowInterceptorTypes)[] {
  return isError ? [undefined, interceptor] : [interceptor, undefined];
}

function useInterceptors(AxiosInstance: AxiosStatic): Use {
  return <T extends InterceptorArgument>(
    interceptors: AllowInterceptorTypes[],
    interceptorType: InterceptorType,
    isError: boolean,
  ): void => {
    for (const interceptor of interceptors) {
      (AxiosInstance.interceptors[interceptorType] as AxiosInterceptorManager<
        T
      >).use(...(attach(interceptor, isError) as any));
    }
  };
}

function typeAssert<T>(target: any, prop: string): target is T {
  return target[prop] !== undefined;
}

export class Interceptor {
  private useInterceptor: Use;

  constructor(axios: AxiosStatic) {
    this.useInterceptor = useInterceptors(axios);
  }

  use(interceptors: Constructable<HTTPInterceptors>[]): void {
    for (const Interceptor of interceptors) {
      const interceptor = new Interceptor();

      if (typeAssert<HTTPRequestInterceptor>(interceptor, 'onRequest')) {
        this.useReq(interceptor.onRequest);
      } else if (
        typeAssert<HTTPResponseInterceptor>(interceptor, 'onResponse')
      ) {
        this.useRes(interceptor.onResponse);
      } else if (typeAssert<HTTPRequestErrorCatch>(interceptor, 'catchReq')) {
        this.useReqError(interceptor.catchReq);
      } else if (typeAssert<HTTPResponseErrorCatch>(interceptor, 'catchRes')) {
        this.useResError(interceptor.catchRes);
      }
    }
  }

  private useReq(...interceptors: RequestInterceptor[]): void {
    this.useInterceptor(interceptors, InterceptorType.Req);
  }

  private useRes(...interceptors: ResponseInterceptor[]): void {
    this.useInterceptor(interceptors, InterceptorType.Res);
  }

  private useResError(...interceptors: ResponseErrorCatcher[]): void {
    this.useInterceptor(interceptors, InterceptorType.Res, true);
  }

  private useReqError(...interceptors: RequestErrorCatcher[]): void {
    this.useInterceptor(interceptors, InterceptorType.Req, true);
  }
}
