import {Group} from '@wizardoc/http-utils';
import {Injectable} from 'react-ts-di';

@Injectable()
@Group('/permission')
export class PermissionServiceAPI {
  organizationAll = (id: string): string => `/organization/${id}`;
}
