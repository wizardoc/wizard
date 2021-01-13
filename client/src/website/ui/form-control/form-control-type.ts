import {Validator} from './form-control';

// import {Validator} from './form-control';

export interface IFormControl {
  validate(): boolean;
}

export namespace Form {
  export namespace Validators {
    type LengthValidator = (isMax: boolean, length: number, name: string) => Validator;
    type CommonLengthValidator = (length: number, name: string) => Validator;

    type MaxLengthValidator = CommonLengthValidator;
    type MinLengthValidator = CommonLengthValidator;

    const lengthValidator: LengthValidator = (
      isMax: boolean,
      length: number,
      name: string,
    ) => (_rule, text, cb) => {
      const matcher = text && (isMax ? text.length >= length : text.length <= length);

      if (matcher) {
        cb(`${name}的长度必须${isMax ? '少' : '多'}于${length}位`);
      }
    };

    /** maxLength validator */
    export const minLengthValidator: MinLengthValidator = (
      minLength: number,
      name: string,
    ) => lengthValidator(false, minLength, name);

    /** minLength validator */
    export const maxLengthValidator: MaxLengthValidator = (
      maxLength: number,
      name: string,
    ) => lengthValidator(true, maxLength, name);
  }
}
