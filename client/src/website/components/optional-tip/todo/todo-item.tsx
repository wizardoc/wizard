import {ListItem, Card, Fab} from '@material-ui/core';
import React, {Component, ReactNode, ComponentType} from 'react';
import styled from 'styled-components';
import {CardProps} from '@material-ui/core/Card';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {FabProps} from '@material-ui/core/Fab';
import {ListItemProps} from '@material-ui/core/ListItem';

import {TodoItemData} from 'website/services/todo-service';

export interface TodoItemProps {
  item: TodoItemData;
}

const Go = styled(Fab)`
  width: 40px !important;
  height: 40px !important;
` as ComponentType<FabProps>;

const Wrapper = styled(Card)`
  margin: 25px 16px;
` as ComponentType<CardProps>;

const ListItemWrapper = styled(ListItem)`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
` as ComponentType<ListItemProps>;

const ItemInfoWrapper = styled.div``;

const ItemTitle = styled.div`
  font-size: 16px;
`;

const ItemDescription = styled.div`
  font-size: 12px;
  color: ${props => props.theme.descriptionColor};
`;

export class TodoItem extends Component<TodoItemProps> {
  render(): ReactNode {
    const {item} = this.props;

    return (
      <Wrapper>
        <ListItemWrapper>
          <ItemInfoWrapper>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>{item.description}</ItemDescription>
          </ItemInfoWrapper>
          <Go color="primary">
            <KeyboardArrowRightIcon />
          </Go>
        </ListItemWrapper>
      </Wrapper>
    );
  }
}
