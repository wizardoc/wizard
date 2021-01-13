import React, {ComponentType, LazyExoticComponent} from 'react';

export interface DefaultModule<T> {
  default: ComponentType<T>;
}

export function defaultify<T>(
  loader: Promise<T>,
  name: string,
): Promise<DefaultModule<T>> {
  return loader.then(module => ({default: module[name]}));
}

export function lazy<T>(loader: Promise<T>, name: string): LazyExoticComponent<any> {
  return React.lazy(() => defaultify<T>(loader, name));
}
