import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  [index: string]: string;
}

export const styledTheme = {
  highRed: '#e91e63',
};

export default styled;
export {css, createGlobalStyle, keyframes, ThemeProvider};
