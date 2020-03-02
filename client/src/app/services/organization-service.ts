import {Inject, Injectable} from 'react-ts-di';

import {ORGANIZATION} from '../constant';

import {HTTP} from './http';
import {UserBaseInfo, User} from './user';

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
  @Inject
  private user!: User;

  @Inject
  private http!: HTTP;

  private organizationScope = 'organization';

  async getAllNames(): Promise<string[]> {
    const {data} = await this.http
      .get<OrganizationNames>(this.parseUrl('/name/all'))
      .expect(() => '网络错误');

    if (!data) {
      return [];
    }

    return data.organizeNames;
  }

  async getAllJoinOrganization(): Promise<OrganizationCardData[]> {
    const {data} = await this.http
      .get<OrganizationCardData[]>(this.parseUrl('/joins/all'))
      .expect(() => '获取组织信息失败');

    if (!data) {
      return [];
    }

    return data;
  }

  async createOrganization(
    name: string,
    description: string,
    username: string,
  ): Promise<void> {
    await this.http.post(this.parseUrl('/new'), {
      organizeName: name,
      username,
      organizeDescription: description,
    });
  }

  removeOrganization(name: string): Promise<void> {
    return this.http
      .delete(ORGANIZATION.REMOVE(name))
      .expect(() => '删除组织失败');
  }

  // without username
  newOrganization(
    name: string,
    description: string,
  ): Promise<void> | undefined {
    const {userInfo} = this.user;

    if (!userInfo) {
      console.error('Cannot get info of user');

      return undefined;
    }

    return this.createOrganization(name, description, userInfo.username);
  }

  async hasExistOrganization(organizationName: string): Promise<boolean> {
    const names = await this.getAllNames();

    return names.includes(organizationName);
  }

  joinOrganization(organizeName: string, username: string): Promise<void> {
    return this.http
      .post(ORGANIZATION.JOIN, {
        organizeName,
        username,
      })
      .expect(() => '加入组织失败');
  }

  private parseUrl(path: string): string {
    return `${this.organizationScope}${path}`;
  }
}
