import {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as QS from 'qs';

import {LocalStorage} from '../utils';

import {ContentType} from './request';

interface DataInterface {
  data: unknown;
  err: unknown;
}

interface Res {
  data: DataInterface;
}

interface ResError {
  code: number;
  msg: string;
}

interface ResData<T> {
  data: T;
  err: ResError;
}

export function getData<T extends Res>(res: AxiosResponse<ResData<T>>): T {
  return res.data.data;
}

export function requestType(
  config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> {
  const dup = {...config};
  const {data} = dup;
  const contentType = config.headers['Content-Type'];

  // parse request body use QS
  if (
    contentType === ContentType.Form &&
    Object.prototype.toString.call(data) === '[object Object]'
  ) {
    dup.data = QS.stringify(data);
  }

  // attach jwt in authentication of header
  const JWT = LocalStorage.getItem('jwt');

  console.info(JWT);

  if (JWT) {
    dup.headers = {...dup.headers, Authentication: JWT};
  }

  return dup;
}
