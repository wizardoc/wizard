import {Injectable, Inject} from '@wizardoc/injector';
import {Categories, Category} from '@wizardoc/shared';
import {observable, computed} from 'mobx';
import {ResValueArea} from '@wizardoc/http-request';

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

  async getAllCategories(organizationID: string): Promise<Category[]> {
    const categories = this.categories[organizationID];

    if (categories) {
      return categories;
    }

    const result = await this.http.get(this.api.all, {organizationID});

    this._categories[organizationID] = result.expect(
      () => '获取分类失败，请检查网络设置',
    ).data;

    return this._categories[organizationID];
  }

  @computed
  get categories(): Categories {
    return this._categories;
  }

  isEmpty(organizationID: string): boolean {
    return !this._categories[organizationID];
  }

  async createCategory(category: Category): Promise<ResValueArea> {
    if (!this.categories) {
      throw new Error('Invalid operate');
    }

    const result = await this.http.post(this.api.create, category);

    return result
      .expect(() => '创建分组失败，请检查网络后重试')
      .success((data: Category) => {
        (
          this.categories[data.organizationID] ??
          (this.categories[data.organizationID] = [])
        ).push(data);

        return data;
      });
  }
}
