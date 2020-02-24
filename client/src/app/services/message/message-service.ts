import {Injectable, Inject} from 'react-ts-di';

import {emptyAssert} from 'src/app/utils';

import {JWT} from '../jwt-service';
import {NotifyService} from '../notify';
import {HTTP} from '../http';

import {
  BaseMessageType,
  Message,
  MessageType,
  Messages,
} from './message-service.dto';
import {MessageConnection} from './@message-connection';
import {MessageServiceAPI} from './@message-service.api';

@Injectable()
export abstract class MessageService extends MessageConnection {
  @Inject
  private jwt!: JWT;

  @Inject
  private notifyService!: NotifyService;

  @Inject
  protected api!: MessageServiceAPI;

  @Inject
  private http!: HTTP;

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
    const containers = {
      [MessageType.NOTIFY]: this.notifyService.messages,

      // [MessageType.CHAT]: (msg: ChatMessage): void => this.onNotifyMessage(msg),
    };

    containers[msg.messageType].push(msg);
  }

  onConnectionInit(): void {}

  private async dispatchMessage(): Promise<void> {
    const {data} = await this.http
      .get<Messages>(this.api.all)
      .expect(() => '获取消息失败');

    emptyAssert(data, data => {
      this.notifyService.messages.push(...data.notifies);
    });
  }
}
