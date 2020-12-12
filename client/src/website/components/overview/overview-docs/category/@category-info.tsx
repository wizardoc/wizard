import React, {Component, ReactNode} from 'react';
import {Card, Typography} from '@material-ui/core';
import {Category} from '@wizardoc/shared';
import styled from 'styled-components';

import {TimeUtil} from 'website/services';

export interface CategoryInfoProps {
  info: Category;
}

const Wrapper = styled(Card)`
  padding: 10px;
`;

const StyledText = styled(Typography)`
  font-size: 13px !important;
`;

const InfoItem = styled.div`
  color: ${props => props.theme.grayTextColor} !important;
`;

export class CategoryInfo extends Component<CategoryInfoProps> {
  render(): ReactNode {
    const {
      info: {createUser, createTime, lastModifyTime},
    } = this.props;
    const formatTime = (timeStamp: number): string =>
      new TimeUtil(timeStamp).format('YYYY-MM-DD hh:mm');
    const infos = [
      `创建者：${createUser}`,
      `创建时间：${formatTime(createTime)}`,
      `最后修改时间：${formatTime(lastModifyTime)}`,
    ];
    const renderInfos = infos.map(text => (
      <InfoItem key={text}>
        <StyledText>{text}</StyledText>
      </InfoItem>
    ));

    return <Wrapper>{renderInfos}</Wrapper>;
  }
}
