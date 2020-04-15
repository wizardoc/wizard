export const last = <T>(arr: T[]): T | undefined => arr.slice().pop();

export const tail = <T>([_, ...xs]: T[]): T[] => xs;

export const head = <T>([x, ..._]: T[]): T => x;

export const reverseDestruct = <T>(arr: T[]): [T[], T | undefined] => [
  arr.slice(1),
  last(arr),
];
