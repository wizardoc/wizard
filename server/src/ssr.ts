import {readFileByStream, renderEngine} from './utils';

export async function render(vdom: string): Promise<string> {
  let content: string = '';

  try {
    content = renderEngine(
      await readFileByStream('public/index.html'),
      'rootDom',
      vdom,
    );
  } catch (e) {
    console.error(e);
  }

  return content;
}
