import {action, observable} from 'mobx';

export class UIControl {
  @observable
  isMainPage: boolean = true;

  @action
  updatePage(pathname: string): void {
    if (['/home', '/'].includes(pathname)) {
      this.isMainPage = true;
    } else {
      this.isMainPage = false;
    }
  }
}
