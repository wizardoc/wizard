import {Inject, Injectable} from 'react-ts-di';

import {Request} from '../api';

interface OrganizationNames {
  organizeNames: string[];
}

@Injectable()
export class OrganizationService {
  @Inject
  private request!: Request;

  private organizationScope = 'organization';

  async getAllNames(): Promise<string[]> {
    const {organizeNames} = await this.request.get<OrganizationNames>(
      this.parseUrl('/name/all'),
    );

    return organizeNames;
  }

  createOrganization(name: string, description: string): void {
    this.request.post<{}, string>(this.parseUrl('/new'), {
      name,
      description,
    });
  }

  async hasExistOrganization(organizationName: string): Promise<boolean> {
    const names = await this.getAllNames();

    return names.includes(organizationName);
  }

  private parseUrl(path: string): string {
    return `${this.organizationScope}${path}`;
  }
}
