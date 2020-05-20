import {Injectable, Inject} from '@wizardoc/injector';
import {Categories} from '@wizardoc/shared';
import {observable, computed} from 'mobx';

import {HTTP} from '../http';

import {CategoryServiceAPI} from './@category-service.api';

@Injectable()
export class CategoryService {
  @observable
  private _categories: Categories = {};

  @Inject
  private api!: CategoryServiceAPI;

  @Inject
  private http!: HTTP;

  async getAllCategories(organizationID: string): Promise<Categories> {
    const result = await this.http.get(this.api.all, {organizationID});

    return result.expect(() => '获取分类失败，请检查网络设置').data;
  }

  @computed
  get categories(): Categories {
    return this._categories;
  }
}
