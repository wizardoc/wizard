import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import QQIcon from '../assets/static/share/qq-transparent.png';
import WechatIcon from '../assets/static/share/wechat-transparent.png';
import WeiboIcon from '../assets/static/share/weibo-transparent.png';

const Wrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 100px;
`;

const Target = styled.div`
  height: 130px;
  max-width: 200px;
  text-align: center;
  position: relative;
  padding: 10px;
  user-select: none;
`;

const ShareBtn = styled.label`
  display: block;
  width: 64px;
  line-height: 64px;
  background-color: #cd0000;
  color: #fff;
  border-radius: 50%;
  margin: auto;
  position: relative;
  z-index: 1;
  cursor: pointer;
`;

const IconWrapper = styled.span`
  position: absolute;
  width: 48px;
  height: 48px;
  background-color: #cd0000;
  border-radius: 50%;
  transition: transform 0.5s;
  top: 16px;
  left: 0;
  right: 0;
  margin: auto;
`;

const Img = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  margin: 9px auto;
`;

@observer
export class SharePop extends Component {
  @observable
  private isOpenMenu = false;

  @action
  menuToggle(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <svg width="0" height="0">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <Target>
          <ShareBtn onClick={() => this.menuToggle()}>分享</ShareBtn>
          <IconWrapper className="icon-share-weibo">
            <Img src={WeiboIcon} />
          </IconWrapper>
          <IconWrapper className="icon-share-wechat">
            <Img src={WechatIcon} />
          </IconWrapper>
          <IconWrapper className="icon-share-qq">
            <Img src={QQIcon} />
          </IconWrapper>
        </Target>
      </Wrapper>
    );
  }
}
