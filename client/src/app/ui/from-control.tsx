import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {
  Children,
  Component,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react';
import styled from 'styled-components';

import {TipStore} from '../store';
import {InjectStore} from '../utils';

import {FormTextFieldProps} from './form-text-field';
import {Tip, TipVariant} from './tip';

type Validator = (str: string) => true | string;
type DefaultValidator = 'required';
type Trigger = 'onChange' | 'onBlur' | 'onInput' | 'onFocus' | string;
export type FullValidator = () => boolean;

export interface ChangeEvent {
  target: {value: string};
}

export interface FormInfo {
  [index: string]: string;
}

export interface Rule {
  validator: Validator | DefaultValidator;
  trigger?: Trigger;
}

export interface Rules {
  [index: string]: Rule | undefined;
}

export interface FormControlProps {
  rules: Rules;
  children: ReactNode[];
  onDataUpdate?(formInfo: FormInfo): void;
  getValidator?(validator: FullValidator): unknown;
}

const Wrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getActuallyValidator = (
  validator: Validator | DefaultValidator,
  label: unknown,
): Validator =>
  validator === 'required'
    ? (str: string) => (!!str && str !== '') || `${label} 为必填字段`
    : validator;

@observer
export class FromControl extends Component<FormControlProps> {
  private formInfo: FormInfo = {};

  @observable
  private message: string = '';

  @observable
  private tipVariant: TipVariant = TipVariant.Success;

  @observable
  private partProps: FormTextFieldProps[] = [];

  @InjectStore(TipStore)
  private tipStore!: TipStore;

  @action
  openTip(message: string, tipVariant: TipVariant): void {
    this.message = message;
    this.tipVariant = tipVariant;
    this.tipStore.tipToggle();
  }

  render(): ReactNode {
    const {children, rules, onDataUpdate, getValidator} = this.props;
    const partProps: FormTextFieldProps[] = [];

    const formParts = Children.map(children, (child, index) => {
      const node = cloneElement(child as ReactElement);

      partProps[index] = {...node.props};

      const {name, label} = partProps[index];
      const rule = rules[name];

      if (rule) {
        const {trigger = 'onChange', validator} = rule;
        let listener: (...args: unknown[]) => void = () => {};

        if (partProps[index][trigger]) {
          listener = partProps[index][trigger];
        }

        partProps[index][trigger] = (e: ChangeEvent) => {
          const {
            target: {value},
          } = e;

          const actuallyValidator: Validator = getActuallyValidator(
            validator,
            label,
          );

          const result = actuallyValidator(value);

          if (typeof result === 'string') {
            partProps[index].error = true;

            this.openTip(result, TipVariant.Error);
          } else {
            partProps[index].error = false;

            this.formInfo[name] = value;

            // process
            if (onDataUpdate) {
              onDataUpdate(this.formInfo);
            }
          }

          listener(e);
          this.partProps[index] = partProps[index];
        };
      }

      return cloneElement(
        child as ReactElement,
        this.partProps[index] || partProps[index],
      );
    });

    if (getValidator) {
      getValidator(
        (): boolean => {
          if (!rules) {
            return true;
          }

          let noError = true;

          for (const name of Object.keys(rules)) {
            const {validator} = rules[name] as Rule;
            const result = getActuallyValidator(validator, name)(
              this.formInfo[name] || '',
            );

            if (typeof result === 'string') {
              this.tipStore.addTipToQueue(result, 'error');
              noError = false;
            }
          }

          return noError;
        },
      );
    }

    return (
      <Wrapper>
        {formParts}
        <Tip tipVariant={this.tipVariant} message={this.message} />
      </Wrapper>
    );
  }

  componentWillUnmount(): void {
    this.tipStore.destroy();
  }
}
