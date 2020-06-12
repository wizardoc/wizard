import React, {
  Component,
  ReactNode,
  createRef,
  cloneElement,
  ReactElement,
} from 'react';
import {
  Popover as MaterialPopover,
  PopoverProps as MaterialPopoverProps,
  ClickAwayListener,
} from '@material-ui/core';
import {findDOMNode} from 'react-dom';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import styled from 'styled-components';

export interface PopoverProps extends Omit<MaterialPopoverProps, 'open'> {
  bind: ReactNode;
  trigger: 'hover' | 'click';
}

interface Listeners {
  [name: string]: () => void;
}

const StyledMaterialPopover = styled(MaterialPopover)`
  pointer-events: none;
`;

@observer
export class Popover extends Component<PopoverProps> {
  private bindDOM!: Element;

  private targetRef = createRef();

  @observable
  private isOpen = false;

  render(): ReactNode {
    const {bind, children, trigger} = this.props;
    const listeners = this.getListeners(trigger);
    const bindEl = bind as ReactElement;
    const renderBindEl = cloneElement(bindEl, {
      ...bindEl.props,
      ref: this.targetRef,
      ...listeners,
    });

    return (
      <>
        {renderBindEl}
        <StyledMaterialPopover
          open={this.isOpen}
          {...this.props}
          anchorEl={this.bindDOM}
          disableRestoreFocus
        >
          <ClickAwayListener onClickAway={() => (this.isOpen = false)}>
            {children}
          </ClickAwayListener>
        </StyledMaterialPopover>
      </>
    );
  }

  componentDidMount(): void {
    const {current} = this.targetRef;

    if (!current) {
      return;
    }

    this.bindDOM = findDOMNode(current as Element) as Element;
  }

  private getListeners(type: string): Listeners {
    const EVENT_TYPES = {
      hover: {
        onMouseEnter: (): void => {
          this.isOpen = true;
        },
        onMouseLeave: (): void => {
          this.isOpen = false;
        },
      },
      click: {
        onClick: (): void => {
          this.isOpen = true;
        },
      },
    };

    return EVENT_TYPES[type];
  }
}
