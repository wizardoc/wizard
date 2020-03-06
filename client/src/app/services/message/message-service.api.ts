import {Injectable} from 'react-ts-di';
import {Group, AbsURL} from 'http-utils';

import {getBaseURL} from '../http';

@Injectable()
@Group('/message')
export class MessageServiceAPI {
  @AbsURL({protocol: 'ws', baseUrl: getBaseURL()})
  connect = '/connect';

  all = '/all';

  send = '/send';

  delete = (id: string): string => `/delete/${id}`;

  revoke = (id: string): string => `/revoke/${id}`;

  read = (id: string): string => `/read/${id}`;
}
