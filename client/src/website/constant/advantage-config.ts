import OpenSourceIcon from 'website/assets/static/advantage/open_source.png';
import FontDocsIcon from 'website/assets/static/advantage/font_docs.png';
import SwaggerIcon from 'website/assets/static/advantage/swagger.png';
import ChatIcon from 'website/assets/static/advantage/chat.png';

interface AdvantageConfig {
  title: string;
  content: string;
  img: string;
}

export const advantageConfigs: AdvantageConfig[] = [
  {
    title: '开源免费',
    content: '遵循开源协议，免费商用',
    img: OpenSourceIcon,
  },
  {
    title: '管理前端组件文档',
    content: '添加项目的图标,可以生成在线链接,以字体形式进行复用',
    img: FontDocsIcon,
  },
  {
    title: 'swagger 文档管理',
    content: '创建项目后上传icon,成员可以下载图标,前端同学可以将图标添加至代码',
    img: SwaggerIcon,
  },
  {
    title: '更多技术交流机会',
    content: '我们提供一个原创图标共享、交流平台,尊重原创，尊重每个设计师',
    img: ChatIcon,
  },
];
