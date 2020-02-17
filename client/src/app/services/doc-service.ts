import {Inject, Injectable} from 'react-ts-di';

import {ContributorInfo} from '../components';
import {DOC_API} from '../constant';

import {HTTP, Expectable} from './http';

@Injectable()
export class DocService {
  @Inject
  private http!: HTTP;

  private readonly usernames: string[] = [
    'HaoDaWang',
    'pp3229292',
    'mpclyl',
    'XyyF',
  ];

  getAboutWizard(): Expectable<string> {
    return this.http.get(DOC_API.WIZARD);
  }

  getContributorAvatars(): ContributorInfo[] {
    return this.usernames.map(username => ({
      username,
      addr: `https://avatars.githubusercontent.com/${username}`,
    }));
  }
}
