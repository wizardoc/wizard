import React, {Component, ReactNode} from 'react';
import {Editor, EditorState, CompositeDecorator, ContentState} from 'draft-js';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import createFluentMarkdownPlugin from 'draft-js-fluent-markdown-plugin';

function findFirstABC(contentBlock, callback) {
  const text = contentBlock.getText();

  if (text.indexOf('abc') > 0) {
    callback(text.indexOf('abc'), text.indexOf('abc') + 3);
  }
}

// 标红色
const ABCSpan = props => {
  return <span style={{color: 'red'}}>{props.children}</span>;
};

const compositeDecorator = new CompositeDecorator([
  {
    strategy: findFirstABC,
    component: ABCSpan,
  },
]);

@observer
export class MarkdownEditor extends Component {
  @observable
  private editorState = EditorState.createEmpty(compositeDecorator);

  handleContentChange(state: EditorState): void {
    this.editorState = state;

    console.info(state);
    console.info(this.editorState.getSelection().getStartOffset());
  }

  // handleKeyCommand(state, command): void {
  //   console.info(command);
  // }

  render(): ReactNode {
    return (
      <Editor
        editorState={this.editorState}
        onChange={this.handleContentChange.bind(this)}
        spellCheck={true}

        // handleKeyCommand={this.handleKeyCommand.bind(this)}
      />
    );
  }
}
