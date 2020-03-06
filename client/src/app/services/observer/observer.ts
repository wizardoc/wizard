import {NotifyMessage, ChatMessage} from '../message';

export interface NotifyMessageObserver {
  onNotifyMessage(msg: NotifyMessage): void;
  onNotifyMessageAppended(msgs: NotifyMessage[]): void;
}

export interface ChatMessageObserver {
  onChatMessage(msg: ChatMessage): void;
  onChatMessageAppended(msgs: ChatMessage[]): void;
}

type Observers = NotifyMessageObserver & ChatMessageObserver;

export type Observer = Partial<Observers>;

// type UnionToIntersection<U> =
// (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
