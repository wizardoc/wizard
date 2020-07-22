import {AxiosStatic} from 'axios';

import {Interceptor} from './attach-interceptor';
import {HTTPMethod, ResValueArea} from './http-client';

interface ServerConfigSetter {
  setConfig(target: ServerConfigInfo): void;
  setDevPrefix(prefix: string): void;
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
  mode: string;
}

export class Hooks implements IHooks {
  beforeRequest = () => {};

  afterResponse = () => {};
}

export class ServerConfig {
  private config: ServerConfigInfo | undefined;
  private prefix: string = 'apis';

  // constructor() {
  // this._config = {} as any;
  // }

  // tslint:disable-next-line:adjacent-overload-signatures

  setConfig = (target: ServerConfigInfo | undefined): void => {
    this.config = target;
  };

  setDevPrefix = (prefix: string) => {
    this.prefix = prefix;
  };

  getConfig(): ServerConfigInfo | undefined {
    return this.config;
  }

  getBaseURL(): string {
    this.checkConfig();

    const {baseUrl, port, mode} = this.config!;

    return `${baseUrl}:${port === 80 ? '' : port}/${
      mode === 'dev' ? `${this.prefix}` : ''
    }`;
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
      setDevPrefix: this._serverConfig.setDevPrefix,
    };
  }

  get serverConfig(): ServerConfig {
    return this._serverConfig;
  }
}
