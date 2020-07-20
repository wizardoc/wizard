import {Injectable} from '@wizardoc/injector';

import {ViewPortObserver} from 'src/app/utils';

import {DocumentService} from '../document';
import {ArrowCache} from '../arrow-cache';
import {CatalogService} from '../catalog-service';

import {markdown} from './@markdown-config';

export interface HeadingObject {
  level: number;
  content: string;
}

export type Headings = HeadingObject[];

export interface RenderAssets {
  headings: Headings;
  content: string;
}

@Injectable()
export class MarkdownService {
  constructor(
    private documentService: DocumentService,
    private arrowCache: ArrowCache,
    private catalogService: CatalogService,
  ) {}

  async render(path: string, id: string): Promise<RenderAssets> {
    // const cacheData = (await this.arrowCache.getItem(id)) as RenderAssets;

    // if (cacheData) {
    //   return cacheData;
    // }

    const raw = await this.documentService.fetchContent(path);

    const headings: Headings = [];
    const content = markdown.render(raw, headings);
    const renderResult: RenderAssets = {
      content,
      headings,
    };

    this.arrowCache.setItem(id, renderResult);

    return renderResult;
  }

  renderToHTML(raw: string): RenderAssets {
    const headings: Headings = [];
    const content = markdown.render(raw, headings);
    const renderResult: RenderAssets = {
      content,
      headings,
    };

    console.warn(headings);

    return renderResult;
  }

  registerAnchor(headings: Headings): void {
    this.catalogService.currentAnchor = headings[0];

    for (const index of Object.keys(headings)) {
      const heading = headings[index];

      new ViewPortObserver()
        .ele(document.getElementById(heading.content)!)
        .listen(() => {
          const {currentAnchor} = this.catalogService;
          const currentIndex = headings.findIndex(
            ({content, level}) =>
              currentAnchor?.content === content &&
              currentAnchor.level === level,
          );

          if (Math.abs(currentIndex - +index) !== 1) {
            return;
          }

          this.catalogService.currentAnchor = heading;
        });
    }
  }
}
