import Python from '../assets/static/advantage/python.svg';

interface AdvantageConfig {
  title: string;
  content: string;
  img: string;
}

export const advantageConfigs: AdvantageConfig[] = [
  {
    title: '开源免费',
    content: '遵循开源协议，免费商用',
    img: Python,
  },
  {
    title: '将图标转化为字体应用',
    content: '添加项目的图标,可以生成在线链接,以字体形式进行复用',
    img: Python,
  },
  {
    title: '项目协同合作',
    content: '创建项目后上传icon,成员可以下载图标,前端同学可以将图标添加至代码',
    img: Python,
  },
  {
    title: '原创icon交流平台',
    content: '我们提供一个原创图标共享、交流平台,尊重原创，尊重每个设计师',
    img: Python,
  },
];
