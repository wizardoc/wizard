import {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as QS from 'qs';

import {errorManager} from '../services';
import {LocalStorage} from '../utils';

import {ContentType} from './request';

interface DataInterface {
  data: unknown;
  err: unknown;
}

interface Res {
  data: DataInterface;
}

/** 后端的错误对象 */
interface ResError {
  /**
   * 错误码
   */
  code: number;
  /**
   * 错误信息，后端抛出的错误信息
   */
  msg: string;
}

/** 后端返回的数据结构 */
interface ResData<T> {
  /**
   * payload 后端返回的数据有效载荷
   */
  data: T;
  /**
   * 错误对象
   */
  err: ResError;
}

export function getData<T extends Res>(res: AxiosResponse<ResData<T>>): T {
  const {data, err} = res.data;

  if (err) {
    /** process error */
    errorManager.spurtError(err.code);

    /** soft failure */
    console.error(errorManager.getErrorMessage(err.code));

    throw new Error(errorManager.getErrorMessage(err.code));
  }

  return data;
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

  dup.withCredentials = true;

  // attach jwt in authentication of header
  const JWT = LocalStorage.getItem('jwt');

  if (JWT) {
    dup.headers = {...dup.headers, Authentication: JWT};
  }

  return dup;
}
