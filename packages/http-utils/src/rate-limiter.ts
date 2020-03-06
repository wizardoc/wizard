export class Channel<T> {
  private mdata: T[] = [];
  private locks: ((value?: T | PromiseLike<T> | undefined) => void)[] = [];

  constructor(private buffer: number) {}

  async in(data: T): Promise<void> {
    if (this.mdata.length >= this.buffer) {
      await new Promise<T>(resolve => this.locks.push(resolve));
    }

    this.mdata.push(data);
  }

  get(): T | undefined {
    // unlock
    (this.locks.shift() || (() => {}))();

    return this.mdata.shift();
  }
}

type Task<T> = (...args: any[]) => Promise<T>;

export class RateLimiter {
  private chan: Channel<undefined>;

  constructor(limitCount: number) {
    this.chan = new Channel(limitCount);
  }

  async run<T>(task: Task<T>): Promise<T> {
    await this.chan.in(undefined);
    const res = await task();

    this.chan.get();

    return res;
  }

  async all<T>(...tasks: Task<T>[]): Promise<T[]> {
    return Promise.all(tasks.map(task => this.run(task)));
  }
}
