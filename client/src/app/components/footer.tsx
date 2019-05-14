import {IconButton, SvgIcon} from '@material-ui/core';
import {IconButtonProps} from '@material-ui/core/IconButton';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {Circle} from '../assets';

interface ShadeProps {
  isShutdown?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background: ${props => props.theme.dark};
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Shade = styled.div<ShadeProps>`
  width: ${props => (props.isShutdown ? 0 : '110%')};
  height: 0;
  padding-bottom: ${props => (props.isShutdown ? 0 : '110%')};
  border-radius: 10000px;
  background: ${props => props.theme.primaryColor};
  transition: 0.3s all;
`;

const CircleIconButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
` as ComponentType<IconButtonProps>;

@observer
export class Footer extends Component {
  @observable
  isShutdown = false;

  @action
  shutdownToggle(): void {
    this.isShutdown = !this.isShutdown;
  }

  handleCircleClick(): void {
    this.shutdownToggle();
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <InnerWrapper>
          <Shade isShutdown={this.isShutdown}>
            <CircleIconButtonWrapper>
              <IconButton onClick={() => this.handleCircleClick()}>
                <SvgIcon>
                  <Circle />
                </SvgIcon>
              </IconButton>
            </CircleIconButtonWrapper>
          </Shade>
        </InnerWrapper>
      </Wrapper>
    );
  }
}
