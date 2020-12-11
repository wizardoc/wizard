import React, {Component, ReactNode} from 'react';
import {Autocomplete} from '@material-ui/lab';
import {observer} from 'mobx-react';

type InputRenderProps = (params: unknown) => ReactNode;

export interface SearchPromptProps {
  children: InputRenderProps;
  options: string[];
}

@observer
export class SearchPrompt extends Component<SearchPromptProps> {
  render(): ReactNode {
    const {children, options} = this.props;

    return (
      <Autocomplete
        options={options}
        renderOption={option => <React.Fragment>{option}</React.Fragment>}
        autoHighlight
        getOptionLabel={(option: any): string => option}
        renderInput={children}
      />
    );
  }
}
