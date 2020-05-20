import {genSync, SyncPair} from './sync';

export abstract class Initialize {
  private syncPair: SyncPair;

  constructor() {
    this.syncPair = genSync();
    this.initOperates();
  }

  async initOperates(): Promise<void> {
    await this.init();

    this.syncPair.unlock();
  }

  isInit(): Promise<void> {
    return this.syncPair.lock;
  }

  abstract async init(): Promise<void>;
}
