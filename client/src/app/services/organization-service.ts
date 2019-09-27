import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../api';
import {ORGANIZATION} from '../constant';
import {TipStore} from '../store';
import {InjectStore} from '../utils';

import {UserBaseInfo} from './user-service';

interface OrganizationNames {
  organizeNames: string[];
}

export interface OrganizationCardData extends UserBaseInfo {
  ownerInfo: UserBaseInfo;
  organizeName: string;
  description: string;
  hasValid: string;
  createTime: number;
  joinTime: number;
}

@Injectable()
export class OrganizationService {
  @InjectStore(TipStore)
  private tipStore!: TipStore;

  @Inject
  private http!: HTTP;

  private organizationScope = 'organization';

  async getAllNames(): Promise<string[]> {
    const {organizeNames} = await this.http.get<OrganizationNames>(
      this.parseUrl('/name/all'),
    );

    return organizeNames;
  }

  async getAllJoinOrganization(): Promise<OrganizationCardData[]> {
    const {organizations} = await this.http.get(this.parseUrl('/joins/all'));

    return organizations;
  }

  async createOrganization(
    name: string,
    description: string,
    username: string,
  ): Promise<void> {
    try {
      await this.http.post(this.parseUrl('/new'), {
        organizeName: name,
        username,
        organizeDescription: description,
      });
    } catch (e) {
      this.tipStore.addTipToQueue('拉取信息失败', 'error');
    }
  }

  async hasExistOrganization(organizationName: string): Promise<boolean> {
    const names = await this.getAllNames();

    return names.includes(organizationName);
  }

  joinOrganization(organizeName: string, username: string): void {
    return this.http.post(ORGANIZATION.JOIN, {
      organizeName,
      username,
    });
  }

  private parseUrl(path: string): string {
    return `${this.organizationScope}${path}`;
  }
}
