import {HTTPResponseInterceptor, AxiosResponse} from '@wizardoc/http-request';

export class ResData implements HTTPResponseInterceptor {
  onResponse(res: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
    return res.data;
  }
}
