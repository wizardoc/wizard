import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import {withTheme, ThemeComponentProps} from '../theme';

export interface FilterOptions {
  activeTextColor: string;
  textColor: string;
}

export interface FilterItem {
  text: string;
  value: string;
}

export interface FilterProps {
  items: FilterItem[];
  options?: Partial<FilterOptions>;
  onChange?(value: string): void;
}

interface FilterTextProps {
  isActive: boolean;
  activeTextColor: string;
  textColor: string;
}

const FilterText = styled.div<FilterTextProps>`
  color: ${props => (props.isActive ? props.activeTextColor : props.textColor)};

  cursor: pointer;
  font-size: 15px;
  margin-right: 12px;
`;

const Wrapper = styled.div`
  display: flex;
`;

@withTheme
@observer
export class Filter extends Component<FilterProps & Partial<ThemeComponentProps>> {
  @observable
  private activeItem: string;

  constructor(props: FilterProps) {
    super(props);

    this.activeItem = this.props.items[0].value;
  }

  render(): ReactNode {
    const {items, options = {}} = this.props;
    const renderFilterItems = items.map(({text, value}) => (
      <FilterText
        {...this.parseOptions(options)}
        onClick={() => this.setActiveItem(value)}
        isActive={value === this.activeItem}
      >
        {text}
      </FilterText>
    ));

    return <Wrapper>{renderFilterItems}</Wrapper>;
  }

  private setActiveItem(value: string): void {
    const {onChange = (): void => {}} = this.props;

    this.activeItem = value;
    onChange(value);
  }

  private parseOptions(options: Partial<FilterOptions>): FilterOptions {
    const {theme} = this.props;

    return {
      activeTextColor: theme!.black,
      textColor: theme!.deepFlatGray,
      ...options,
    };
  }
}
