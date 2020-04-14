import {Injectable, Inject} from 'react-ts-di';
import {observable, computed} from 'mobx';

import {traverse} from 'src/app/utils';

import {NotifyMessage, MessageService} from '../message';
import {ResValueArea} from '../http';
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
    console.info(this.messageTable);
    return this.getMessages('isRead', false).length;
  }

  @computed
  get ids(): IterableIterator<string> {
    return observable.map(this.messageTable).keys();
  }

  @Inject
  subject!: Subject;

  // create hash table to find the message faster
  @observable
  private messageTable: MessageTable = {};

  constructor() {
    super();
    this.subject.add(this);
  }

  onNotifyMessageAppended = (msgs: NotifyMessage[]): void => {
    traverse(msgs, msg => {
      this.messageTable[msg.id] = msg;
    });
  };

  onNotifyMessage = (msg: NotifyMessage): void => {
    this.messageTable[msg.id] = msg;
  };

  readNotifyMessage(id: string): Promise<ResValueArea> {
    this.findMessage(id).isRead = true;

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
    return Array.from(observable.map(this.messageTable).values()).filter(
      msg => msg[prop] === tag,
    );
  }

  private findMessage(id: string): NotifyMessage {
    return this.messageTable[id];
  }
}
