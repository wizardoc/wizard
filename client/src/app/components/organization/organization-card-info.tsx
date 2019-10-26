import {CardContent, CardMedia, Typography} from '@material-ui/core';
import {CardMediaProps} from '@material-ui/core/CardMedia';
import {TypographyProps} from '@material-ui/core/Typography';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import {Inject} from 'react-ts-di';
import styled from 'styled-components';

import {OrganizationCardData, Time} from '../../services';
import {ColorBlock} from '../../ui';
import {colorGenerator} from '../../utils';

interface OrganizationCardInfoProps {
  organizationCardData: OrganizationCardData;
}

interface OrganizationNameProps {
  isFull: boolean;
}

const Cover = styled.div`
  width: 100%;
  height: 194px;
  background-color: ${props => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  color: white;
  font-weight: 300;
  position: relative;
  cursor: pointer;
`;

const DescriptionAround = styled(Typography)`
  margin: 5px 0 20px 0 !important;
` as ComponentType<TypographyProps>;

const DateAround = styled.div``;

const OrganizationName = styled.div<OrganizationNameProps>`
  color: ${props => (props.isFull ? props.theme.white : props.theme.black)};
  transition: 0.5s all;
`;

const OrganizationCover = styled(CardMedia)`` as ComponentType<CardMediaProps>;

@observer
export class OrganizationCardInfo extends Component<OrganizationCardInfoProps> {
  @Inject
  time!: Time;

  @observable
  isFull = false;

  color: string;

  constructor(props: OrganizationCardInfoProps) {
    super(props);
    this.color = colorGenerator();
  }

  formatTime(stamp: number): string {
    return this.time.new(stamp).format('YYYY-MM-DD hh:mm');
  }

  toggleIsFull(): void {
    this.isFull = !this.isFull;
  }

  render(): ReactNode {
    const {
      organizationCardData: {organizeName, description, createTime, joinTime},
    } = this.props;

    return (
      <>
        <OrganizationCover
          title="Paella dish"
          onMouseEnter={() => this.toggleIsFull()}
          onMouseLeave={() => this.toggleIsFull()}
        >
          <Cover>
            <ColorBlock isFull={this.isFull} color={this.color}>
              <OrganizationName isFull={this.isFull}>
                {organizeName}
              </OrganizationName>
            </ColorBlock>
          </Cover>
        </OrganizationCover>
        <CardContent>
          <DescriptionAround
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description}
          </DescriptionAround>
          <DateAround>
            <Typography variant="body2" color="textSecondary" component="p">
              创建时间: {this.formatTime(createTime)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              加入时间: {this.formatTime(joinTime)}
            </Typography>
          </DateAround>
        </CardContent>
      </>
    );
  }
}
