import {Injectable, Inject} from '@wizardoc/injector';
import {ResValueArea} from '@wizardoc/http-request';
import {emptyAssert} from '@wizardoc/shared';

import {INIT_PAGE} from 'website/utils';

import {JWT} from '../jwt-service';
import {HTTP} from '../http';
import {Subject} from '../observer';

import {
  BaseMessageType,
  Message,
  MessageType,
  Messages,
  SendMessagePayload,
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
      console.error('Cannot find jwt for create websocket');

      return;
    }

    // send jwt to BE for storage user id and establish map between user and connection
    this.sendMessage(BaseMessageType.INIT, this.jwt.JWTString);
    this.loadMessage();
  }

  onClose(): void {}

  onMessage(msg: Message): void {
    const distributor: ContainerDistributor = {
      [MessageType.NOTIFY]: () => this.subject.notifyNotifyMessageObserver(msg),
      [MessageType.CHAT]: () => this.subject.notifyChatMessageObserver(msg),
    };

    distributor[msg.messageType]();
  }

  onConnectionInit(): void {}

  newMessage(payload: SendMessagePayload): Promise<ResValueArea> {
    return this.http.post(this.api.send, payload);
  }

  async loadMessage(page?: number): Promise<Messages | undefined> {
    const result = await this.http.get<Messages>(this.api.all, {
      page: page ?? INIT_PAGE,
    });

    return result
      .expect(() => {})
      .success(data => {
        emptyAssert(data, ({notifies, chats}) => {
          this.subject.notifyChatMessageAppendedObserver(chats);
          this.subject.notifyNotifyMessageAppendedObserver(notifies);
        });

        return data;
      }).data;
  }

  protected readMessage(id: string): Promise<ResValueArea> {
    return this.http.put(this.api.read(id));
  }

  protected deleteMessage(id: string): Promise<ResValueArea> {
    return this.http.delete(this.api.delete(id));
  }

  protected revokeMessage(id: string): Promise<ResValueArea> {
    return this.http.delete(this.api.revoke(id));
  }
}
