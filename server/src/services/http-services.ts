import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
  ResValueArea,
} from '@wizardoc/http-request';
import {Injectable} from '@nestjs/common';
import {Request, Response} from 'express';
import {RequestPayloadParser} from '@wizardoc/shared';

import ServerConfig from '../.config/proxy-config.json';

import {ResData, ResError} from './interceptors';

@Injectable()
export class HTTPFactory extends HTTPRequestFactory implements HTTPConfigure {
  configure(consume: IConfigure): void {
    consume.serverConfigure.setConfig(ServerConfig);
    consume.interceptor.use([ResData, ResError, RequestPayloadParser]);
  }

  errorInteract(errMsg: string): void {
    console.info(errMsg);
  }
}

@Injectable()
export class HTTP extends HTTPService {
  private allowHTTPMethods = ['options', 'get', 'post', 'delete', 'put'];

  constructor(httpFactory: HTTPFactory) {
    super(httpFactory.getHTTPClientOptions());
  }

  async proxy(
    req: Request,
    res: Response,
    onResData?: (res: ResValueArea) => ResValueArea,
  ): Promise<ResValueArea | undefined> {
    const method = req.method.toLowerCase();

    if (!this.allowHTTPMethods.includes(method)) {
      throw new Error(`Not allow method ${method}`);
    }

    if (method === 'options') {
      res.status(200).send();
      return undefined;
    }

    const result = (await (this as any)[method](
      req.url,
      req.body,
      req.headers,
    )) as ResValueArea;
    const parsedData = (onResData ?? (() => result))(result);

    res.send(parsedData.data);

    return parsedData;
  }
}
