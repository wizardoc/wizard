import {Injectable, Inject} from 'react-ts-di';

import {MessageServiceAPI} from './@message-service.api';
import {BaseMessage, Message} from './message-service.dto';

interface EventTable {
  [eventName: string]: Function;
}

@Injectable()
export abstract class MessageConnection {
  @Inject
  protected api!: MessageServiceAPI;

  private webSocketInstance!: WebSocket;

  abstract onOpen(): void;
  abstract onClose(): void;
  abstract onMessage(msg: Message): void;

  registerEvent(eventTable: EventTable): void {
    for (const eventName of Object.keys(eventTable)) {
      this.webSocketInstance.addEventListener(
        eventName,
        eventTable[eventName].bind(this),
      );
    }
  }

  // will be invoke when user info is initialize
  initWebSocket(): void {
    if (this.webSocketInstance) {
      return;
    }

    this.webSocketInstance = new WebSocket(this.api.connect);
    this.registerEvent({
      open: this.onOpen,
      close: this.onClose,
      message: (e: MessageEvent) => {
        const data = JSON.parse(e.data);

        data.main = JSON.parse(data.main);
        this.onMessage(data);
      },
      error: this.onError,
    });
  }

  sendMessage<T = any>(
    type: BaseMessage['type'],
    payload: BaseMessage<T>['payload'],
  ): void {
    this.webSocketInstance.send(JSON.stringify({type, payload}));
  }

  private onError(_: Error): void {
    this.webSocketInstance.close();
  }
}
