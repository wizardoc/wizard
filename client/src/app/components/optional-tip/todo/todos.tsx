import WorkIcon from '@material-ui/icons/Work';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from 'react-ts-di';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {TodoService} from 'src/app/services/todo-service';

import {DrawerHeader} from '../../../ui';

import {TodoItem} from './todo-item';

const Wrapper = styled.div`
  width: 400px;
`;

/** The drawer for view todos */
@withRouter
@observer
export class Todos extends Component<Partial<RouteComponentProps>> {
  @Inject
  todoService!: TodoService;

  render(): ReactNode {
    // console.info(this.todoService.todoItems[0].name);
    const items = this.todoService.todoItems.map(item => (
      <TodoItem {...item} onClick={() => {}}></TodoItem>
    ));

    console.info(items);

    return (
      <Wrapper>
        <DrawerHeader title="待办事项" icon={<WorkIcon />}></DrawerHeader>
        {items}
      </Wrapper>
    );
  }
}
