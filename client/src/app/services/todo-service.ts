import {Injectable, Inject} from 'react-ts-di';
import {observable} from 'mobx';

import {HTTP} from '../api';
import {TODO_API} from '../constant';

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
    this._todoItems = await this.httpService.get<TodoItemData[]>(TODO_API.all);
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
