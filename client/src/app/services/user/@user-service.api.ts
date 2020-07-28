import {Group} from '@wizardoc/http-utils';
import {Injectable} from '@wizardoc/injector';

@Injectable()
@Group('/user')
export class UserServiceAPI {
  register = '/register';

  login = '/login';

  info = '/info';

  updateInfo = '/info';

  validBaseInfo = '/valid/info/base';

  updateAvatar = '/avatar';

  searchName = '/name/search';

  followOrganization = '/focus/organization';

  followUser = '/focus/user';

  sendEmailCode = '/email/send/code';

  verifyEmail = '/email/valid';

  updateEmail = '/email/update';

  updatePassword = '/password';
}
