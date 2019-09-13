export type Optional<T> = { [P in keyof T]?: T[P] };

export interface Dict<T> {
  [index: string]: T;
}

export type Compose<T, E extends keyof T> = {
  [P in E]: T[P];
};

export type Omit<T, P extends keyof T> = Compose<T, Exclude<keyof T, P>>;
