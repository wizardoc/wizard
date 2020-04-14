import {Injectable, Inject} from 'react-ts-di';
import {observable} from 'mobx';

import {TODO_API} from '../constant';

import {HTTP} from './http';

export interface TodoItemData {
  name: string;
  description: string;
  route: string;
}

@Injectable()
export class TodoService {
  @Inject
  private httpService!: HTTP;

  @observable
  private _todoItems: TodoItemData[] = [];

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    const result = await this.httpService.get<TodoItemData[]>(TODO_API.all);

    result
      .expect(() => '获取待办事项失败')
      .success(data => (this._todoItems = data ?? []));
  }

  addItem(item: TodoItemData): void {
    this._todoItems.push(item);
  }

  get isEmpty(): boolean {
    return !this._todoItems.length;
  }

  get todoItems(): TodoItemData[] {
    return this._todoItems;
  }
}
