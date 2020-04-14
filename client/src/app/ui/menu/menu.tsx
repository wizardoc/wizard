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

export interface MenuItem {
  text: string;
  handler(): void;
}

export interface MenuProps {
  bind: ReactNode;
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
    const {bind, menuItems = []} = this.props;
    const bindEle = bind as ReactElement;
    const renderBind = cloneElement(bindEle, {
      ...bindEle.props,
      ref: this.bindRef,
      onClick: (e: MouseEvent) => this.handleBindClick(e),
    });
    const renderMenuItems = menuItems.map(({text, handler}) => (
      <StyledMaterialMenuItem onClick={handler}>{text}</StyledMaterialMenuItem>
    ));

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
