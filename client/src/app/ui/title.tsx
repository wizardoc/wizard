import {IconButton} from '@material-ui/core';
import {SvgIconProps} from '@material-ui/core/SvgIcon';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import React, {ComponentType, FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';

interface TitleProps extends BlockProps {}

interface ReverseProps {
  isReverse?: boolean;
}

interface HasBackProps {
  hasBack?: boolean;
}

interface BlockProps extends ReverseProps, HasBackProps {
  blockColor?: string;
  onBackClick?(): void;
}

interface TextProps extends ReverseProps {}

interface BackButtonProps extends HasBackProps, ReverseProps {}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  justify-content: space-between;
`;

const Text = styled.p<TextProps>`
  font-size: 50px;
  font-weight: 100;
  margin: 0;
  ${props => (props.isReverse ? 'margin-right' : 'margin-left')}: 30px;
`;

const Block = styled.div<BlockProps>`
  height: 50px;
  width: 5px;
  background: ${props => props.theme[props.blockColor || 'primaryColor']};
`;

const BackButton = styled(IconButton)<BackButtonProps>`
  font-size: 50px !important;
  color: #1976d2;
  cursor: pointer;
  visibility: ${props => (props.hasBack ? 'visible' : 'hidden')};

  ${props => (props.isReverse ? 'margin-left' : 'margin-right')}: 20px;
` as ComponentType<SvgIconProps & BackButtonProps>;

const KeyboardArrowLeftButton = styled(KeyboardArrowLeftIcon)`
  font-size: 50px !important;
  cursor: pointer;
` as ComponentType<SvgIconProps>;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title: FunctionComponent<TitleProps> = props => {
  const {
    blockColor,
    isReverse = false,
    children,
    onBackClick = (): void => {},
    hasBack = false,
  } = props;
  const reverse = (arr: ReactNode[]): ReactNode[] =>
    isReverse ? arr.reverse() : arr;
  const rawNodes = [
    <Block blockColor={blockColor}></Block>,
    <Text isReverse={isReverse}>{children}</Text>,
  ];
  const sortedNodes = [
    <TextWrapper>{...reverse(rawNodes)}</TextWrapper>,
    <BackButton
      onClick={(): void => onBackClick()}
      isReverse={isReverse}
      hasBack={hasBack}
    >
      <KeyboardArrowLeftButton></KeyboardArrowLeftButton>
    </BackButton>,
  ];

  return <Wrapper>{...reverse(sortedNodes)}</Wrapper>;
};
