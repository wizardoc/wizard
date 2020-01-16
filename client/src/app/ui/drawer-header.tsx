import {Divider, ListItem, ListItemText} from '@material-ui/core';
import React, {FunctionComponent, ReactElement} from 'react';
import styled from 'styled-components';

interface DrawerHeaderProps {
  title: string;
  icon: ReactElement;
  description?: string;
}

const DrawerHeaderIcon = styled.div`
  margin-right: 10px !important;
  color: ${props => props.theme.primaryColor} !important;
`;

const HeaderText = styled.div``;

const Description = styled.div`
  color: ${props => props.theme.descriptionColor};
  font-size: 12px;
`;

export const DrawerHeader: FunctionComponent<DrawerHeaderProps> = props => {
  const {icon, title, description} = props;

  return (
    <>
      <ListItem>
        <DrawerHeaderIcon>{icon}</DrawerHeaderIcon>
        <HeaderText>
          <ListItemText primary={title} />
          <Description>{description}</Description>
        </HeaderText>
      </ListItem>
      <Divider />
    </>
  );
};
