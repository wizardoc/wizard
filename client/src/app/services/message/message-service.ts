import {Injectable, Inject} from 'react-ts-di';
import {observable} from 'mobx';

import {JWT} from '../jwt-service';

import {
  BaseMessageType,
  NotifyMessage,
  ChatMessage,
  Message,
  MessageType,
} from './message-service.dto';
import {MessageConnection} from './@message-connection';

@Injectable()
export class MessageService extends MessageConnection {
  @Inject
  private jwt!: JWT;

  @observable
  private _notifyMessages: NotifyMessage[] = [
    {
      id: 'ashfdhg=asdvbjasdg',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          `,
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg2',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg3',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg7',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },

    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg4',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
    {
      id: 'ashfdhg=asdvbjasdg5',
      from: 'zzh',
      main: {
        title: 'This is title.',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
      },
      sendTime: 1582206745373,
    },
  ];

  @observable
  private _chatMessage: ChatMessage[] = [];

  onOpen(): void {
    if (!this.jwt.JWTString) {
      console.error('Connot find jwt for create websocket');

      return;
    }

    this.sendMessage(BaseMessageType.INIT, this.jwt.JWTString);
  }

  onClose(): void {}

  onMessage(e: MessageEvent): void {
    const data: Message = e.data;
    const containers = {
      [MessageType.NOTIFY]: this.notifyMessage,
      [MessageType.CHAT]: this.chatMessage,
    };

    containers[data.messageType].push(data);
  }

  get notifyMessage(): NotifyMessage[] {
    return this._notifyMessages;
  }

  get chatMessage(): ChatMessage[] {
    return this._chatMessage;
  }
}
