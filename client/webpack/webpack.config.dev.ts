import {Configuration, EnvironmentPlugin} from 'webpack';
import merge from 'webpack-merge';
import Webpackbar from 'webpackbar';

import {RuntimeEnv} from '../src/website/types/environment';

import {WebpackDefaultConfig} from './webpack.config';
import {withWebpackPath} from './utils';

const DIST_PATH = withWebpackPath('dist');
const APP_NAME = 'Wizardoc';

const WebpackDevConfig: Configuration = merge(WebpackDefaultConfig, {
  mode: RuntimeEnv.DEVELOPMENT,
  output: {
    path: DIST_PATH,
  },
  plugins: [
    new EnvironmentPlugin({
      RUNTIME_ENV: RuntimeEnv.DEVELOPMENT,
    }),
    new Webpackbar({
      name: APP_NAME,
    }),
  ],
  devServer: {
    contentBase: DIST_PATH,
    port: 4200,
    historyApiFallback: true,
    stats: 'errors-warnings',
  },
  stats: 'errors-warnings',
});

export default WebpackDevConfig;
