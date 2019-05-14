import {action, observable} from 'mobx';

export class RecentDrawer {
  @observable
  isViewRencentDrawer = false;

  @action
  viewRecentDrawerToggle = (): void => {
    this.isViewRencentDrawer = !this.isViewRencentDrawer;
  };
}
