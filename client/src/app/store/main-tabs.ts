import {action, observable} from 'mobx';

export class MainTabs {
  @observable
  tabTag: number = 0;

  @action
  changeTab(tag: number): void {
    this.tabTag = tag;
  }
}
