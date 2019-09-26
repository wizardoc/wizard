import {ListItem} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components';

interface TodoDataItem {
  name: string;
  description: string;
  route: string;
}

interface TodoItemProps {
  item: TodoDataItem;
}

const ItemInfoWrapper = styled.div``;

const ItemTitle = styled.div``;

const ItemDescription = styled.div``;

class RouteTodoItem extends Component<TodoItemProps & RouteComponentProps> {
  handleItemClick(): void {
    const {item, history} = this.props;

    history.push(item.route);
  }

  render(): ReactNode {
    const {item} = this.props;

    return (
      <>
        <ListItem onClick={() => this.handleItemClick()}>
          <ItemInfoWrapper>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>{item.description}</ItemDescription>
          </ItemInfoWrapper>
        </ListItem>
      </>
    );
  }
}

export const TodoItem = withRouter(RouteTodoItem);
