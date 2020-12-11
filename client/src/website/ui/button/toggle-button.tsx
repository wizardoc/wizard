import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@material-ui/lab/ToggleButtonGroup';
import {ToggleButton as MaterialToggleButton} from '@material-ui/lab';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

export interface ToggleButtonProps extends WrapperProps {
  items: ToggleItem[];
  size?: ToggleButtonGroupProps['size'];
  defaultValue?: string;
  onChange?(value: string): void;
}

export interface ToggleItem {
  icon: ReactNode;
  value: string;
  isDisabled?: boolean;
}

interface WrapperProps {
  direction?: 'row' | 'column';
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
`;

@observer
export class ToggleButton extends Component<ToggleButtonProps> {
  @observable
  currentValue: string;

  constructor(props: ToggleButtonProps) {
    super(props);

    this.currentValue = props.defaultValue || props.items[0].value;
  }

  render(): ReactNode {
    const {items, direction, size = 'small'} = this.props;
    const renderToggleItems = items.map(item => (
      <MaterialToggleButton key={item.value} value={item.value}>
        {item.icon}
      </MaterialToggleButton>
    ));

    return (
      <Wrapper direction={direction}>
        <ToggleButtonGroup
          exclusive
          value={this.currentValue}
          size={size}
          onChange={(_, value) => this.handleToggleButtonChange(value)}
        >
          {renderToggleItems}
        </ToggleButtonGroup>
      </Wrapper>
    );
  }

  handleToggleButtonChange(value: string): void {
    if (!value) {
      return;
    }

    const {onChange = (): void => {}} = this.props;

    onChange(value);

    this.currentValue = value;
  }
}
