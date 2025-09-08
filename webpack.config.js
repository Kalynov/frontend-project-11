// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: process.env.NODE_ENV ?? 'development',
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default () => config;
