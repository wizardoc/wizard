import {Typography} from '@material-ui/core';
import {TypographyProps} from '@material-ui/core/Typography';
import React, {ComponentType, FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';

import {StyledFab} from './fab';

interface PageHeaderWrapperProps {
  bgColor?: string;
}

export interface PageHeaderProps extends PageHeaderWrapperProps {
  title: string;
  img?: string;
  fabIcon?: ReactNode;
  onFabClick?(): void;
}

const Wrapper = styled.div<PageHeaderWrapperProps>`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  background: ${({theme, bgColor}) => bgColor || theme.primaryColor};
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`;

const Title = styled(Typography)`
  font-weight: 100 !important;
  font-size: 25px !important;
` as ComponentType<TypographyProps>;

const HelpFab = styled(StyledFab)`
  position: absolute !important;
  right: 120px;
  bottom: -28px;
  background: ${props => props.theme.thirdColor} !important;
  color: white !important;
`;

const RelatedImg = styled.img`
  width: 120px;
  opacity: 0.8;
`;

export const PageContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12.5px;
  box-sizing: border-box;
`;

export const PageHeader: FunctionComponent<PageHeaderProps> = props => {
  const {onFabClick = (): void => {}, title, fabIcon, img} = props;

  return (
    <Header>
      <Wrapper>
        <Title variant="h5">{title}</Title>
        {img && <RelatedImg src={img}></RelatedImg>}
      </Wrapper>
      {fabIcon && (
        <HelpFab onClick={onFabClick} aria-label="edit">
          {fabIcon}
        </HelpFab>
      )}
    </Header>
  );
};
