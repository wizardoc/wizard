const {DllPlugin} = require('webpack');
const {resolve, join} = require('path');
const path = require('path');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '..'),
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-material-ui-form-validator',
      'react-transition-group',
      'react-ts-di',
      'rxjs',
      'styled-components',
      'uuid',
      '@loadable/component',
      '@material-ui/core',
      '@material-ui/icons',
      '@material-ui/lab',
      'axios',
      'highlight.js',
      'lodash',
      'draft-js',
      'mobx',
      'mobx-react',
      'mobx-utils',
      'moment',
      // 'marked',
      // 'qs',
      // 'object-assign',
    ],
  },
  output: {
    path: resolve('../static'),
    library: '_dll_[name]',
    filename: 'dll/_dll_[name].js',
  },
  plugins: [
    // new CleanWebpackPlugin(['dll'], {
    //   root: resolve('static'),
    // }),
    new DllPlugin({
      name: '_dll_[name]',
      path: join(__dirname, '../static', '[name].manifest.json'),
    }),
  ],
};
