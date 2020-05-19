import QS from 'qs';
import {
  HTTPRequestInterceptor,
  AxiosRequestConfig,
  ContentType,
} from '@wizardoc/http-request';
import {isObject} from '@wizardoc/shared';

import {LocalStorage} from 'src/app/utils';

export class RequestType implements HTTPRequestInterceptor {
  onRequest(
    config: AxiosRequestConfig,
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    const dup = {...config};
    const {data} = dup;
    const contentType = config.headers['Content-Type'];

    // parse request body use QS
    if (contentType === ContentType.Form && isObject(data)) {
      dup.data = QS.stringify(data);
    }

    dup.withCredentials = true;

    // attach jwt in authentication of header
    const JWT = LocalStorage.getItem('jwt');

    if (JWT) {
      dup.headers = {...dup.headers, Authentication: JWT};
    }

    return dup;
  }
}
