import {FormHelperText} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactElement, ReactNode, cloneElement} from 'react';

type Validator = (
  value: string,
  name: string,
  cb: (msg?: string) => void,
) => void;

interface RuleBody {
  errMsg?: string;
  trigger?: string;
  validator?: Validator;
}

interface Rule {
  [index: string]: RuleBody;
}

interface FormControlProps {
  rules: Rule;
  onFormDataChange(formData: unknown): void;
}

interface FieldInfo {
  errMsg: string;
}

@observer
export class FormControl extends Component<FormControlProps> {
  @observable
  private fieldInfos: {[index: string]: FieldInfo} = {};

  render(): ReactNode {
    const {children, rules} = this.props;

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
      const rule = rules[name];

      // no rule
      if (!rule) {
        return part;
      }

      let isError = false;
      const {errMsg, trigger = 'change'} = rule;
      const listenerName = `on${trigger[0].toUpperCase()}${trigger.slice(1)}`;
      const setErrMsg = (msg?: string): void => {
        const info = this.fieldInfos[name] || {};

        info.errMsg = msg || '';

        this.fieldInfos[name] = info;
      };

      const errorThrower = (msg?: string): void => {
        setErrMsg(msg);

        isError = true;
      };
      const validator: Validator =
        rule.validator ||
        ((value: string, name: string, cb: (errMsg?: string) => void): void => {
          const throwErrMsg = errMsg || `${name} 不能为空`;

          if (!value || value === '') {
            cb(throwErrMsg);
          }
        });
      const originListener = part.props[listenerName] || ((): void => {});

      part = cloneElement(child, {
        ...part.props,
        [listenerName]: (e: any) => {
          originListener(e);

          isError = false;
          validator(e.target.value, name, errorThrower);

          if (!isError) {
            setErrMsg();
          }
        },
        error: !['', undefined].includes((this.fieldInfos[name] || {}).errMsg),
      });

      return (
        <>
          {part}
          <FormHelperText id="component-error-text">
            {(this.fieldInfos[name] || {}).errMsg}
          </FormHelperText>
        </>
      );
    });

    return <>{parts}</>;
  }
}
