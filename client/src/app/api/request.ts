import Axios, {AxiosPromise} from 'axios';
import {Injectable} from 'react-ts-di';

import ServerConfig from '../.config/server-config.json';

import {getData} from './@interceptors';

interface ServerConfig {
  baseUrl: string;
  port: number;
  protocol: string;
  mode: string;
}

const {baseUrl, port, protocol, mode} = ServerConfig as ServerConfig;

export interface PostPayload<T = unknown> {
  [index: number]: T;
}

Axios.interceptors.response.use();

@Injectable()
export class Request {
  private addr: string;

  constructor() {
    this.addr = `${protocol}://${baseUrl}:${port === 80 ? '' : port}/${
      mode === 'dev' ? 'apis/' : ''
    }`;

    Axios.interceptors.response.use(getData);
  }

  get<R, T = {}>(path: string, data?: PostPayload<T>): R {
    return (Axios.get<R>(this.join(path), {
      params: {...data},
    }) as unknown) as R;
  }

  post<R, T>(path: string, data: PostPayload<T>): AxiosPromise<R> {
    return Axios.post<R>(this.join(path), data);
  }

  private join(path: string): string {
    const parsedPath = path.replace(/^\/(.*)/, (_, cap) => cap);

    return `${this.addr}${parsedPath}`;
  }
}
