import {WithStyles, createStyles, withStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import QQIcon from '../assets/static/share/qq-transparent.png';
import WechatIcon from '../assets/static/share/wechat-transparent.png';
import WeiboIcon from '../assets/static/share/weibo-transparent.png';

const styles = (): StyleRules =>
  createStyles({
    wrapper: {
      position: 'fixed',
      right: '110px',
      bottom: '90px',
    },
    iconWrapper: {
      position: 'absolute',
      width: '48px',
      height: '48px',
      backgroundColor: '#cd0000',
      borderRadius: '50%',
      transition: 'transform 0.5s',
      bottom: '16px',
      left: 0,
      right: 0,
      margin: 'auto',
    },
    img: {
      display: 'block',
      width: '30px',
      height: '30px',
      margin: '9px auto',
    },
    target: {
      display: 'flex',
      textAlign: 'center',
      position: 'relative',
      padding: '10px',
      userSelect: 'none',
      filter: 'url("#goo")',
      width: '140px',
      height: '120px',
      justifyContent: 'center',
    },
    shareBtn: {
      display: 'block',
      width: '56px',
      lineHeight: '56px',
      backgroundColor: '#f06292',
      color: '#fff',
      borderRadius: '50%',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 1,
      cursor: 'pointer',
    },
    weiboIcon: {
      transform: `scale(1) translate(60px, -40px)`,
    },
    wechatIcon: {
      transform: `scale(1) translate(0, -75px)`,
    },
    qqIcon: {
      transform: `scale(1) translate(-60px, -40px)`,
    },
  });

export interface SharePopProps extends WithStyles<typeof styles> {}

@observer
export class TSharePop extends Component<SharePopProps> {
  @observable
  private isOpenMenu = false;

  @action
  menuToggle(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

  render(): ReactNode {
    const {classes} = this.props;

    return (
      <div className={classes.wrapper}>
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
        <div className={classes.target}>
          <label className={classes.shareBtn} onClick={() => this.menuToggle()}>
            分享
          </label>
          <span
            className={`${classes.iconWrapper} ${
              this.isOpenMenu ? classes.weiboIcon : ''
            }`}
          >
            <img className={classes.img} src={WeiboIcon} />
          </span>
          <span
            className={`${classes.iconWrapper} ${
              this.isOpenMenu ? classes.wechatIcon : ''
            }`}
          >
            <img className={classes.img} src={WechatIcon} />
          </span>
          <span
            className={`${classes.iconWrapper} ${
              this.isOpenMenu ? classes.qqIcon : ''
            }`}
          >
            <img className={classes.img} src={QQIcon} />
          </span>
        </div>
      </div>
    );
  }
}

export const SharePop = withStyles(styles)(TSharePop);
