import {Group} from '@wizardoc/http-utils';
import {Injectable} from '@wizardoc/injector';

@Injectable()
@Group('/message')
export class NotifyMessageAPI {
  sendMessage = '/message/send';
}
