import {Injectable} from 'react-ts-di';

import {Group} from 'src/app/utils';

@Injectable()
@Group('/organization')
export class OrganizationAPI {
  allName = '/name/all';

  all = '/joins/all';

  new = '/new';

  join = '/join';

  remove(name: string): string {
    return `/remove/${name}`;
  }
}
