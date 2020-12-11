import {ArrowCache as ArrowCacheFactory} from 'arrow-cache';
import {Injectable} from '@wizardoc/injector';

@Injectable()
export class ArrowCache extends ArrowCacheFactory {
  constructor() {
    super({isPermanentMemory: true});
  }
}
