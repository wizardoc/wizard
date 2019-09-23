class BaseStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  setItem(key: string, data: unknown): void {
    if (!data) {
      return;
    }

    this.storage.setItem(
      key,
      typeof data === 'string' ? data : JSON.stringify(data),
    );
  }

  getItem<T>(key: string): T | string | undefined {
    const result = this.storage.getItem(key);

    if (result === '' || result === null) {
      return undefined;
    }

    if (typeof result === 'string') {
      return result;
    }

    return JSON.parse(result);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  clear(): void {
    return this.storage.clear();
  }

  get length(): number {
    return this.storage.length;
  }
}

export const LocalStorage = new BaseStorage(localStorage);
export const SessionStorage = new BaseStorage(sessionStorage);
