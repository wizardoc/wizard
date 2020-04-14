import {Inject, Injectable} from 'react-ts-di';
import {observable} from 'mobx';

import {HTTP, ResValueArea} from '../http';
import {User} from '../user';

import {OrganizationAPI} from './@organization-service.api';
import {OrganizationCardData} from './organization-service.dto';

@Injectable()
export class OrganizationService {
  @Inject
  private user!: User;

  @Inject
  private http!: HTTP;

  @Inject
  private apis!: OrganizationAPI;

  @observable
  private _organizations: OrganizationCardData[] = [];

  get organizations(): OrganizationCardData[] {
    return this._organizations;
  }

  async getAllNames(): Promise<string[]> {
    const result = await this.http.get(this.apis.allName);

    return result
      .expect(() => '获取组织名称失败')
      .success(data => data?.organizeNames ?? []).data;
  }

  async getAllJoinOrganization(): Promise<OrganizationCardData[]> {
    const result = await this.http.get(this.apis.all);

    const {data} = result
      .expect(() => '获取组织信息失败')
      .success(data => data?.organizations ?? []);

    // init organizations
    this._organizations = data;

    return data;
  }

  async createOrganization(name: string, description: string): Promise<void> {
    (
      await this.http.post(this.apis.new, {
        organizeName: name,
        username: this.user.userInfo?.username,
        organizeDescription: description,
      })
    ).expect(() => '创建组织失败');

    await this.getAllJoinOrganization();
  }

  async removeOrganization(name: string): Promise<ResValueArea> {
    const result = await this.http.delete(this.apis.remove(name));

    return result
      .expect(() => '删除组织失败')
      .success(() => this.getAllJoinOrganization());
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

  async joinOrganization(
    organizeName: string,
    username: string,
  ): Promise<void> {
    const result = await this.http.post(this.apis.join, {
      organizeName,
      username,
    });

    result.expect(() => '加入组织失败');
  }
}
