import {action, observable} from 'mobx';

export class RecentDrawer {
  @observable
  isViewRecentDrawer = false;

  @action
  viewRecentDrawerToggle = (): void => {
    this.isViewRecentDrawer = !this.isViewRecentDrawer;
  };
}
