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
  primaryColor: '#1976d2',
  secondaryColor: '#f06292',
  darkPrimaryColor: '#1565c0',
  dark: '#424242',
  highRed: '#e91e63',
  shallowGray: '#eeeeee',
  redLinearGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  spacing: '10px',
  baseBgColor: '#eceff1',
  codeBgColor: '#f8f8f8',
  shallowBlue: 'rgba(25, 118, 210, 0.08)',
  articleColor: '#2f2f2f',
  quoteBgColor: 'rgba(255, 218, 121,0.2)',
};

export default styled;
export {css, createGlobalStyle, keyframes, ThemeProvider};
