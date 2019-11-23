const webpack = require('webpack');
const {resolve, join} = require('path');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'lodash'],
  },
  output: {
    path: resolve('static'),
    library: '_dll_[name]',
    filename: 'dll/_dll_[name].[hash].js',
  },
  plugins: [
    // new CleanWebpackPlugin(['dll'], {
    //   root: resolve('static'),
    // }),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: join(__dirname, './static', '[name].manifest.json'),
    }),
  ],
};
