import {HTTPMethod, HttpClient, Response, HttpType} from './http-client';

export interface PostPayload<T = unknown> {
  [index: string]: T;
}

export class HTTPService extends HttpClient {
  get<R = any, T = {}>(path: string, data?: T, headers?: any): Response<R> {
    return this.simpleRequest('GET', path, data, headers);
  }

  post<R = any, T = {}>(path: string, data?: T, headers?: any): Response<R> {
    return this.complexRequest('POST', path, data, headers);
  }

  put<R = any, T = {}>(path: string, data?: T, headers?: any): Response<R> {
    return this.complexRequest('PUT', path, data, headers);
  }

  delete<R = any, T = {}>(path: string, data?: T, headers?: any): Response<R> {
    return this.complexRequest('DELETE', path, data, headers);
  }

  private request<R = any, T = {}>(
    type: HttpType,
    method: HTTPMethod,
    path: string,
    data?: T,
    headers?: any,
  ): Response<R> {
    return this.create<T, R>(type, {
      method,
      path,
      data,
      headers: headers ?? {},
    }).Do();
  }

  private complexRequest<R = any, T = {}>(
    method: HTTPMethod,
    path: string,
    data?: T,
    headers?: any,
  ): Response<R> {
    return this.request('ComplexHTTPMethod', method, path, data, headers);
  }

  private simpleRequest<R = any, T = {}>(
    method: HTTPMethod,
    path: string,
    data?: T,
    headers?: any,
  ): Response<R> {
    return this.request('SimpleHTTPMethod', method, path, data, headers);
  }
}
