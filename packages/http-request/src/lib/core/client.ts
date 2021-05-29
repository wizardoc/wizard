import {AxiosError, AxiosStatic} from 'axios';

import {ErrorInteractProcessor, ErrorMessage} from './error';

type Request<R = any> = () => R;

export type Response<R = any> = Promise<ResValueArea<R>>;

type Requests<R> = {
  [index in HttpType]: Request<R>;
};

interface Doer<R> {
  Do(): Response<R>;
}

export type ResValueArea<R = any> = Expectable<R> &
  Successable<R> &
  Result<R> &
  Pipable<R>;

export type ExpectableCB = (err: AxiosError) => ErrorMessage;

export interface Expectable<R> {
  expect: OnExpect<R>;
}

export type OnExpect<R> = (cb?: ExpectableCB) => ResValueArea<R>;

export interface Successable<R> {
  success: OnSuccess<R>;
}

export interface Pipable<R> {
  pipe: OnSuccess<R>;
}

export type OnSuccess<R = any> = (cb: OnSuccessCB<R>) => ResValueArea<R>;
export type OnSuccessCB<R, T = any> = (data: R | undefined) => T;

export interface Result<R> extends Successable<R> {
  data?: R;
  ok: boolean;
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
  headers?: any;
}

export interface HTTPClientOptions {
  addr: string;
  axios: AxiosStatic;
  catcher: ErrorInteractProcessor;
}

export enum ContentType {
  Form = 'application/x-www-form-urlencoded',
}

export interface HTTPClient {
  create<T, R>(type: HttpType, payload: DispatchPayload<T>): Doer<R>;
}

export class BrowserClient {
  constructor(private options: HTTPClientOptions) {}

  create<T, R>(type: HttpType, payload: DispatchPayload<T>): Doer<R> {
    const {path, data, headers, method} = payload;
    const lowerCaseMethod = method.toLowerCase();

    const requests: Requests<R> = {
      ComplexHTTPMethod: () =>
        this.options.axios[lowerCaseMethod]<R>(this.join(path), data || {}, {
          headers: {
            'Content-Type': ContentType.Form,
            ...headers,
          },
        }),
      SimpleHTTPMethod: () =>
        this.options.axios[lowerCaseMethod]<R>(this.join(path), {
          params: data,
          headers: {
            ...headers,
          },
        }),
    };

    return {
      Do: () => this.Do<R>(() => requests[type]()),
    };
  }

  private Do<R>(request: Request<R>): Response<R> {
    let err: AxiosError | undefined;
    let data: R | undefined;

    const sendRequest = async (): Promise<ResValueArea<R>> => {
      try {
        data = await request();
      } catch (e) {
        err = e;
      }

      const valueArea: ResValueArea<R> = {
        data,
        ok: !err,
        success: onSuccuss,
        expect: onExpect,
        pipe,
      };
      const that = this;

      function pipe(cb: OnSuccessCB<R>): ResValueArea {
        return {
          ...valueArea,
          data: cb(data),
        };
      }

      function onSuccuss(cb: OnSuccessCB<R>): ResValueArea {
        return {
          ...valueArea,
          data: err ? data : cb(data),
        };
      }

      function onExpect(cb: ExpectableCB): ResValueArea {
        if (err) {
          const errMsg = cb(err);

          if (errMsg !== undefined || errMsg !== null) {
            that.options.catcher(errMsg, err);
          }
        }

        return valueArea;
      }

      return valueArea;
    };

    return sendRequest();
  }

  private join(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }

    const parsedPath = path.replace(/^\/(.*)/, (_, cap) => cap);

    return `${this.options.addr}${parsedPath}`;
  }
}

const noopFn: any = () => {};
export const noop: ResValueArea = {
  success: noopFn,
  expect: noopFn,
  data: undefined,
  ok: false,
  pipe: noopFn,
};
