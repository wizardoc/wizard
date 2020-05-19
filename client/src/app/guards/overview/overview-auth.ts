import {Inject} from '@wizardoc/injector';

import {ActivatedGuard, User, Toast} from 'src/app/services';

export class OverviewAuthGuard implements ActivatedGuard {
  @Inject
  private user!: User;

  @Inject
  private toast!: Toast;

  async canActivated(): Promise<string | boolean> {
    await this.user.isInit();

    if (!this.user.isLogin) {
      this.toast.error('您还未登录哦～');

      return '/home';
    }

    return true;
  }
}
