import {HTTPMethod, HttpClient, Response, HttpType} from './http-client';
import {Hooks} from './configure';

export interface PostPayload<T = unknown> {
  [index: string]: T;
}

export interface RequestOptions {
  headers?: any;
  useHooks: boolean;
}

export type PartialRequestOptions = Partial<RequestOptions>;

export class HTTPService extends HttpClient {
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

  private async request<R = any, T = {}>(
    type: HttpType,
    method: HTTPMethod,
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R> {
    const {headers, useHooks} = this.parseRequestOptions(options);
    const {beforeRequest, afterResponse} = useHooks
      ? this.hooks ?? new Hooks()
      : new Hooks();

    beforeRequest(method, path, data, headers);

    const result = await this.create<T, R>(type, {
      method,
      path,
      data,
      headers: headers ?? {},
    }).Do();

    afterResponse(result);

    return result;
  }

  private parseRequestOptions(options?: PartialRequestOptions): RequestOptions {
    return {
      ...(options ?? {useHooks: false}),
    } as RequestOptions;
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
