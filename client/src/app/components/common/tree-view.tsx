// import TreeItem from '@material-ui/lab/TreeItem';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem, {TreeItemProps} from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, {Component, ComponentType, MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';

import {TreeNode, markdownParser} from '../../utils';

export interface TreeViewProps {
  rootText: string;
  content: string;
}

const StyledTreeItem = styled(TreeItem)`
  .MuiTreeItem-root:focus > .MuiTreeItem-content {
    background: ${props => props.theme.primaryColor} !important;
    color: white;
  }

  .MuiTreeItem-group {
    border-left: 1px dashed rgb(0, 0, 0);
    padding-left: 12px;
    margin-left: 12px;
  }

  .MuiTreeItem-content {
    border-radius: 5px;
    padding: 5px 0 !important;

    :hover {
      background: rgba(25, 118, 210, 0.08);
    }
  }

  .MuiTreeItem-label {
    font-size: 14px !important;
    padding-left: 5px;
  }
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

  private handleTreeItemClick(e: MouseEvent, text: string): void {
    e.stopPropagation();

    console.info(text);

    location.hash = text;
  }

  private createTreeNode(node: TreeNode): ReactNode {
    const {children} = node;

    return (
      <StyledTreeItem
        key={node.index}
        nodeId={node.index.toString()}
        label={node.text}
        onMouseDown={(e: MouseEvent) => this.handleTreeItemClick(e, node.text)}
      >
        {!!children.length
          ? children.map(child => this.createTreeNode(child))
          : undefined}
      </StyledTreeItem>
    );
  }
}
