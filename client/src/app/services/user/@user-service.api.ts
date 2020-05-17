import {Group} from '@wizardoc/http-utils';
import {Injectable} from 'react-ts-di';

@Injectable()
@Group('/user')
export class UserServiceAPI {
  register = '/register';
  login = '/login';
  info = '/info';
  validBaseInfo = '/valid/info/base';
  updateAvatar = '/avatar';
  searchName = '/name/search';
}
