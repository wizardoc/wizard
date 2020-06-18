import {Injectable} from '@wizardoc/injector';
import {observable, computed} from 'mobx';
import {ResValueArea, noop} from '@wizardoc/http-request';
import {traverse} from '@wizardoc/shared';

import {SyncPair, genSync} from 'src/app/utils';

import {HTTP} from '../http';
import {User} from '../user';

import {OrganizationAPI} from './@organization-service.api';
import {OrganizationCardData} from './organization-service.dto';

export interface EditPayload {
  [key: string]: any;
}

@Injectable()
export class OrganizationService {
  @observable
  private _organizations: OrganizationCardData[] = [];

  private syncPair: SyncPair;

  constructor(
    private user: User,
    private http: HTTP,
    private apis: OrganizationAPI,
  ) {
    this.syncPair = genSync();
    this.getAllJoinOrganization();
  }

  isInit(): Promise<void> {
    return this.syncPair.lock;
  }

  @computed
  get organizations(): OrganizationCardData[] {
    return this._organizations.map((organization: OrganizationCardData) => ({
      ...organization,
      isOwner: organization.ownerInfo.username === this.user.userInfo!.username,
    }));
  }

  findOrganizationByID(id: string): OrganizationCardData | undefined {
    return this._organizations.find(({id: originID}) => originID === id);
  }

  async edit(id: string, payload: EditPayload): Promise<ResValueArea> {
    const index = this._organizations.findIndex(
      ({id: originId}) => originId === id,
    );
    const payloadKeys = Object.keys(payload);

    if (!~index) {
      throw new Error(`Cannot find the organization which id is ${id}`);
    }

    // check diff
    for (const key of Object.keys(payload)) {
      if (this._organizations[index][key] === payload[key]) {
        return noop;
      }
    }

    const organizationDup = {...this._organizations[index], ...payload};
    const result = await this.http.put(this.apis.edit(id), organizationDup);

    return result.success(() => {
      traverse(payloadKeys, key => {
        this._organizations[index][key] = payload[key];
      });
    });
  }

  getAllNames(): string[] {
    return this._organizations.map(({organizeName}) => organizeName);
  }

  async getAllJoinOrganization(): Promise<OrganizationCardData[]> {
    const result = await this.http.get(this.apis.all);

    const {data} = result
      .expect(() => '获取组织信息失败')
      .pipe(data => data?.organizations ?? []);

    // init organizations
    this._organizations = data;
    this.syncPair.unlock();

    return data;
  }

  async createOrganization(
    name: string,
    description: string,
  ): Promise<ResValueArea> {
    const result = await this.http.post(this.apis.new, {
      organizeName: name,
      username: this.user.userInfo?.username,
      organizeDescription: description,
    });

    await this.getAllJoinOrganization();

    return result;
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
  ): Promise<ResValueArea> | undefined {
    const {userInfo} = this.user;

    if (!userInfo) {
      console.error('Cannot get info of user');

      return undefined;
    }

    return this.createOrganization(name, description);
  }

  hasExistOrganization(organizationName: string): boolean {
    return this.getAllNames().includes(organizationName);
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

  async invite(organizeName: string, username: string): Promise<ResValueArea> {
    const result = await this.http.put(this.apis.invite, {
      organizeName,
      username,
    });

    return result.expect(() => '发送邀请失败，请检查网络后重试');
  }

  async acceptInvite(
    organizeName: string,
    inviteToken: string,
  ): Promise<ResValueArea> {
    const result = await this.http.post(this.apis.accept(inviteToken), {
      organizeName,
    });

    return result
      .expect(() => '接受邀请失败，请稍后重试')
      .success(data => {
        this._organizations.unshift(result.data);

        return data;
      });
  }
}
