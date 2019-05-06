import {Injectable} from 'react-ts-di';

@Injectable()
export class User {
  username!: string;
  role!: string;
  company!: string;

  isLogin: boolean = false;
}
