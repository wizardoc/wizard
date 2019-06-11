import OpenSource from '../assets/static/advantage/open-source.png';
import RegisterSuccess from '../assets/static/register_successful.png';

interface AdvantageConfig {
  title: string;
  content: string;
  img: string;
}

export const advantageConfigs: AdvantageConfig[] = [
  {
    title: '开源免费',
    content: '遵循开源协议，免费商用',
    img: OpenSource,
  },
  {
    title: '优势2...',
    content: '优势内容2...',
    img: RegisterSuccess,
  },
  {
    title: '优势3...',
    content: '优势内容3...',
    img: RegisterSuccess,
  },
];
