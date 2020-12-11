import {Injectable} from '@wizardoc/injector';
import {observable, action} from 'mobx';

@Injectable()
export class TabService {
  @observable
  isMainPage: boolean = true;

  /**
   * 根据切换的 tab 来判断是否需要更新样式
   */
  @action
  updatePage(pathname: string): void {
    this.isMainPage = ['/home', '/'].includes(pathname);
  }
}
