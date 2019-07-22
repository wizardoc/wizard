export type Optional<T> = {[P in keyof T]?: T[P]};

export interface Dict<T> {
  [index: string]: T;
}
