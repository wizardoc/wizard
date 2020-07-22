import Axios, {AxiosError} from 'axios';

import {
  Response,
  IConfigure,
  Configure,
  HTTPService,
  HTTPClientOptions,
  ServerConfig,
  ErrorOperates,
  IHooks,
  PartialRequestOptions,
} from './lib';

export interface IHTTPService {
  get<R = any, T = {}>(path: string, data?: T): Response<R>;

  post<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R>;

  put<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R>;

  delete<R = any, T = {}>(
    path: string,
    data?: T,
    options?: PartialRequestOptions,
  ): Response<R>;
}

export interface HTTPConfigure {
  configure(consume: IConfigure): void;
}

export abstract class HTTPRequestFactory {
  private serverConfigure: Configure | undefined;

  constructor() {
    const serverConfigure = this.getServerConfigure();
    const isImplementHTTPConfigure = (o: unknown): o is HTTPConfigure =>
      !!(o as HTTPConfigure).configure;

    if (isImplementHTTPConfigure(this)) {
      this.configure(serverConfigure.create());
    }
  }

  create(): IHTTPService {
    return new HTTPService(this.getHTTPClientOptions(), this.getHooks());
  }

  abstract errorInteract(errMsg: string | ErrorOperates, err: AxiosError): void;

  getHTTPClientOptions(): HTTPClientOptions {
    const serverConfigure = this.getServerConfigure();

    return {
      addr: serverConfigure.serverConfig.getAbsPath(),
      axios: Axios,
      catcher: this.errorInteract.bind(this),
    };
  }

  getHooks(): IHooks {
    return this.getServerConfigure().getHooks();
  }

  // expose config of server
  getServerConfig(): ServerConfig {
    return this.getServerConfigure().serverConfig;
  }

  private getServerConfigure(): Configure {
    return (
      this.serverConfigure ?? (this.serverConfigure = new Configure(Axios))
    );
  }
}
