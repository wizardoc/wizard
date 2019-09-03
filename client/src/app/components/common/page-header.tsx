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
  fabIcon?: ReactNode;
  onFabClick?(): void;
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

const HelpFab = styled(StyledFab)`
  position: absolute !important;
  right: 120px;
  bottom: -28px;
  background: ${props => props.theme.secondaryColor} !important;
  color: white !important;
`;

export const PageHeader: FunctionComponent<PageHeaderProps> = props => {
  const {onFabClick = (): void => {}, title, fabIcon} = props;

  return (
    <Header>
      <Wrapper>
        <Title variant="h5">{title}</Title>
      </Wrapper>
      {fabIcon ? (
        <HelpFab onClick={onFabClick} aria-label="edit">
          {fabIcon}
        </HelpFab>
      ) : (
        <></>
      )}
    </Header>
  );
};
