import {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosStatic,
} from 'axios';

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

type InterceptorArgument = AxiosRequestConfig | AxiosResponse;

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

export class Interceptor {
  private use: Use;

  constructor(axios: AxiosStatic) {
    this.use = useInterceptors(axios);
  }

  useReq(...interceptors: RequestInterceptor[]): Interceptor {
    return this.cascade(() => this.use(interceptors, InterceptorType.Req));
  }

  useRes(...interceptors: ResponseInterceptor[]): Interceptor {
    return this.cascade(() => this.use(interceptors, InterceptorType.Res));
  }

  useResError(...interceptors: ResponseErrorCatcher[]): Interceptor {
    return this.cascade(() =>
      this.use(interceptors, InterceptorType.Res, true),
    );
  }

  useReqError(...interceptors: RequestInterceptor[]): Interceptor {
    return this.cascade(() =>
      this.use(interceptors, InterceptorType.Req, true),
    );
  }

  private cascade(exec: () => void): Interceptor {
    exec();
    return this;
  }
}
