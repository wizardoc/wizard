import {AxiosError} from 'axios';

export enum ErrorOperates {
  GLOBAL_PROCESS,
}

export type ErrorMessage = string | ErrorOperates | void;

export type ErrorInteractProcessor = (errMsg: ErrorMessage, err: AxiosError) => void;

export interface ErrorInteractModule {
  errorInteract: ErrorInteractProcessor;
}

export const isErrorInteractModule = (module: any): module is ErrorInteractModule =>
  !!module.errorInteract;

export const getErrorInteractFromModule = (module: any): ErrorInteractProcessor => {
  if (!isErrorInteractModule(module)) {
    return () => {};
  }

  return module.errorInteract;
};
