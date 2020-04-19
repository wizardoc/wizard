export type Unlock = () => void;

export interface SyncPair {
  lock: Promise<void>;
  unlock: Unlock;
}

export function genSync(): SyncPair {
  let unlock: Unlock = () => {};
  let p = new Promise<void>(resolve => (unlock = resolve));

  return {
    unlock,
    lock: p,
  };
}
