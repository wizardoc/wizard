import {Injectable} from 'react-ts-di';

import {LocalStorage} from '../utils';

@Injectable()
export class JWT {
  private _JWTString: string | undefined;
  private readonly JWT_STORAGE_KEY = 'jwt';

  constructor() {
    const jwt = LocalStorage.getItem<string>(this.JWT_STORAGE_KEY);

    if (jwt) {
      this._JWTString = jwt;
    }
  }

  save(jwtString: string): void {
    LocalStorage.setItem(this.JWT_STORAGE_KEY, jwtString);
  }

  remove(): void {
    LocalStorage.removeItem(this.JWT_STORAGE_KEY);
  }

  get JWTString(): string | undefined {
    return this._JWTString;
  }
}
