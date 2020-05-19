import React, {Component, ReactNode} from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {User} from 'src/app/services';

export interface IconFunc {
  tooltip: string;
  body: ReactNode;
  isLogin?: boolean;
  handler(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export interface IconFuncsProps {
  iconFuncs: IconFunc[];
}

@observer
export class IconFuncs extends Component<IconFuncsProps> {
  @Inject
  userService!: User;

  render(): ReactNode {
    const {iconFuncs} = this.props;

    const renderIconFuncs = iconFuncs.map(
      ({tooltip, body, handler, isLogin}) =>
        !isLogin ||
        (this.userService.isLogin && (
          <Tooltip title={tooltip}>
            <IconButton color="inherit" onClick={handler}>
              {body}
            </IconButton>
          </Tooltip>
        )),
    );

    return <>{renderIconFuncs}</>;
  }
}
