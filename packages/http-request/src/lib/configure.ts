import {AxiosStatic} from 'axios';

import {Interceptor} from './attach-interceptor';

interface ServerConfigSetter {
  setConfig(target: ServerConfigInfo): void;
  setDevPrefix(prefix: string): void;
}

export interface IConfigure {
  serverConfigure: ServerConfigSetter;
  interceptor: Interceptor;
}

export interface ServerConfigInfo {
  baseUrl: string;
  port: number;
  protocol: string;
  mode: string;
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

  constructor(private axios: AxiosStatic) {}

  create(): IConfigure {
    return {
      serverConfigure: this.getServerConfigSetter(),
      interceptor: this.getInterceptor(),
    };
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
