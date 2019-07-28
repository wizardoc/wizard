import {Divider, ListItem, ListItemText} from '@material-ui/core';
import React, {FunctionComponent, ReactElement} from 'react';
import styled from 'styled-components';

interface DrawerHeaderProps {
  title: string;
  icon: ReactElement;
}

const DrawerHeaderIcon = styled.div`
  margin-right: 10px !important;
  color: ${props => props.theme.primaryColor} !important;
`;

export const DrawerHeader: FunctionComponent<DrawerHeaderProps> = props => {
  const {icon, title} = props;

  return (
    <>
      <ListItem>
        <DrawerHeaderIcon>{icon}</DrawerHeaderIcon>
        <ListItemText primary={title} />
      </ListItem>
      <Divider />
    </>
  );
};
