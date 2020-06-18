import {Injectable} from '@wizardoc/injector';
import {Group} from '@wizardoc/http-utils';

@Injectable()
@Group('/organization')
export class OrganizationAPI {
  allName = '/name/all';

  all = '/joins/all';

  new = '/new';

  join = '/join';

  invite = '/invite';

  accept = (token: string): string => `/accept/${token}`;

  edit = (id: string): string => `/edit/${id}`;

  remove = (name: string): string => `/remove/${name}`;
}
