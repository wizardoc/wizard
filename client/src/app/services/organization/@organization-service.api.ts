import {Injectable} from 'react-ts-di';
import {Group} from '@wizardoc/http-utils';

@Injectable()
@Group('/organization')
export class OrganizationAPI {
  allName = '/name/all';

  all = '/joins/all';

  new = '/new';

  join = '/join';

  edit = (id: string): string => `/edit/${id}`;

  remove = (name: string): string => `/remove/${name}`;
}
