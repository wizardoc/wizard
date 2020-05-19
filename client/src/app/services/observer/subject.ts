import {Injectable} from '@wizardoc/injector';

import {traverse, emptyAssert} from 'src/app/utils';

import {NotifyMessage, ChatMessage} from '../message';

import {Observer} from './observer';

@Injectable()
export class Subject {
  private observers: Observer[] = [];

  add<T extends Observer>(observer: T): void {
    this.observers.push(observer);
  }

  notifyNotifyMessageObserver(msg: NotifyMessage): void {
    this.notify('onNotifyMessage', msg);
  }

  notifyChatMessageObserver(msg: ChatMessage): void {
    this.notify('onChatMessage', msg);
  }

  notifyNotifyMessageAppendedObserver(msgs: NotifyMessage[]): void {
    this.notify('onNotifyMessageAppended', msgs);
  }

  notifyChatMessageAppendedObserver(msgs: NotifyMessage[]): void {
    this.notify('onChatMessageAppended', msgs);
  }

  private notify<T extends keyof Observer>(method: T, ...args: any[]): void {
    traverse(this.observers, observer =>
      emptyAssert(observer[method], (handler: Function) => handler(...args)),
    );
  }
}
