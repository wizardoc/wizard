import {join} from 'path';

export const withWebpackPath = (...path: string[]) =>
  join(__dirname, '..', '..', ...path);
