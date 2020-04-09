import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../http';
import {User} from '../user';

import {OrganizationAPI} from './@organization-service.api';
import {
  OrganizationNames,
  OrganizationCardData,
  AllOrganization,
} from './organization-service.dto';

@Injectable()
export class OrganizationService {
  @Inject
  private user!: User;

  @Inject
  private http!: HTTP;

  @Inject
  private apis!: OrganizationAPI;

  async getAllNames(): Promise<string[]> {
    const {data} = await this.http
      .get<OrganizationNames>(this.apis.allName)
      .expect(() => '网络错误');

    if (!data) {
      return [];
    }

    return data.organizeNames;
  }

  async getAllJoinOrganization(): Promise<OrganizationCardData[]> {
    const {data} = await this.http
      .get<AllOrganization>(this.apis.all)
      .expect(() => '获取组织信息失败');

    if (!data) {
      return [];
    }

    return data.organizations;
  }

  async createOrganization(name: string, description: string): Promise<void> {
    await this.http
      .post(this.apis.new, {
        organizeName: name,
        username: this.user.userInfo?.username,
        organizeDescription: description,
      })
      .expect(() => '创建组织失败');
  }

  removeOrganization(name: string): Promise<void> {
    return this.http
      .delete(this.apis.remove(name))
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

    return this.createOrganization(name, description);
  }

  async hasExistOrganization(organizationName: string): Promise<boolean> {
    const names = await this.getAllNames();

    return names.includes(organizationName);
  }

  joinOrganization(organizeName: string, username: string): Promise<void> {
    return this.http
      .post(this.apis.join, {
        organizeName,
        username,
      })
      .expect(() => '加入组织失败');
  }
}
