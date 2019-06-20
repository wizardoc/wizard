import {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as Qs from 'qs';

import {ContentType} from './request';

export function getData<T = unknown>(res: AxiosResponse<T>): T {
  return res.data;
}

export function requestType(
  config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> {
  console.info(config);
  const dup = {...config};
  const {data} = dup;
  const contentType = config.headers['Content-Type'];

  if (contentType === ContentType.Form) {
    dup.data = Qs.stringify(data);
  }

  return dup;
}
