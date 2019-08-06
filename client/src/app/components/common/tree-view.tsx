// import TreeItem from '@material-ui/lab/TreeItem';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem, {TreeItemProps} from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {TreeNode, markdownParser} from '../../utils';

export interface TreeViewProps {
  rootText: string;
  content: string;
}

const StyledTreeItem = styled(TreeItem)`
  font-size: 14px !important;
` as ComponentType<TreeItemProps>;

export class TreeViewGenerator extends Component<TreeViewProps> {
  render(): ReactNode {
    const {content, rootText} = this.props;
    const {children} = markdownParser(content);
    const treeRoot = {
      text: rootText,
      level: 0,
      children,
      index: '-1',
    };

    return (
      <TreeView
        defaultExpanded={[
          '-1',
          ...Array.from({length: 3}, (_, v) => v.toString()),
        ]}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {this.createTreeNode(treeRoot)}
      </TreeView>
    );
  }

  private createTreeNode(node: TreeNode): ReactNode {
    const {children} = node;

    return (
      <StyledTreeItem
        key={node.index}
        nodeId={node.index.toString()}
        label={node.text}
      >
        {!!children.length
          ? children.map(child => this.createTreeNode(child))
          : undefined}
      </StyledTreeItem>
    );
  }
}
