import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {Inject} from 'react-ts-di';

import {Markdown, TreeNode} from '../../services';

import {TreeViewItem} from './tree-view-item';

interface TreeViewProps {
  content: string;
}

@observer
export class TreeView extends Component<TreeViewProps> {
  @Inject
  markdown!: Markdown;

  @observable
  currentClickItemTag = '';

  render(): ReactNode {
    const {content} = this.props;
    const nodes = this.markdown.parse(content);

    return <div>{nodes.children.map(child => this.renderItems(child))}</div>;
  }

  private renderItems(nodes: TreeNode): ReactNode {
    const {text, children, index} = nodes;

    return (
      <TreeViewItem
        key={index + text}
        index={index}
        text={text}
        isClick={this.currentClickItemTag === index + text}
        onItemClick={(text, index) => this.handleItemClick(text, index)}
      >
        {children.map((child: TreeNode) => this.renderItems(child))}
      </TreeViewItem>
    );
  }

  private handleItemClick(text: string, index: string): void {
    this.currentClickItemTag = index + text;
  }
}
