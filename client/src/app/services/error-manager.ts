import {Inject, Injectable} from 'react-ts-di';

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

  getErrorMessage(errorCode: number | string): string {
    return this.ERRORS[errorCode];
  }

  spurtError(errorCode: number | string): void {
    this.toast.error(this.getErrorMessage(errorCode));
  }
}

export const errorManager = new ErrorManager();
