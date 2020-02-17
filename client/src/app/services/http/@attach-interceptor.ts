import Axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
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

type AllowInterceptorTypes =
  | RequestInterceptor
  | ResponseInterceptor
  | ResponseErrorCatcher
  | RequestErrorCatcher;

type InterceptorArgument = AxiosRequestConfig | AxiosResponse;

export function useReq(...interceptors: RequestInterceptor[]): void {
  useInterceptors(interceptors, InterceptorType.Req, false);
}

export function useRes(...interceptors: ResponseInterceptor[]): void {
  useInterceptors(interceptors, InterceptorType.Res, false);
}

export function useResError(...interceptors: ResponseErrorCatcher[]): void {
  useInterceptors(interceptors, InterceptorType.Res, true);
}

export function useReqError(...interceptors: ResponseInterceptor[]): void {
  useInterceptors(interceptors, InterceptorType.Req, true);
}

function attach(
  interceptor: AllowInterceptorTypes,
  isError: boolean,
): (undefined | AllowInterceptorTypes)[] {
  return isError ? [undefined, interceptor] : [interceptor, undefined];
}

function useInterceptors<T extends InterceptorArgument>(
  interceptors: AllowInterceptorTypes[],
  interceptorType: InterceptorType,
  isError: boolean,
): void {
  for (const interceptor of interceptors) {
    (Axios.interceptors[interceptorType] as AxiosInterceptorManager<T>).use(
      ...(attach(interceptor, isError) as any),
    );
  }
}
