import React, {Component, ReactNode} from 'react';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import {Button, ToggleItem} from 'src/app/ui';

interface LayoutToggleProps {
  onChange?(value: string): void;
}

export class LayoutToggle extends Component<LayoutToggleProps> {
  layouts: ToggleItem[] = [
    {
      icon: <ViewModuleIcon />,
      value: 'column',
    },
    {
      icon: <ViewColumnIcon />,
      value: 'row',
    },
  ];

  render(): ReactNode {
    const {onChange} = this.props;

    return (
      <Button.Toggle
        items={this.layouts}
        defaultValue="column"
        onChange={onChange}
      />
    );
  }
}
