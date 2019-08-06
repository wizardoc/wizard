import {Typography} from '@material-ui/core';
import {TypographyProps} from '@material-ui/core/Typography';
import React, {ComponentType, FunctionComponent} from 'react';
import styled from 'styled-components';

interface PageHeaderWrapperProps {
  bgColor?: string;
}

export interface PageHeaderProps extends PageHeaderWrapperProps {
  title: string;
}

const Wrapper = styled.div<PageHeaderWrapperProps>`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: ${({theme, bgColor}) => bgColor || theme.primaryColor};
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
`;

const Title = styled(Typography)`
  font-weight: 300 !important;
  font-size: 20px !important;
` as ComponentType<TypographyProps>;

export const PageHeader: FunctionComponent<PageHeaderProps> = props => (
  <Header>
    <Wrapper>
      <Title variant="h5">{props.title}</Title>
    </Wrapper>
  </Header>
);
