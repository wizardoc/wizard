export interface TreeNode extends ParsedTreeNode {
  index: string;
  children: TreeNode[];
}

export interface ParsedTreeNode {
  text: string;
  level: number;
  children: ParsedTreeNode[];
}

export interface Root {
  children: TreeNode[];
  parsedFlatNodeIndexes: string[];
}

interface NodeInfo {
  level: number;
  text: string;
}

export function markdownParser(data: string): Root {
  // traverse
  const titles = (data.match(/(?:^|\n|\s)(#+\s.+)/g) || []).map((cap: string) =>
    cap.trim(),
  );
  const getNodeInfo = (title: string): NodeInfo => {
    let nodeInfo = {
      text: '',
      level: 0,
    };

    title.replace(
      /(#+)\s(.+)/g,
      (_, level: string, text: string) =>
        (nodeInfo = {level: -level.length, text}) && '',
    );

    return nodeInfo;
  };
  const root: Root = {
    children: [],
    parsedFlatNodeIndexes: [
      ...Array.from({length: titles.length}, (_, key) => key.toString()),
    ],
  };
  const noop = {
    index: '',
    level: 0,
    text: '',
    children: [],
  };

  let topLevelNode: TreeNode = noop;
  let lessLevelNode: TreeNode | undefined;
  let stashNode: TreeNode = noop;

  for (const index of Object.keys(titles)) {
    const node = {
      index,
      ...getNodeInfo(titles[index]),
      children: [],
    };
    const reset = (): void => {
      root.children.push(node);

      topLevelNode = node;
      lessLevelNode = node;
      stashNode = node;
    };

    if (!lessLevelNode) {
      reset();

      continue;
    }

    if (node.level < lessLevelNode.level) {
      lessLevelNode.children.push(node);

      stashNode = lessLevelNode;
      lessLevelNode = node;
    } else if (node.level === lessLevelNode.level) {
      stashNode.children.push(node);
    } else if (node.level < topLevelNode.level) {
      topLevelNode.children.push(node);
    } else if (node.level >= topLevelNode.level) {
      reset();
    }
  }

  return root;
}
