import {Inject, Injectable} from 'react-ts-di';

import {typeOf} from '../utils';

import {Toast} from './toast';

interface Errors {
  [index: string]: string;
}

@Injectable()
export class ErrorManager {
  @Inject
  private toast!: Toast;

  private readonly ERRORS: Errors = {
    1001: '找不到该组织',
    1002: '创建组织失败',
    1003: '注册失败',
    1004: '该用户已经存在',
    1005: '该用户不存在',
    3001: '创建资源失败',
    4001: '尚无该权限，请重新登录',
    4002: '账户异常',
    4003: '该用户已被禁止',
  };

  private readonly SYSTEM_ERRORS = {
    NetworkError: '网络错误',
  };

  getErrorMessage(errorCode: number | string): string {
    return this.ERRORS[errorCode];
  }

  getErrorMessageBySystem(errMsg: string): string {
    return this.SYSTEM_ERRORS[errMsg.replace(/\s/, '')] || errMsg;
  }

  /** 通过 errorCode 来抛出 toast 错误信息 */
  spurtError(errorCode: number | string): void;
  // tslint:disable-next-line:unified-signatures
  spurtError(e: Error): void;
  spurtError(query: number | string | Error): void {
    if (typeOf(query).isError()) {
      this.toast.error(this.getErrorMessageBySystem((query as Error).message));
    } else {
      this.toast.error(this.getErrorMessage(query as number | string));
    }
  }
}

export const errorManager = new ErrorManager();
