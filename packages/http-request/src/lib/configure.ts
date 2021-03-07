import {AxiosStatic} from 'axios';

import {Interceptor} from './attach-interceptor';
import {HTTPMethod, ResValueArea} from './http-client';

interface ServerConfigSetter {
  setConfig(target: ServerConfigInfo): void;
}

export interface IHooks {
  beforeRequest(
    method: HTTPMethod,
    path: string,
    data?: any,
    headers?: any,
  ): void | Promise<void>;
  afterResponse(result: ResValueArea): void | Promise<void>;
}

export interface IConfigure {
  serverConfigure: ServerConfigSetter;
  interceptor: Interceptor;
  hooks: IHooks;
}

export interface ServerConfigInfo {
  baseUrl: string;
  port: number;
  protocol: string;
  prefix?: string;
}

export class Hooks implements IHooks {
  beforeRequest = () => {};

  afterResponse = () => {};
}

export class ServerConfig {
  private config: ServerConfigInfo | undefined;

  setConfig = (target: ServerConfigInfo | undefined): void => {
    this.config = target;
  };

  getConfig(): ServerConfigInfo | undefined {
    return this.config;
  }

  getBaseURL(): string {
    this.checkConfig();

    const {baseUrl, port, prefix = ''} = this.config!;

    return `${baseUrl}:${port === 80 ? '' : port}${prefix}/`;
  }

  getAbsPath(): string {
    this.checkConfig();

    return `${this.config!.protocol}://${this.getBaseURL()}`;
  }

  checkConfig(): void | never {
    if (!this.config) {
      throw new Error('The config of server is undefined. ');
    }
  }
}

export class Configure {
  private _serverConfig = new ServerConfig();
  private _hooks = new Hooks();

  constructor(private axios: AxiosStatic) {}

  create(): IConfigure {
    return {
      serverConfigure: this.getServerConfigSetter(),
      interceptor: this.getInterceptor(),
      hooks: this._hooks,
    };
  }

  getHooks(): IHooks {
    return this._hooks;
  }

  getServerConfigInfo(): ServerConfigInfo | undefined {
    return this._serverConfig.getConfig();
  }

  private getInterceptor(): Interceptor {
    return new Interceptor(this.axios);
  }

  private getServerConfigSetter(): ServerConfigSetter {
    return {
      setConfig: this._serverConfig.setConfig,
    };
  }

  get serverConfig(): ServerConfig {
    return this._serverConfig;
  }
}
