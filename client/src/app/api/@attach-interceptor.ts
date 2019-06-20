import Axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const enum InterceptorType {
  Req = 'request',
  Res = 'response',
}

type RequestInterceptor = (
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

type ResponseInterceptor = (
  value: AxiosResponse<any>,
) => AxiosResponse<any> | Promise<AxiosResponse<any>>;

type InterceptorArgument = AxiosRequestConfig | AxiosResponse<any>;
type Interceptor<T extends InterceptorArgument> =
  | ((value: T) => T | Promise<T>)
  | undefined;

export function useReq(...interceptors: RequestInterceptor[]) {
  useInterceptors(interceptors, InterceptorType.Req);
}

export function useRes(...interceptors: ResponseInterceptor[]) {
  useInterceptors(interceptors, InterceptorType.Res);
}

function useInterceptors<T extends InterceptorArgument>(
  interceptors: (RequestInterceptor | ResponseInterceptor)[],
  interceptorType: InterceptorType,
) {
  for (const interceptor of interceptors) {
    (Axios.interceptors[interceptorType] as AxiosInterceptorManager<T>).use(
      interceptor as Interceptor<T>,
    );
  }
}
