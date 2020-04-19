import {RouteComponentProps} from 'react-router-dom';
import {Inject} from 'react-ts-di';

import {
  ActivatedGuard,
  Route,
  OrganizationService,
  PropsInjector,
} from 'src/app/services';

interface RouteParams {
  id: string;
}

export class OrganizationEditGuard implements ActivatedGuard {
  @Inject
  organizationService!: OrganizationService;

  async canActivated(
    _route: Route,
    props: RouteComponentProps<RouteParams>,
    inject: PropsInjector,
  ): Promise<string | boolean> {
    await this.organizationService.isInit();

    const {id} = props.match.params;
    const redirect = '/overview/organization';

    // valid id
    if (!id) {
      return redirect;
    }

    const organizationInfo = this.organizationService.organizations.find(
      ({id: originId}) => originId === id,
    );

    // valid info of organization
    if (!organizationInfo) {
      return redirect;
    }

    inject({organizationInfo});

    return true;
  }
}
