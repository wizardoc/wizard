import QS from 'qs';
import {
  HTTPRequestInterceptor,
  AxiosRequestConfig,
  ContentType,
} from '@wizardoc/http-request';

import {isObject} from './typeof';

export class RequestPayloadParser implements HTTPRequestInterceptor {
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

    return dup;
  }
}
