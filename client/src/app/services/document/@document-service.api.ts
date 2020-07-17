import {Group} from '@wizardoc/http-utils';
import {Injectable} from '@wizardoc/injector';

@Injectable()
@Group('/doc')
export class DocumentAPI {
  all = '/';

  new = '/';

  newComment = '/comment';

  updateComment = '/comment';

  comments = (documentID: string): string => `/comments/${documentID}`;

  detail = (id: string): string => `/detail/${id}`;
}
