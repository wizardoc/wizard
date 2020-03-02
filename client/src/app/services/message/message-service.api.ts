import {Injectable} from 'react-ts-di';

import {Group, AbsURL} from 'src/app/utils';

@Injectable()
@Group('/message')
export class MessageServiceAPI {
  @AbsURL('ws')
  connect = '/connect';

  all = '/all';

  send = '/send';

  delete = (id: string): string => `/delete/${id}`;

  revoke = (id: string): string => `/revoke/${id}`;

  read = (id: string): string => `/read/${id}`;
}
