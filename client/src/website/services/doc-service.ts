import {Inject, Injectable} from '@wizardoc/injector';

import {ContributorInfo} from '../components';

import {HTTP} from './http';

@Injectable()
export class DocService {
  @Inject
  http!: HTTP;

  private readonly usernames: string[] = ['HaoDaWang', 'pp3229292', 'mpclyl', 'XyyF'];

  getAboutWizard(): string {
    // return await this.http.get(DOC_API.WIZARD);

    return '';
  }

  getContributorAvatars(): ContributorInfo[] {
    return [];
  }
}
