import React, {Component, ReactNode} from 'react';
import {Editor, EditorState, CompositeDecorator, ContentState} from 'draft-js';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import createFluentMarkdownPlugin from 'draft-js-fluent-markdown-plugin';

import {Header} from './components';

function findFirstABC(contentBlock, callback, state: ContentState) {
  const text: string = contentBlock.getText();

  if (text.startsWith('# ')) {
    callback(2, text.length);
  }
}

const hash = (contentBlock, callback) => {
  const text: string = contentBlock.getText();

  if (text.startsWith('# ')) {
    callback(0, 1);
  }
};

// 标红色
const HeaderBlock = props => {
  return <Header level="1">{props.children}</Header>;
};

const HashTag = props => <span>{props.children}</span>;

const compositeDecorator = new CompositeDecorator([
  {
    strategy: findFirstABC,
    component: HeaderBlock,
  },
  {
    strategy: hash,
    component: HashTag,
  },
]);

function foo(contentBlock) {
  const type = contentBlock.getType();

  console.info(contentBlock);

  return () => ({
    component: <></>,
    editable: false,
    props: {
      foo: 'bar',
    },
  });
}

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
        blockRendererFn={a => foo(a)}
        // handleKeyCommand={this.handleKeyCommand.bind(this)}
      />
    );
  }
}
