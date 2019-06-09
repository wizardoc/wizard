import {Inject, Injectable} from 'react-ts-di';

import {Request} from '../api';

interface OrganizationNames {
  organizeNames: string[];
}

@Injectable()
export class Organization {
  @Inject
  private request!: Request;

  private organizationScope = 'organization';

  async getAllNames(): Promise<string[]> {
    const {organizeNames} = await this.request.get<OrganizationNames>(
      this.parseUrl('/name/all'),
    );

    return organizeNames;
  }

  private parseUrl(path: string): string {
    return `${this.organizationScope}/${path}`;
  }
}
