import {Injectable, Inject} from '@wizardoc/injector';
import {observable, computed} from 'mobx';
import {ResValueArea, noop} from '@wizardoc/http-request';
import {traverse} from '@wizardoc/shared';

import {NotifyMessage, MessageService} from '../message';
import {Subject, NotifyMessageObserver} from '../observer';

interface MessageTable {
  [id: string]: NotifyMessage;
}

@Injectable()
export class NotifyService extends MessageService
  implements NotifyMessageObserver {
  get messages(): NotifyMessage[] {
    return this.getMessages('isDelete', false);
  }

  get deletedMessages(): NotifyMessage[] {
    return this.getMessages('isDelete', true);
  }

  @computed
  get unreadMessageCount(): number {
    return this.getMessages('isRead', false).length;
  }

  @computed
  get ids(): IterableIterator<string> {
    return observable.map(this.messageTable).keys();
  }

  @Inject
  subject!: Subject;

  // create hash table to find the message faster
  private messageTable: MessageTable = {};

  @observable
  private notifyMessages: NotifyMessage[] = [];

  constructor() {
    super();
    this.subject.add(this);
  }

  onNotifyMessageAppended = (msgs: NotifyMessage[]): void => {
    traverse(msgs, msg => {
      this.messageTable[msg.id] = msg;
    });

    this.notifyMessages = this.notifyMessages.concat(msgs);
  };

  onNotifyMessage = (msg: NotifyMessage): void => {
    this.messageTable[msg.id] = msg;
    this.notifyMessages.unshift(msg);
  };

  async readNotifyMessage(id: string): Promise<ResValueArea> {
    const msg = this.findMessage(id);

    if (msg.isRead) {
      return noop;
    }

    msg.isRead = true;

    return this.readMessage(id);
  }

  deleteNotifyMessage(id: string): Promise<ResValueArea> {
    this.findMessage(id).isDelete = true;

    return this.deleteMessage(id);
  }

  revokeMessage(id: string): Promise<ResValueArea> {
    this.findMessage(id).isDelete = false;

    return this.revokeMessage(id);
  }

  private getMessages<
    P extends keyof NotifyMessage,
    V extends NotifyMessage[P]
  >(prop: P, tag: V): NotifyMessage[] {
    return this.notifyMessages.filter(msg => msg[prop] === tag);
  }

  private findMessage(id: string): NotifyMessage {
    return this.messageTable[id];
  }
}
