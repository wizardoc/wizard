import 'reflect-metadata';

import {Pipe, isFunction} from 'common-utils';

const ABS_PATH_KEY = 'abs_path_key';
const URL_PARAMS_KEY = 'url_params_key';
// const PARAMS_KEY = "params_key"

interface Params {
  [name: string]: unknown;
}

interface AbsURLOptions {
  protocol?: string;
  baseUrl?: string;
}

type ParsedAbsURLOptions = {
  [P in keyof AbsURLOptions]-?: AbsURLOptions[P];
};

function getAbsPath(protocol: string, baseUrl: string): string {
  return `${protocol}://${baseUrl}`;
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
          const val = targetProp[prop];

          // params tpl
          if (isFunction(val)) {
            (this as any)[prop] = (param: string) => `${path}${val(param)}`;
            continue;
          }

          const absPath = getMetadata(ABS_PATH_KEY, prop);
          const URLParams = getMetadata(URL_PARAMS_KEY, prop);
          const requestURL = `${path}${val}`;

          (this as any)[prop] = Pipe.from<string>(requestURL)
            .next(
              url => absPath + url,
              () => !!absPath,
            ) // attach abs path on start of requestURL
            .next(
              url => `${url}?${new URLSearchParams(URLParams).toString()}`,
              () => !!URLParams,
            ) // attach url params on end of requestURL
            .toString();

          // // replace the prop as a method that can be params decorate
          // if(Params){
          //   this[prop] = <T>(replaceParams: T) => {
          //     return Pipe.from<string>(this[prop]).next(url => url.replace(/({[^{}]+})/g, (_, cap) => Params === cap ? replaceParams : cap) // replace params tpl that eq to Params
          //     , () => true)
          //   }
          // }
        }
      }
    } as any;
  };
}

// attach abs url prefix on start of value
export function AbsURL(options?: AbsURLOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    if (!options?.baseUrl) {
      console.error('BaseURL cannot be a undefined');

      return;
    }

    const {baseUrl, protocol}: ParsedAbsURLOptions = {
      protocol: 'http',
      baseUrl: '',
      ...(options || {}),
    };

    const absPrefix = getAbsPath(protocol, baseUrl);

    // set a flag indicate that an abolute path will append to start of api later
    Reflect.defineMetadata(ABS_PATH_KEY, absPrefix, target, propertyKey);
  };
}

// The URLParams decorator will append some params on end of value by URL encoding
export function URLParams(params: Params): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(URL_PARAMS_KEY, params, target, propertyKey);
  };
}

// // The Params decorator will replace the params tpl from origin string
// export function Params(params: string): PropertyDecorator{
//   return (target: object, propertyKey: string | symbol) => {
//     Reflect.defineMetadata(PARAMS_KEY,  params, target, propertyKey)
//   }
// }
