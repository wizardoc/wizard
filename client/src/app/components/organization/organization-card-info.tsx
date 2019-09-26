import {CardContent, CardMedia, Typography} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {OrganizationCardData} from '../../services';
import {Line} from '../../ui';
import {colorGenerator} from '../../utils';

interface CoverProps {
  bgColor: string;
}

interface OrganizationCardInfoProps {
  organizationCardData: OrganizationCardData;
}

const Cover = styled.div<CoverProps>`
  width: 100%;
  height: 194px;
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  color: white;
  font-weight: 200;
  text-shadow: 1px 1px 2px darkGray;
`;

export class OrganizationCardInfo extends Component<OrganizationCardInfoProps> {
  render(): ReactNode {
    const {
      organizationCardData: {organizeName, description},
    } = this.props;

    return (
      <>
        <CardMedia title="Paella dish">
          <Cover bgColor={colorGenerator()}>{organizeName}</Cover>
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Line />
          <Typography variant="body2" color="textSecondary" component="p">
            创建时间: {description}
          </Typography>
        </CardContent>
      </>
    );
  }
}
