import {HTTPResponseErrorCatch, AxiosError} from '@wizardoc/http-request';

export class ResErrorCatcher implements HTTPResponseErrorCatch {
  catchRes(err: AxiosError): void {
    throw err;
  }
}
