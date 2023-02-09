const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ENV = require('dotenv').config().parsed;
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: 'style.css',
          }),
        ]
  ),
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public'),
      // match the output 'publicPath'
      publicPath: '/',
    },
    historyApiFallback: true,
    port: ENV.REACT_DEV_PORT,
    // contentBase: path.resolve(__dirname, './public'),
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false,
        context: ['**'],
      },
    },
  },
};
