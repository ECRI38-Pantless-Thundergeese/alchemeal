const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
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
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: [0.9, 0.95],
              },
            },
          },
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallback: { os: require.resolve('os-browserify/browser') },
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      safe: true,
      defaults: true,
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
    port: process.env.REACT_DEV_PORT,
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
