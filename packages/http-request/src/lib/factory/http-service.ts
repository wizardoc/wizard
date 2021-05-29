import {HTTPMethod, Response, HttpType, HTTPClient} from '../core';
import {RequestHook} from '../module';

export interface PostPayload<T = unknown> {
  [index: string]: T;
}

export interface RequestOptions {
  headers?: any;
  useHooks: boolean;
}

export type PartialRequestOptions = Partial<RequestOptions>;

export class HTTPService {
  constructor(private client: HTTPClient, private hooks: RequestHook) {}

  get<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    return this.simpleRequest('GET', path, data, options);
  }

  post<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    return this.complexRequest('POST', path, data, options);
  }

  put<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    return this.complexRequest('PUT', path, data, options);
  }

  delete<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    return this.complexRequest('DELETE', path, data, options);
  }

  // Common request function that is wrapper of all request function, in other words
  // it can do anything before send real request or intercept response
  private async request<R = any, T = {}>(
    type: HttpType,
    method: HTTPMethod,
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    const {beforeRequest, afterResponse} = this.hooks;

    beforeRequest(method, path, data, options?.headers);

    const result = await this.client
      .create<T, R>(type, {
        method,
        path,
        data,
        headers: options?.headers ?? {},
      })
      .Do();

    afterResponse(result);

    return result;
  }

  private complexRequest<R = any, T = {}>(
    method: HTTPMethod,
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    return this.request('ComplexHTTPMethod', method, path, data, options);
  }

  private simpleRequest<R = any, T = {}>(
    method: HTTPMethod,
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    return this.request('SimpleHTTPMethod', method, path, data, options);
  }
}
