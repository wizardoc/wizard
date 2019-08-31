import {SvgIconProps} from '@material-ui/core/SvgIcon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {isArray} from '../../utils';

interface TreeViewItemProps {
  text: string;
  index: string;
  isClick: boolean;
  onItemClick?(text: string, index: string): void;
}

interface TitleProps {
  isClick: boolean;
}

const Wrapper = styled.div`
  margin-left: 20px;
`;

const Title = styled.div<TitleProps>`
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.shallowBlue};
  }

  ${props =>
    props.isClick &&
    `background: ${props.theme.primaryColor} !important;color: white;`}
`;

interface SubContentProps extends AnimationExpandMoreIconProps {
  subCount: number;
}

interface AnimationExpandMoreIconProps {
  isSpread: boolean;
}

const SubContent = styled.div<SubContentProps>`
  height: fit-content;
  max-height: ${props => (props.isSpread ? '400px' : '0')};
  overflow: hidden;
  transition: 0.3s all;
  transform: translateX(${props => (props.isSpread ? '0' : '50px')});
  opacity: ${props => (props.isSpread ? 1 : 0)};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const AnimationExpandMoreIcon = styled(ExpandMoreIcon)<
  AnimationExpandMoreIconProps
>`
  cursor: pointer;
  transition: 0.3s all;
  transform: rotate(${props => (props.isSpread ? '180deg ' : '0deg')});
` as ComponentType<SvgIconProps & AnimationExpandMoreIconProps>;

@observer
export class TreeViewItem extends Component<TreeViewItemProps> {
  /** 默认开启 */
  @observable
  isSpread = true;

  render(): ReactNode {
    const {
      index,
      text,
      children,
      onItemClick = (): void => {},
      isClick,
    } = this.props;
    const subCount = children && isArray(children) ? children.length : 0;

    return (
      <Wrapper>
        <Row>
          {subCount === 0 ? (
            undefined
          ) : (
            <AnimationExpandMoreIcon
              isSpread={this.isSpread}
              onClick={() => (this.isSpread = !this.isSpread)}
            />
          )}
          <Title
            onClick={() => {
              onItemClick(text, index);
              this.handleItemClick();
            }}
            isClick={isClick}
          >
            {text}
          </Title>
        </Row>
        <SubContent subCount={subCount} isSpread={this.isSpread}>
          {children}
        </SubContent>
      </Wrapper>
    );
  }

  handleItemClick(): void {
    location.hash = this.props.text;
  }
}
