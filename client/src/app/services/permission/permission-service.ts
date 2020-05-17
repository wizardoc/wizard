import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../http';

import {PermissionServiceAPI} from './@permission-service.api';
import {PermissionSet} from './permission-service.dto';

@Injectable()
export class PermissionService {
  @Inject
  private api!: PermissionServiceAPI;

  @Inject
  private http!: HTTP;

  async getOrganizationPermissions(): Promise<PermissionSet> {
    const result = await this.http.get(this.api.organizationAll('www'));

    return result
      .expect(() => '获取组织权限失败')
      .success((data: PermissionSet | null) => data ?? []).data;
  }
}
