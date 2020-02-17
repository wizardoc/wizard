import {Injectable} from 'react-ts-di';

import {
  useReq,
  useRes,
  ResponseInterceptor,
  useResError,
} from './@attach-interceptor';
import {getData, requestType, errorCatcher} from './interceptors';
import {ContentType, HTTPMethod, HttpClient, Expectable} from './http-client';

export interface PostPayload<T = unknown> {
  [index: string]: T;
}

useReq(requestType);
useRes(getData as ResponseInterceptor);
useResError(errorCatcher);

@Injectable()
export class HTTP extends HttpClient {
  get<R = void, T = {}>(path: string, data?: T): Expectable<R> {
    return this.create<T, R>('SimpleHTTPMethod', {
      method: 'GET',
      path,
      data,
    }).Do();
  }

  post<R = void, T = {}>(
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Expectable<R> {
    return this.complexRequest('POST', path, data, contentType);
  }

  put<R = void, T = {}>(
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Expectable<R> {
    return this.complexRequest('PUT', path, data, contentType);
  }

  delete<R = void, T = {}>(
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Expectable<R> {
    return this.complexRequest('DELETE', path, data, contentType);
  }

  private complexRequest<R = void, T = {}>(
    method: HTTPMethod,
    path: string,
    data?: T,
    contentType?: ContentType,
  ): Expectable<R> {
    return this.create<T, R>('ComplexHTTPMethod', {
      method,
      path,
      data,
      contentType,
    }).Do();
  }
}
