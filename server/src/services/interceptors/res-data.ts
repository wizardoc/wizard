import {HTTPResponseInterceptor, AxiosResponse} from '@wizardoc/http-request';

export class ResData implements HTTPResponseInterceptor {
  onResponse(res: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
    console.info(res.data);
    return res.data;
  }
}
