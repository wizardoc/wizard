import {Injectable, Inject} from 'react-ts-di';

import {MessageService, NotifyMessage} from '../message';

@Injectable()
export class NotifyService {
  @Inject
  private messageService!: MessageService;

  get messages(): NotifyMessage[] {
    return this.messageService.notifyMessage;
  }
}
