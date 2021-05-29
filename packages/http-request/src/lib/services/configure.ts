export interface ServerConfigInfo {
  baseUrl: string;
  port: number;
  protocol: string;
  prefix?: string;
}

export class ServerConfig {
  constructor(private config: ServerConfigInfo) {}

  getBaseURL(): string {
    const {baseUrl, port, prefix = ''} = this.config!;

    return `${baseUrl}:${port === 80 ? '' : port}${prefix}/`;
  }

  getAbsPath(): string {
    return `${this.config!.protocol}://${this.getBaseURL()}`;
  }
}
