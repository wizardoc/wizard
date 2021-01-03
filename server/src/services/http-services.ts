import {
  HTTPRequestFactory,
  HTTPConfigure,
  IConfigure,
  HTTPService,
  ResValueArea,
  OnSuccessCB,
} from '@wizardoc/http-request';
import {Injectable} from '@nestjs/common';
import {Request, Response} from 'express';
import {RequestPayloadParser} from '@wizardoc/shared';
import {request} from 'graphql-request';

import ServerConfig from '../.config/proxy-config.json';

import {ResData, ResError} from './interceptors';

interface Variables {
  [key: string]: any;
}

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

  private readonly GRAPHQL_PATH = 'graphql';

  constructor(private httpFactory: HTTPFactory) {
    super(httpFactory.getHTTPClientOptions());
  }

  private get graphqlEndpoint() {
    const {addr} = this.httpFactory.getHTTPClientOptions();

    return `${addr}${this.GRAPHQL_PATH}`;
  }

  async proxy(req: Request, res: Response): Promise<ResValueArea | undefined> {
    const method = req.method.toLowerCase();

    if (!this.allowHTTPMethods.includes(method)) {
      throw new Error(`Not allow method ${method}`);
    }

    if (method === 'options') {
      res.status(200).send();
      return undefined;
    }

    console.info(req.url, req.headers);

    const result = (await (this as any)[method](req.url, req.body, {
      headers: req.headers,
    })) as ResValueArea;

    return result;
  }

  async proxySend(
    req: Request,
    res: Response,
    onData?: OnSuccessCB<any>,
  ): Promise<void> {
    const parsedOnData = onData ?? ((data: any): any => data);
    const result = await this.proxy(req, res);

    if (result) {
      result.expect(({response}) => {
        // console.info(result.data);
        res.status(response.status).send(response?.data ?? undefined);
      });

      if (result.ok) {
        res.send({data: await parsedOnData(result.data.data)});
      }
    }
  }

  // Query data from graphQL server
  sendQuery(q: string, variables?: Variables) {
    return request(this.graphqlEndpoint, q, variables);
  }
}
