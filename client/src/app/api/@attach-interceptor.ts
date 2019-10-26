import Axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const enum InterceptorType {
  Req = 'request',
  Res = 'response',
}

export type RequestInterceptor = (
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

export type ResponseInterceptor = (
  value: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;

type InterceptorArgument = AxiosRequestConfig | AxiosResponse;
type Interceptor<T extends InterceptorArgument> =
  | ((value: T) => T | Promise<T>)
  | undefined;

export function useReq(...interceptors: RequestInterceptor[]): void {
  useInterceptors(interceptors, InterceptorType.Req);
}

export function useRes(...interceptors: ResponseInterceptor[]): void {
  useInterceptors(interceptors, InterceptorType.Res);
}

function useInterceptors<T extends InterceptorArgument>(
  interceptors: (RequestInterceptor | ResponseInterceptor)[],
  interceptorType: InterceptorType,
): void {
  for (const interceptor of interceptors) {
    (Axios.interceptors[interceptorType] as AxiosInterceptorManager<T>).use(
      interceptor as Interceptor<T>,
    );
  }
}
