import {TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import React, {FunctionComponent} from 'react';

interface FormTextFieldInnerProps {
  name: string;
}

export type FormTextFieldProps = FormTextFieldInnerProps & TextFieldProps;

export const FormTextField: FunctionComponent = (props: FormTextFieldProps) => (
  <TextField {...props} />
);
