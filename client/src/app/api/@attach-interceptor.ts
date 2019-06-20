import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const enum InterceptorType {
  Req = 'request',
  Res = 'response',
}

type Interceptor = ((
  value: AxiosRequestConfig,
) => AxiosRequestConfig | Promise<AxiosRequestConfig>) &
  ((
    value: AxiosResponse<any>,
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>);

export function useReq(...interceptors: Interceptor[]) {
  useInterceptors(interceptors, InterceptorType.Req);
}

export function useRes(...interceptors: Interceptor[]) {
  useInterceptors(interceptors, InterceptorType.Res);
}

function useInterceptors(
  interceptors: Interceptor[],
  interceptorType: InterceptorType,
) {
  for (const interceptor of interceptors) {
    Axios.interceptors[interceptorType].use(interceptor);
  }
}
