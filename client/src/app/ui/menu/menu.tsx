import React, {
  Component,
  ReactNode,
  cloneElement,
  ReactElement,
  MouseEvent,
  createRef,
} from 'react';
import {findDOMNode} from 'react-dom';
import {
  Menu as MaterialMenu,
  MenuItem as MaterialMenuItem,
  MenuItemProps as MaterialMenuItemProps,
  MenuProps as MaterialMenuProps,
  ClickAwayListener,
} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import styled from 'styled-components';

import {PermissionValues} from 'src/app/services/permission';

export interface MenuItem {
  text: string;
  isHide?: boolean;
  permission?: PermissionValues;
  handler(): void;
}

export interface MenuProps {
  bind: ReactNode;
  permissions?: PermissionValues[];
  menuItems?: MenuItem[];
}

const StyledMaterialMenuItem = styled(MaterialMenuItem)``;

@observer
export class Menu extends Component<
  MenuProps & Omit<MaterialMenuProps, 'open'> & MaterialMenuItemProps
> {
  private bindRef = createRef();
  private bindDOM: any;

  @observable
  isMenuOpen = false;

  handleBindClick(_: MouseEvent): void {
    this.toggleMenuOpen();
  }

  toggleMenuOpen(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  render(): ReactNode {
    const {bind, menuItems = [], permissions} = this.props;
    const bindEle = bind as ReactElement;
    const renderBind = cloneElement(bindEle, {
      ...bindEle.props,
      ref: this.bindRef,
      onClick: (e: MouseEvent) => this.handleBindClick(e),
    });
    const renderMenuItems = menuItems.map(
      ({text, isHide, permission, handler}) =>
        isHide ||
        !(permission !== undefined && permissions?.includes(permission)) ? (
          <></>
        ) : (
          <StyledMaterialMenuItem key={text} onClick={handler}>
            {text}
          </StyledMaterialMenuItem>
        ),
    );

    console.info(permissions);

    return (
      <>
        {renderBind}
        <MaterialMenu
          open={this.isMenuOpen}
          anchorEl={this.bindDOM}
          {...this.props}
        >
          <ClickAwayListener onClickAway={() => this.toggleMenuOpen()}>
            <div onClick={() => this.toggleMenuOpen()}>{renderMenuItems}</div>
          </ClickAwayListener>
        </MaterialMenu>
      </>
    );
  }

  componentDidMount(): void {
    const {current} = this.bindRef;

    if (!current) {
      return;
    }

    this.bindDOM = findDOMNode(current as any);
  }
}
