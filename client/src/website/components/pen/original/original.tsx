import React, {Component, ReactNode} from 'react';
import {Editor, EditorState, DraftStyleMap, RichUtils} from 'draft-js';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import styled from 'styled-components';
import {Inject} from '@wizardoc/injector';

import {DraftService, DraftEvent} from '../../../services';

const EditorWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: ${props => props.theme.editorGray};
`;

interface OriginalProps {}

@observer
export class Original extends Component<OriginalProps> {
  @observable
  editorState!: EditorState;

  @Inject
  draftService!: DraftService;

  draftStyleMap: DraftStyleMap = {
    Bold: {
      fontWeight: 600,
    },
  };

  constructor(props: OriginalProps) {
    super(props);

    this.draftService.on(DraftEvent.CurrentStyle, style => {
      this._toggleInlineStyle(style);
    });
  }

  handleEditorContentChange(state: EditorState): void {
    this.editorState = state;

    // const selectionState = this.editorState.getSelection();
    // const anchorKey = selectionState.getAnchorKey();
    // const block = state.getCurrentContent().getBlockForKey(anchorKey);

    const values = state.getCurrentContent().values();
    let a: any;

    while ((a = values.next())) {
      console.info(a);
    }
  }

  render(): ReactNode {
    return (
      <EditorWrapper>
        <Editor
          customStyleMap={this.draftStyleMap}
          onChange={(state: EditorState) =>
            this.handleEditorContentChange(state)
          }
          editorState={this.editorState || EditorState.createEmpty()}
        ></Editor>
      </EditorWrapper>
    );
  }

  private _toggleInlineStyle(style: string): void {
    this.handleEditorContentChange(
      RichUtils.toggleBlockType(this.editorState, style),
    );
  }
}
