import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
} from '@wizardoc/http-request';
import {Injectable, extract} from '@wizardoc/injector';

import ServerConfig from '../../.config/server-config.json';

import {ResErrorCatcher, ResData, RequestType} from './@interceptors';

@Injectable()
class HTTPFactory extends HTTPRequestFactory implements HTTPConfigure {
  configure(consume: IConfigure): void {
    consume.interceptor.use([ResErrorCatcher, ResData, RequestType]);

    consume.serverConfigure.setConfig(ServerConfig);
  }

  errorInteract(errMsg: string): void {
    console.info(errMsg);
  }
}

@Injectable()
export class HTTP extends HTTPService {
  constructor(httpFactory: HTTPFactory) {
    super(httpFactory.getHTTPClientOptions());
  }
}

export const httpFactory = extract(HTTPFactory);
// import {ContentType, HTTPMethod, HttpClient, Response} from './http-client';

// export interface PostPayload<T = unknown> {
//   [index: string]: T;
// }

// // useReq(requestType);
// // useRes(getData as ResponseInterceptor);
// // useResError(errorCatcher);

// export class HTTPService extends HttpClient {
//   get<R = any, T = {}>(path: string, data?: T): Response<R> {
//     return this.create<T, R>('SimpleHTTPMethod', {
//       method: 'GET',
//       path,
//       data,
//     }).Do();
//   }

//   post<R = any, T = {}>(
//     path: string,
//     data?: T,
//     contentType?: ContentType,
//   ): Response<R> {
//     return this.complexRequest('POST', path, data, contentType);
//   }

//   put<R = any, T = {}>(
//     path: string,
//     data?: T,
//     contentType?: ContentType,
//   ): Response<R> {
//     return this.complexRequest('PUT', path, data, contentType);
//   }

//   delete<R = any, T = {}>(
//     path: string,
//     data?: T,
//     contentType?: ContentType,
//   ): Response<R> {
//     return this.complexRequest('DELETE', path, data, contentType);
//   }

//   private complexRequest<R = any, T = {}>(
//     method: HTTPMethod,
//     path: string,
//     data?: T,
//     contentType?: ContentType,
//   ): Response<R> {
//     return this.create<T, R>('ComplexHTTPMethod', {
//       method,
//       path,
//       data,
//       contentType,
//     }).Do();
//   }
// }
