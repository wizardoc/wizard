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
  black: '#000',
  primaryColor: '#1976d2',
  secondaryColor: '#f06292',
  thirdColor: '#feca57',
  darkPrimaryColor: '#1565c0',
  green: '#27ae60',
  dark: '#424242',
  shallowPrimaryColor: 'rgba(25, 118, 210, 0.1)',
  highRed: '#e91e63',
  translucentWhite: 'rgba(255, 255, 255, 0.5)',
  editorGray: '#f4f4f4',
  shallowGray: '#eeeeee',
  deepGray: '#cecece',
  redLinearGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  spacing: '10px',
  baseBgColor: '#eceff1',
  codeBgColor: '#f8f8f8',
  shallowBlue: 'rgba(25, 118, 210, 0.08)',
  articleColor: '#2f2f2f',
  quoteBgColor: 'rgba(255, 218, 121,0.2)',
  white: '#fff',
  shallowSecondaryColor: 'rgba(240, 98, 146, 0.1)',
  grayTextColor: 'rgba(0, 0, 0, 0.54)',
  baseShadow:
    '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);',
};

export default styled;
export {css, createGlobalStyle, keyframes, ThemeProvider};
