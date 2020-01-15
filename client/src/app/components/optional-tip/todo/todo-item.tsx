import {ListItem, Card} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Omit} from 'src/app/types/type-utils';
import {TodoItemData} from 'src/app/services/todo-service';

export interface TodoItemProps extends Omit<TodoItemData, 'route'> {
  onClick(): void;
}

const ItemInfoWrapper = styled.div``;

const ItemTitle = styled.div``;

const ItemDescription = styled.div``;

export class TodoItem extends Component<TodoItemProps> {
  render(): ReactNode {
    const {name, description} = this.props;

    return (
      <Card>
        <ListItem>
          <ItemInfoWrapper>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
          </ItemInfoWrapper>
        </ListItem>
      </Card>
    );
  }
}
