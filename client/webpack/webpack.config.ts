import {Configuration} from 'webpack';
import WebpackHTMLPlugin from 'html-webpack-plugin';

import TSConfig from '../tsconfig.json';

import {withWebpackPath} from './utils';

export const WebpackDefaultConfig: Configuration = {
  entry: withWebpackPath('src', 'index.tsx'),
  output: {
    filename: '[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|woff|ttf|eot)/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new WebpackHTMLPlugin({template: withWebpackPath('public', 'index.html')})],
  resolve: {
    // To help DevServer find deps in monorepo
    modules: [withWebpackPath('..', 'node_modules'), withWebpackPath('node_modules')],
    extensions: ['.tsx', '.js', '.json', '.jsx', '.ts'],
    alias: {
      '~': withWebpackPath(),
      website: withWebpackPath('src/website/'),
    },
  },
};
