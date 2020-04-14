import {Injectable, Inject} from 'react-ts-di';

import {emptyAssert} from 'src/app/utils';

import {JWT} from '../jwt-service';
import {HTTP, ResValueArea} from '../http';
import {Subject} from '../observer';

import {
  BaseMessageType,
  Message,
  MessageType,
  Messages,
} from './message-service.dto';
import {MessageConnection} from './@message-connection';
import {MessageServiceAPI} from './message-service.api';

type MessageHandler = () => void;

interface ContainerDistributor {
  [type: number]: MessageHandler;
}

@Injectable()
export class MessageService extends MessageConnection {
  @Inject
  private jwt!: JWT;

  @Inject
  protected api!: MessageServiceAPI;

  @Inject
  private http!: HTTP;

  @Inject
  protected subject!: Subject;

  onOpen(): void {
    if (!this.jwt.JWTString) {
      console.error('Connot find jwt for create websocket');

      return;
    }

    // send jwt to BE for storage user id and establish map between user and connection
    this.sendMessage(BaseMessageType.INIT, this.jwt.JWTString);
    this.dispatchMessage();
  }

  onClose(): void {}

  onMessage(msg: Message): void {
    const distributor: ContainerDistributor = {
      [MessageType.NOTIFY]: () => this.subject.notifyChatMessageObserver(msg),
      [MessageType.CHAT]: () => this.subject.notifyChatMessageObserver(msg),
    };

    distributor[msg.messageType]();
  }

  onConnectionInit(): void {}

  protected readMessage(id: string): Promise<ResValueArea> {
    return this.http.put(this.api.read(id));
  }

  protected deleteMessage(id: string): Promise<ResValueArea> {
    return this.http.delete(this.api.delete(id));
  }

  protected revokeMessage(id: string): Promise<ResValueArea> {
    return this.http.delete(this.api.revoke(id));
  }

  private async dispatchMessage(): Promise<void> {
    const result = await this.http.get<Messages>(this.api.all);

    result.success(data =>
      emptyAssert(data, ({notifies, chats}) => {
        this.subject.notifyChatMessageAppendedObserver(chats);
        this.subject.notifyNotifyMessageAppendedObserver(notifies);
      }),
    );
  }
}
