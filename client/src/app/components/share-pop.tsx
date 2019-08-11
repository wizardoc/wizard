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
      right: '50px',
      bottom: '100px',
    },
    iconWrapper: {
      position: 'absolute',
      width: '48px',
      height: '48px',
      backgroundColor: '#cd0000',
      borderRadius: '50%',
      transition: 'transform 0.5s',
      top: '16px',
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
      height: '130px',
      maxWidth: '200px',
      textAlign: 'center',
      position: 'relative',
      padding: '10px',
      userSelect: 'none',
    },
    shareBtn: {
      display: 'block',
      width: '64px',
      lineHeight: '64px',
      backgroundColor: '#cd0000',
      color: '#fff',
      borderRadius: '50%',
      margin: 'auto',
      position: 'relative',
      zIndex: 1,
      cursor: 'pointer',
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
          <span className={classes.iconWrapper}>
            <img className={classes.img} src={WeiboIcon} />
          </span>
          <span className={classes.iconWrapper}>
            <img className={classes.img} src={WechatIcon} />
          </span>
          <span className={classes.iconWrapper}>
            <img className={classes.img} src={QQIcon} />
          </span>
        </div>
      </div>
    );
  }
}

export const SharePop = withStyles(styles)(TSharePop);
