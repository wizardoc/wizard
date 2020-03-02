import React, {Component, ReactNode} from 'react';
import {Autocomplete, RenderInputParams} from '@material-ui/lab';
import {observer} from 'mobx-react';

type InputRenderProps = (params: RenderInputParams) => ReactNode;

export interface SearchPromptProps {
  children: InputRenderProps;
  options: string[];
  width: string;
}

@observer
export class SearchPrompt extends Component<SearchPromptProps> {
  render(): ReactNode {
    const {children, width, options} = this.props;

    return (
      <Autocomplete
        style={{width}}
        options={options}
        renderOption={option => <React.Fragment>{option}</React.Fragment>}
        autoHighlight
        getOptionLabel={(option: any): string => option}
        renderInput={children}
      />
    );
  }
}
