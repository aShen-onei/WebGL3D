const path = require('path');
const webpack = require('webpack');
const MINICSSEXTRACTPLUGIN = require('mini-css-extract-plugin');
const HTMLWEBPACKPLUGIN = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    path: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool:'#cheap-module-eval-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  module: {
    rules: [
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:/\.css$/,
        use: [
          {
            loader: MINICSSEXTRACTPLUGIN.loader
          },
          'css-loader'
        ]
      },
      {
        test:/\.(gif|jpg|jpeg|png|JPG|PNG|JPEG)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWEBPACKPLUGIN({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new webpack.ProgressPlugin(),
    new MINICSSEXTRACTPLUGIN({
      filename: '[name].css'
    }),
  ]
};
module.exports = config;