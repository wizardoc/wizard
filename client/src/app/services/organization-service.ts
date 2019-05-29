import {AxiosPromise} from 'axios';
import {Inject, Injectable} from 'react-ts-di';

import {Request} from '../api';

@Injectable()
export class Organization {
  @Inject
  private request!: Request;

  private organizationScope = 'organization';

  getAllNames(): AxiosPromise<string[]> {
    return this.request.get<string[]>(this.parseUrl('/name/all'));
  }

  private parseUrl(path: string): string {
    return `${this.organizationScope}/${path}`;
  }
}
