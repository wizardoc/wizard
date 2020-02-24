import {Injectable} from 'react-ts-di';
import {observable} from 'mobx';

import {NotifyMessage} from '../message';

@Injectable()
export class NotifyService {
  @observable
  messages: NotifyMessage[] = [];

  onNotifyMessage(msg: NotifyMessage): void {
    console.info(this.messages);
    this.messages.push(msg);
  }
}
