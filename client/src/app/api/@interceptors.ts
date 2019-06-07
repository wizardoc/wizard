import {AxiosResponse} from 'axios';

export function getData<T = unknown>(res: AxiosResponse<T>): T {
  return res.data;
}
