import {RouteComponentProps} from 'react-router-dom';
import {Inject} from '@wizardoc/injector';

import {
  ActivatedGuard,
  PropsInjector,
  Route,
  OrganizationService,
} from 'src/app/services';

export class OrganizationEmptyGuard implements ActivatedGuard {
  @Inject
  organizationService!: OrganizationService;

  async canActivated(
    _route: Route,
    _props: RouteComponentProps,
    inject: PropsInjector,
  ): Promise<string | boolean> {
    await this.organizationService.isInit();

    if (this.organizationService.isNoOrganization) {
      return '/organization/empty';
    }

    inject({organizations: this.organizationService.organizations});

    return true;
  }
}
