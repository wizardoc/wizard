import {FormHelperText} from '@material-ui/core';
import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {
  ChangeEvent,
  Component,
  ComponentType,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react';
import styled from 'styled-components';
import {isArray} from '@wizardoc/shared';

import {IFormControl} from './form-control-type';

export type Validator = (
  rule: Rule,
  value: string,
  cb: (msg?: string) => void,
) => void;

export interface Rule {
  errMsg?: string;
  trigger?: string;
  validator?: Validator;
  required?: boolean;
}

export interface FormElementComponentProps {
  name: string;
  onChange(...value: any[]): void;
}

export interface Rules {
  [index: string]: Rule;
}

interface FormControlProps {
  rules?: Rules;
  onFormDataChange(formData: any): void;
}

interface ErrorHelpMessageProps {
  hasIcon: boolean;
}

interface ErrorInfo {
  errMsg: string;
}

interface FieldInfos {
  [index: string]: unknown;
}

interface ValidatorInfo {
  isError: boolean;
  validator(): void;
}

interface ValidatorInfos {
  [index: string]: ValidatorInfo;
}

const Wrapper = styled.div``;

const ErrorHelpMessage = styled(FormHelperText)<ErrorHelpMessageProps>`
  ${props => props.hasIcon && 'margin-left: 35px !important;'}
  height: 19px;
  color: red !important;
` as ComponentType<FormHelperTextProps & ErrorHelpMessageProps>;

@observer
export class FormControl extends Component<FormControlProps>
  implements IFormControl {
  @observable
  private errorManager: {[index: string]: ErrorInfo} = {};

  @observable
  private fieldInfos: FieldInfos = {};

  @observable
  private validators: ValidatorInfos = {};

  render(): ReactNode {
    const {children, rules = {}, onFormDataChange} = this.props;

    if (!children) {
      return <></>;
    }

    let parsedChildren = [];

    if (!isArray(children)) {
      parsedChildren.push(children);
    } else {
      parsedChildren = children;
    }

    const parts = (parsedChildren as ReactElement[]).map(child => {
      if (!child.props) {
        return <></>;
      }

      let part = cloneElement(child, {
        ...child.props,
        'aria-describedby': 'component-error-text',
      });
      const {name, icon} = part.props || {name: '', icon: undefined};
      const rule = rules[name] || {};

      let isError = true;
      const {errMsg, trigger = 'change', required} = rule;
      const listenerName = `on${trigger[0].toUpperCase()}${trigger.slice(1)}`;
      const setErrMsg = (msg?: string): void => {
        const info = this.errorManager[name] || {};

        info.errMsg = msg || '';

        this.errorManager[name] = info;
      };
      const errorThrower = (msg?: string): void => {
        setErrMsg(msg);

        this.validators[name].isError = true;
        isError = true;
      };

      if (!this.validators[name]) {
        // 收集各个输入框的 validator
        this.validators[name] = {
          validator: () => {
            validator(rule, this.fieldInfos[name] as string, errorThrower);
          },
          isError: true,
        };
      }

      /** 用户自定义 validator */
      const userValidator = rule.validator || ((): void => {});
      const validator: Validator = required
        ? (_rule: Rule, value: any, cb: (errMsg?: string) => void): void => {
            const throwErrMsg = errMsg || `${name} 不能为空`;

            if (!value || value === '') {
              cb(throwErrMsg);
            }

            userValidator(_rule, value, cb);
          }
        : userValidator;
      const originListener = part.props[listenerName] || ((): void => {});
      const sysListener = (value: any, args: any[]): void => {
        originListener(value, ...args);

        isError = false;
        this.validators[name].isError = false;

        validator(rule, value, errorThrower);

        if (!isError) {
          setErrMsg();
        }
      };

      // 封装 onChange
      const listeners = {
        [listenerName]: sysListener,
        onChange: (v: unknown, ...args: any[]): void => {
          const value =
            (v as ChangeEvent<HTMLInputElement>)?.target?.value ?? v;

          if (listenerName === 'onChange') {
            sysListener(value, args);
          }

          // 附上数据
          this.fieldInfos[name] = value;

          onFormDataChange(this.fieldInfos);
        },
      };

      const isErrorProp = !['', undefined].includes(
        (this.errorManager[name] || {}).errMsg,
      );

      part = cloneElement(child, {
        ...part.props,
        ...listeners,
        error: isErrorProp,
        // 一级 children 附加错误处理
        children: (part.props.children ?? []).map((child: ReactElement) =>
          cloneElement(child, {...child.props, error: isErrorProp}),
        ),
      });

      return (
        <Wrapper {...part.props}>
          {part}
          <ErrorHelpMessage id="component-error-text" hasIcon={!!icon}>
            {(this.errorManager[name] || {}).errMsg}
          </ErrorHelpMessage>
        </Wrapper>
      );
    });

    return <>{parts}</>;
  }

  validate(): boolean {
    return Object.keys(this.validators).reduce(
      (result, name) => this.validateField(name) && result,
      true,
    );
  }

  validateField(name: string): boolean {
    const {validator, isError} = this.validators[name];

    validator();

    return !isError;
  }
}

export interface FormItemProps {
  name?: string;
}
