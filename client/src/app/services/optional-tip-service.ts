import {omit} from 'lodash';
import {action, observable} from 'mobx';
import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../api';
import {CalledOptionalTipInfo, OptionalTipInfo} from '../components';
import {TODO_API} from '../constant';
import {Omit} from '../types/type-utils';

/**
 * 控制顶部 tip 的 service
 * 在弹出顶部 tip 的时候，用户刷新页面，导致 tip 没有加入到待办事项，这种事情的概率相对低
 * 如果在弹出的时就请求接口，导致点击去执行的时候还要执行一次接口，这样的开销很大
 */
@Injectable()
export class OptionalTipService {
  @Inject
  private http!: HTTP;

  /** 只会保存需要显示的 tip */
  @observable
  private _tipInfos: OptionalTipInfo[] = [];

  /** 推送一个 optional tip */
  @action
  push(tipInfo: CalledOptionalTipInfo): void {
    this.tipInfos.push({
      ...tipInfo,
      onExecClick: () => this.remove(this._tipInfos.length - 1),
      onLaterClick: () => {
        this.addToTodoList(tipInfo);
        this.remove(this._tipInfos.length - 1);
      },
    });
  }

  private remove(index: number): void {
    this._tipInfos.splice(index, 1);
  }

  /** 未处理的事情加入待办事项 */
  private addToTodoList(tipInfo: Omit<CalledOptionalTipInfo, 'icon'>): void {
    this.http.post(TODO_API.add, omit(tipInfo, 'icon'));
  }

  get tipInfos(): OptionalTipInfo[] {
    return this._tipInfos;
  }
}
