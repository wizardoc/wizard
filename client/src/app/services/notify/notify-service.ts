import {Injectable, Inject} from 'react-ts-di';
import {observable} from 'mobx';

import {traverse} from 'src/app/utils';

import {NotifyMessage, MessageService} from '../message';
import {Expectable} from '../http';
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

  get unreadMessageCount(): number {
    console.info(this.messageTable);
    console.info(Object.keys(this.messageTable));

    return this.getMessages('isRead', false).length;
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

  readNotifyMessage(id: string): Expectable<void> {
    this.findMessage(id).isRead = true;

    return this.readMessage(id);
  }

  deleteNotifyMessage(id: string): Expectable<void> {
    this.findMessage(id).isDelete = true;

    return this.deleteMessage(id);
  }

  revokeMessage(id: string): Expectable<void> {
    this.findMessage(id).isDelete = false;

    return this.revokeMessage(id);
  }

  private getMessages<
    P extends keyof NotifyMessage,
    V extends NotifyMessage[P]
  >(prop: P, tag: V): NotifyMessage[] {
    console.info(
      Object.keys(this.messageTable)
        .map(id => this.messageTable[id])
        .filter(msg => msg[prop] === tag),
    );

    return Object.keys(this.messageTable)
      .map(id => this.messageTable[id])
      .filter(msg => msg[prop] === tag);
  }

  private findMessage(id: string): NotifyMessage {
    return this.messageTable[id];
  }
}
