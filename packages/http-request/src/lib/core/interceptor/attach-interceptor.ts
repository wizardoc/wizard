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

export type ResponseErrorCatcher = (err: AxiosError) => any;

export type RequestErrorCatcher = (err: AxiosError) => any;

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

export type HTTPInterceptors =
  | HTTPRequestInterceptor
  | HTTPResponseInterceptor
  | HTTPRequestErrorCatch
  | HTTPResponseErrorCatch;

type InterceptorArgument = AxiosRequestConfig | AxiosResponse;

export interface Constructable<T> {
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
      (AxiosInstance.interceptors[interceptorType] as AxiosInterceptorManager<T>).use(
        ...(attach(interceptor, isError) as any),
      );
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
    for (const InterceptorConstructor of interceptors) {
      const interceptor = new InterceptorConstructor();
      const bindThis = (method: Function) => method.bind(interceptor);

      if (typeAssert<HTTPRequestInterceptor>(interceptor, 'onRequest')) {
        this.useReq(bindThis(interceptor.onRequest));
      } else if (typeAssert<HTTPResponseInterceptor>(interceptor, 'onResponse')) {
        this.useRes(bindThis(interceptor.onResponse));
      } else if (typeAssert<HTTPRequestErrorCatch>(interceptor, 'catchReq')) {
        this.useReqError(bindThis(interceptor.catchReq));
      } else if (typeAssert<HTTPResponseErrorCatch>(interceptor, 'catchRes')) {
        this.useResError(bindThis(interceptor.catchRes));
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
