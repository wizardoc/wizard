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

type Validator = (
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

export interface Rules {
  [index: string]: Rule;
}

interface FormControlProps {
  rules: Rules;
  onFormDataChange(formData: unknown): void;
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

const Wrapper = styled.div`
  margin: 0 !important;
  padding: 0 !important;
`;

const ErrorHelpMessage = styled(FormHelperText)`
  color: red !important;
` as ComponentType<FormHelperTextProps>;

@observer
export class FormControl extends Component<FormControlProps> {
  @observable
  private errorManager: {[index: string]: ErrorInfo} = {};

  @observable
  private fieldInfos: FieldInfos = {};

  @observable
  private validators: ValidatorInfos = {};

  render(): ReactNode {
    const {children, rules, onFormDataChange} = this.props;

    if (!children) {
      return <></>;
    }

    const parts = (children as ReactElement[]).map(child => {
      if (!child.props) {
        return <></>;
      }

      let part = cloneElement(child, {
        ...child.props,
        'aria-describedby': 'component-error-text',
      });
      const {name} = part.props || {name: ''};
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
          isError: false,
        };
      }

      /** 用户自定义 validator */
      const userValidator = rule.validator || ((): void => {});
      const validator: Validator = required
        ? (_rule: Rule, value: string, cb: (errMsg?: string) => void): void => {
            const throwErrMsg = errMsg || `${name} 不能为空`;

            if (!value || value === '') {
              cb(throwErrMsg);
            }

            userValidator(_rule, value, cb);
          }
        : userValidator;
      const originListener = part.props[listenerName] || ((): void => {});
      const sysListener = (e: unknown): void => {
        originListener(e);

        isError = false;
        this.validators[name].isError = false;

        validator(
          rule,
          (e as ChangeEvent<HTMLInputElement>).target.value,
          errorThrower,
        );

        if (!isError) {
          setErrMsg();
        }
      };

      // 封装 onChange
      const listeners = {
        onChange: (e: ChangeEvent): void => {
          if (listenerName === 'onChange') {
            sysListener(e);
          }

          // 附上数据
          this.fieldInfos[name] = (e as ChangeEvent<
            HTMLInputElement
          >).target.value;

          onFormDataChange(this.fieldInfos);
        },
        ...(listenerName === 'onChange' ? {} : {[listenerName]: sysListener}),
      };

      part = cloneElement(child, {
        ...part.props,
        ...listeners,
        error: !['', undefined].includes(
          (this.errorManager[name] || {}).errMsg,
        ),
      });

      return (
        <Wrapper key={name}>
          {part}
          <ErrorHelpMessage id="component-error-text">
            {(this.errorManager[name] || {}).errMsg}
          </ErrorHelpMessage>
        </Wrapper>
      );
    });

    return <>{parts}</>;
  }

  validate(): boolean {
    let validateResult = false;

    for (const info of Object.keys(this.validators)) {
      const {validator, isError} = this.validators[info];

      validator();
      console.info(validateResult, isError);

      validateResult = validateResult && isError;
    }

    return validateResult;
  }
}
