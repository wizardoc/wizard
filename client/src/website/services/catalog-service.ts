import {Injectable} from '@wizardoc/injector';
import {observable} from 'mobx';

import {HeadingObject} from './markdown-service';

@Injectable()
export class CatalogService {
  @observable
  currentAnchor: HeadingObject | undefined;
}
