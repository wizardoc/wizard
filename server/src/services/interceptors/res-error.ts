import {HTTPResponseErrorCatch, AxiosError} from '@wizardoc/http-request';

export class ResError implements HTTPResponseErrorCatch {
  catchRes(err: AxiosError): any {
    throw err;
  }
}
