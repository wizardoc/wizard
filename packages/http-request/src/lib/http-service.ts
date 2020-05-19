import {ContentType, HTTPMethod, HttpClient, Response} from './http-client';

export interface PostPayload<T = unknown> {
  [index: string]: T;
}

export class HTTPService extends HttpClient {
  get<R = any, T = {}>(path: string, data?: T): Response<R> {
    return this.create<T, R>('SimpleHTTPMethod', {
      method: 'GET',
      path,
      data,
    }).Do();
  }

  post<R = any, T = {}>(
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Response<R> {
    return this.complexRequest('POST', path, data, contentType);
  }

  put<R = any, T = {}>(
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Response<R> {
    return this.complexRequest('PUT', path, data, contentType);
  }

  delete<R = any, T = {}>(
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Response<R> {
    return this.complexRequest('DELETE', path, data, contentType);
  }

  private complexRequest<R = any, T = {}>(
    method: HTTPMethod,
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Response<R> {
    return this.create<T, R>('ComplexHTTPMethod', {
      method,
      path,
      data,
      contentType,
    }).Do();
  }
}
