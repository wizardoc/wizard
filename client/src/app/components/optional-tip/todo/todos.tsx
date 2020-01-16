import WorkIcon from '@material-ui/icons/Work';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {Inject} from 'react-ts-di';
import {RouteComponentProps} from 'react-router-dom';

import {TodoService} from 'src/app/services/todo-service';

import {DrawerHeader} from '../../../ui';

import {TodoItem} from './todo-item';

const Wrapper = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Items = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${props => props.theme.shallowGrayBlue};

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

/** The drawer for view todos */
@observer
export class Todos extends Component<Partial<RouteComponentProps>> {
  @Inject
  todoService!: TodoService;

  render(): ReactNode {
    // console.info(this.todoService.todoItems[0].name);
    const items = this.todoService.todoItems.map(item => (
      <TodoItem item={item}></TodoItem>
    ));

    return (
      <Wrapper>
        <DrawerHeader
          description="不用及时处理的事件都在这里"
          title="待办事项"
          icon={<WorkIcon />}
        ></DrawerHeader>
        <Items>{items}</Items>
      </Wrapper>
    );
  }
}
