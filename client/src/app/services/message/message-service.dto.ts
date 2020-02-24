export enum BaseMessageType {
  // carry JWT when first establish websocket channel
  INIT,
}

export enum MessageType {
  CHAT,
  NOTIFY,
}

// used for transmission
export interface BaseMessage<T = any> {
  payload: T;
  type: BaseMessageType;
}

export interface MessageMain {
  title: string;
  body: string;
}

// parsed message
export interface Message {
  id: string;
  main: MessageMain;
  from: string;
  sendTime: number;
  messageType: number;
}

type DispatchedMessage = Omit<Message, 'messageType'>;

export interface NotifyMessage extends DispatchedMessage {}

export interface ChatMessage extends DispatchedMessage {}

export interface Messages {
  notifies: NotifyMessage[];
  chats: ChatMessage[];
}
