import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../api';
import {DOC_API} from '../constant';

@Injectable()
export class DocService {
  @Inject
  private http!: HTTP;

  getAboutWizard(): string {
    return this.http.get(DOC_API.WIZARD);
  }
}
