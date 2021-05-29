import {HTTPMethod, ResValueArea} from '../core';

export interface RequestHook {
  beforeRequest(
    method: HTTPMethod,
    path: string,
    data?: any,
    headers?: any,
  ): void | Promise<void>;
  afterResponse(result: ResValueArea): void | Promise<void>;
}

const HOOK_NOOP: RequestHook = {
  beforeRequest: () => {},
  afterResponse: () => {},
};

export const isHooksModule = (module: any): module is RequestHook =>
  module.beforeRequest || module.afterResponse;

export const getHooksFromModule = (module: any): RequestHook => {
  if (!isHooksModule(module)) {
    return HOOK_NOOP;
  }

  const {beforeRequest, afterResponse} = module;

  return {
    ...HOOK_NOOP,
    beforeRequest,
    afterResponse,
  };
};
