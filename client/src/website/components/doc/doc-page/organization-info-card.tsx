import React, {Component, ReactNode, ComponentType} from 'react';
import {Card} from '@material-ui/core';
import styled from 'styled-components';
import {CardProps} from '@material-ui/core/Card';

const Wrapper = styled(Card)`
  width: 300px !important;
  height: 500px !important;
  flex-shrink: 0;
  position: sticky;
  top: 70px;
` as ComponentType<CardProps>;

export class OrganizationInfoCard extends Component {
  render(): ReactNode {
    return <Wrapper></Wrapper>;
  }
}
