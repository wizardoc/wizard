import {Injectable} from 'react-ts-di';

import {Time} from './time';

interface CacheContent {
  /** 生命计数，隔一段时间会降低，用一次会增长，用于控制内存 */
  count: number;
  content: unknown;
}

interface Pool {
  [index: string]: CacheContent;
}

@Injectable()
export class CacheService {
  private pool: Pool = {};

  private readonly INIT_COUNT = 2;
  private readonly TIME_CIRCLE = Time.Hour / 2;

  private listenerId!: NodeJS.Timeout;

  constructor() {
    this.listener();
  }

  getContent(key: string): unknown | undefined {
    const cache = this.pool[key];

    if (!cache) {
      return undefined;
    }

    this.enhanceLife(key);

    return cache.content;
  }

  setCache<T>(key: string, content: T): T {
    this.pool[key] = {
      count: this.INIT_COUNT,
      content,
    };

    return content;
  }

  kill(): void {
    clearInterval(this.listenerId);
  }

  clearAll(): void {
    this.pool = {};
  }

  clear(key: string): void {
    Reflect.deleteProperty(this.pool, key);
  }

  private enhanceLife(key: string): void {
    this.pool[key].count++;
  }

  private listener(): void {
    this.listenerId = setInterval(() => {
      for (const key of Object.keys(this.pool)) {
        this.pool[key].count--;

        // 变成 cold data，销毁
        if (this.pool[key].count <= 0) {
          this.clear(key);
        }
      }
    }, this.TIME_CIRCLE);
  }
}
