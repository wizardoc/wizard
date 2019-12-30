import {ComponentType} from 'react';
import loadable, {LoadableComponent} from '@loadable/component';

export interface DefaultModule<T> {
  default: ComponentType<T>;
}

export function defaultify<T>(
  loader: Promise<T>,
  name: string,
): Promise<DefaultModule<T>> {
  return loader.then(module => ({default: module[name]}));
}

export function lazy<T>(
  loader: Promise<T>,
  name: string,
): LoadableComponent<any> {
  return loadable(() => defaultify<T>(loader, name));
}
