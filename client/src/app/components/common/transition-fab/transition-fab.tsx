import React, {Component, ReactNode} from 'react';
import {Fab, Zoom} from '@material-ui/core';
import styled from 'styled-components';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {createPortal} from 'react-dom';
import {Inject} from '@wizardoc/injector';

import {withTheme, ThemeComponentProps} from 'src/app/theme';
import {Time} from 'src/app/services';

interface TransitionFabProps extends ColorFabProps {
  // animation timeout
  timeout?: number;
  // 激活时的背景颜色
  activeColor?: string;
  // 激活时的 Fab 颜色
  activeFabColor?: string;
  // 激活时的图标
  activeIcon?: ReactNode;
  // 未激活时的图标
  icon: ReactNode;
  children: WithClose;
  // 激活回调
  onActive?(): void;
}

type Close = () => void;
type WithClose = (close: Close) => ReactNode;

interface Fullable {
  isFull?: boolean;
}

interface ColorFabProps extends Fullable {
  // 未激活时的颜色
  coverColor?: string;
  activeFabColor?: string;
}

interface GroundLayerProps extends Fullable {
  color?: string;
  timeout?: number;
}

export interface TransitionFabComponentProps {
  close(): void;
}

const ColorFab = styled(Fab)<ColorFabProps>`
  background: ${props =>
    props.isFull ? props.activeFabColor : props.coverColor} !important;
  color: white !important;
  z-index: 1103;
`;

const GroundLayer = styled.div<GroundLayerProps>`
  width: 500%;
  height: 500%;
  position: fixed;
  transition: all ${props => props.timeout}ms;
  z-index: 1101;
  background: radial-gradient(
    circle,
    ${props => props.color} 40%,
    rgba(0, 0, 0, 0) 0
  );
  transform: scale(0);

  ${props =>
    props.isFull &&
    `
      transform: scale(1);
    `};
`;

const GroundLayerWrapper = styled.div`
  width: 56px;
  height: 56px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SlotWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1102;
  display: flex;
  justify-content: center;
  align-items: center;
`;

@withTheme
@observer
export class TransitionFab extends Component<
  TransitionFabProps & Partial<ThemeComponentProps>
> {
  @observable
  isOpen = false;

  @Inject
  time!: Time;

  handleColorFabClick(): void {
    const {onActive = (): void => {}} = this.props;

    this.toggleOpen();
    onActive();
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  render(): ReactNode {
    const {
      theme,
      coverColor = theme!.primaryColor,
      activeColor = theme!.primaryColor,
      activeFabColor = theme!.primaryColor,
      timeout = Time.MilliSecond * 500,
      icon,
      activeIcon = icon,
    } = this.props;
    const renderFab = (
      <Wrapper {...this.props}>
        {this.isOpen && (
          <SlotWrapper>
            <Zoom in={this.isOpen} timeout={Time.MilliSecond * 500}>
              <div>{this.props.children(() => this.toggleOpen())}</div>
            </Zoom>
          </SlotWrapper>
        )}
        <GroundLayerWrapper>
          <GroundLayer
            color={activeColor}
            timeout={timeout}
            isFull={this.isOpen}
          />
        </GroundLayerWrapper>
        <ColorFab
          activeFabColor={activeFabColor}
          isFull={this.isOpen}
          onClick={(): void => this.handleColorFabClick()}
          coverColor={coverColor}
        >
          {this.isOpen ? activeIcon : icon}
        </ColorFab>
      </Wrapper>
    );

    return createPortal(renderFab, document.body);
  }
}
