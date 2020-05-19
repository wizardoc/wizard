import {Group} from '@wizardoc/http-utils';
import {Injectable} from '@wizardoc/injector';

@Injectable()
@Group('/permission')
export class PermissionServiceAPI {
  organizationAll = (id: string): string => `/organization/${id}`;
}
