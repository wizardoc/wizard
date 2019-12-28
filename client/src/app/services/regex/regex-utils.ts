import {Injectable} from 'react-ts-di';

import {Regex} from './regex';

@Injectable()
export class RegexUtils extends Regex {
  validEmail(email: string): boolean {
    return this.test(RegexUtils.EmailRegex, email);
  }

  static readonly EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
