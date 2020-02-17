import Axios, {AxiosError} from 'axios';
import {Inject} from 'react-ts-di';

import ServerConfig from '../../.config/server-config.json';
import {Toast} from '../toast';

interface ServerConfig {
  baseUrl: string;
  port: number;
  protocol: string;
  mode: string;
}

type Request<R> = () => R;

type Requests<R> = {
  [index in HttpType]: Request<R>;
};

interface Doer<R> {
  Do(): Expectable<R>;
}

export type ExpectableCB = (err: AxiosError | undefined) => string | void;

export interface Expectable<R> {
  expect(cb?: ExpectableCB): Promise<R extends void ? void : Result<R>>;
}

export interface Result<R> {
  data?: R;
}

export type ExpectFn = () => string | void;
export type SimpleHTTPMethod = 'GET' | 'HEAD';
export type ComplexHTTPMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type HTTPMethod = SimpleHTTPMethod | ComplexHTTPMethod;
export type HttpType = 'SimpleHTTPMethod' | 'ComplexHTTPMethod';

interface DispatchPayload<T> {
  method: HTTPMethod;
  path: string;
  data?: T;
  contentType?: ContentType;
}

export enum ContentType {
  Form = 'application/x-www-form-urlencoded',
}

const {baseUrl, port, protocol, mode} = ServerConfig as ServerConfig;

export class HttpClient {
  private addr: string;

  @Inject
  private toast!: Toast;

  constructor() {
    this.addr = `${protocol}://${baseUrl}:${port === 80 ? '' : port}/${
      mode === 'dev' ? 'apis/' : ''
    }`;
  }

  protected create<T, R>(type: HttpType, payload: DispatchPayload<T>): Doer<R> {
    const {path, data, contentType, method} = payload;

    const requests: Requests<R> = {
      ComplexHTTPMethod: () =>
        Axios[method]<R>(this.join(path), data || {}, {
          headers: {
            'Content-Type': contentType || ContentType.Form,
          },
        }),
      SimpleHTTPMethod: () =>
        Axios[method]<R>(this.join(path), {
          params: {...data},
        }),
    };

    return {
      Do: () => this.Do<R>(() => requests[type]()),
    };
  }

  private Do<R>(request: Request<R>): Expectable<R> {
    let err: AxiosError | undefined;
    let data: R | undefined;

    const expect = async (
      cb?: ExpectableCB,
    ): Promise<R extends void ? void : Result<R>> => {
      try {
        data = await request();
      } catch (e) {
        err = e;
      }

      const errMsg = (cb || (() => {}))(err);

      console.info(err, errMsg, err && errMsg);

      // 抛出 caller 希望抛出的错误信息
      // else 吞并异常
      if (errMsg && err) {
        console.info('aaaaa');
        this.toast.error(errMsg);
      }

      return {data} as any;
    };

    return {expect};
  }

  private join(path: string): string {
    const parsedPath = path.replace(/^\/(.*)/, (_, cap) => cap);

    return `${this.addr}${parsedPath}`;
  }
}
