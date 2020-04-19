import * as styledComponents from 'styled-components';
// import {ComponentType} from 'react';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  // withTheme: styledWithTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  [index: string]: string;
}

export const styledTheme = {
  // colors
  black: '#000',
  primaryColor: '#3970f5',
  titleColor: '#333',
  descColor: '#666',
  secondaryColor: '#f06292',
  thirdColor: '#feca57',
  darkPrimaryColor: '#1565c0',
  green: '#27ae60',
  dark: '#424242',
  shallowPrimaryColor: 'rgba(25, 118, 210, 0.1)',
  highRed: '#e91e63',
  translucentPrimary: 'rgb(25, 118, 210, 0.5)',
  translucentWhite: 'rgba(255, 255, 255, 0.5)',
  editorGray: '#f4f4f4',
  shallowGray: '#eeeeee',
  baseGray: '#f7f7f7',
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
  shallowShadow: '0 1px 3px rgba(26,26,26,.1)',
  baseShadow:
    '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);',
  darkWhite: 'rgb(214, 211, 205)',
  darkGray: 'rgb(186, 181, 171)',
  shallowGrayBlue: '#f7f9fc',
  descriptionColor: '#70757a',
  fontGray: '#fafafa',
  avatarBgGray: '#bdbdbd',
  grayLineColor: '#7f8c8d',
  successGreen: '#43a047',
  infoBlue: '#618833',
  warnYellow: '#ffa000',
  errorRed: '#d32f2f',
  baseGrayBg: '#f4f5f5',
  blueGrayBg: '#f4f5f9',
  materialGray: '#e8e8e8',
  subTitleColor: '#081123',
  subTitleGray: '#5b6474',
  shallowSubTitleGray: '#c8c7d0',
  mainSecondaryColor: '#66cdc6',
  mainPrimaryColor: '#5241cb',
  lightBlue: '#3451ff',
  flatYellow: '#fdcb6e',
  flatGray: '#f5f5f5',
  coffeeGray: '#535c68',

  // variables
  heightOmitHeader: 'calc(100% - 48px)',
  headerBarHeight: '48px',
};

export type StyledTheme = typeof styledTheme;
// export const withTheme = <
//   T extends ComponentType<P>,
//   P extends {theme?: IThemeInterface | undefined}
// >(
//   component: T,
// ): any => (styledWithTheme(component as ComponentType<any>) as any) as T;

// type WithTheme<T> = (component: T) => T

export default styled;
export {css, createGlobalStyle, keyframes, ThemeProvider};
