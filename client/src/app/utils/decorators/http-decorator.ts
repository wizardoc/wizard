import ServerConfig from 'src/app/.config/server-config.json';

import {Pipe} from '../helpers';

const ABS_PATH_KEY = 'abs_path_key';
const PARAMS_KEY = 'params_key';

interface ServerConfig {
  baseUrl: string;
  port: number;
  protocol: string;
  mode: string;
}

interface Params {
  [name: string]: unknown;
}

function getAbsPath({protocol, baseUrl, port, mode}: ServerConfig): string {
  return `${protocol}://${baseUrl}:${port === 80 ? '' : port}${
    mode === 'dev' ? 'apis' : ''
  }`;
}

export function Group(path: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): TFunction | void => {
    // wrap all props without constructor of target class for attach path
    const targetProp = new (target as any)();
    const props = Reflect.ownKeys(targetProp);
    const getMetadata = (key: string, prop: string | number | symbol): any =>
      Reflect.getMetadata(key, targetProp, prop as string);

    // copy all props to the anonymous class and hack all values to attach group path
    return class {
      constructor() {
        for (const prop of props) {
          const absPath = getMetadata(ABS_PATH_KEY, prop);
          const URLParams = getMetadata(PARAMS_KEY, prop);
          const requestURL = `${path}${targetProp[prop]}`;

          this[prop] = Pipe.from<string>(requestURL)
            .next(url => absPath + url, () => !!absPath) // attach abs path on start of requestURL
            .next(
              url => `${url}?${new URLSearchParams(URLParams).toString()}`,
              () => !!URLParams,
            ) // attach url params on end of requestURL
            .toString();
        }
      }
    } as any;
  };
}

// attach abs url prefix on start of value
export function AbsURL(protocol?: string): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const absPrefix = getAbsPath({
      ...ServerConfig,
      protocol: protocol ?? 'http',
    });

    // set a flag indicate that an abolute path will append to start of api later
    Reflect.defineMetadata(ABS_PATH_KEY, absPrefix, target, propertyKey);
  };
}

// The Params decorator will append some params on end of value by URL encoding
export function URLParams(params: Params): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(PARAMS_KEY, params, target, propertyKey);
  };
}
