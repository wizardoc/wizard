import {Injectable} from '@wizardoc/injector';
import {Group, AbsURL} from '@wizardoc/http-utils';

// import {httpFactory} from '../http';

@Injectable()
@Group('/message')
export class MessageServiceAPI {
  @AbsURL({protocol: 'ws', baseUrl: 'localhost:4000'})
  connect = '/connect';

  all = '/all';

  send = '/send';

  delete = (id: string): string => `/delete/${id}`;

  revoke = (id: string): string => `/revoke/${id}`;

  read = (id: string): string => `/read/${id}`;
}
