export type Optional<T> = {[P in keyof T]?: T[P]};

export interface Dict<T> {
  [index: string]: T;
}

export type Omit<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;
