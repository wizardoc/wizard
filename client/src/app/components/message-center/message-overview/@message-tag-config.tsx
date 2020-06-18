import React, {ReactNode} from 'react';

import {MessageTag} from 'src/app/services';
import {styledTheme} from 'src/app/theme';

import {InviteActionButtons} from './@invite-action-buttons';

export interface MessageTagProperty {
  text: string;
  color: string;
  attachComponent?(props: any): ReactNode;
}

export type MessageTagMap = {
  [key in MessageTag]: MessageTagProperty;
};

export const MessageTagMap: MessageTagMap = {
  [MessageTag.INVITE]: {
    text: '邀请',
    color: styledTheme.successGreen,
    attachComponent: props => <InviteActionButtons {...props} />,
  },
  [MessageTag.PERSONAL]: {
    text: '私信',
    color: styledTheme.shallowPink,
  },
  [MessageTag.SYSTEM]: {
    text: '系统',
    color: styledTheme.flatYellow,
  },
};
