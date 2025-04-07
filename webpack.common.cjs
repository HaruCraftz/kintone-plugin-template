const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = {
  target: ['web', 'es2023'],
  entry: {
    desktop: path.join('src', 'desktop', 'index.ts'),
    config: path.join('src', 'config', 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'plugin'),
    filename: 'js/[name].js',
  },
  cache: {
    type: 'filesystem',
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/contents/config.html', to: 'html' },
        { from: 'src/contents/icon.png', to: 'img' },
      ],
    }),
    // new KintonePlugin({
    //   manifestJSONPath: './manifest.json',
    //   privateKeyPath: './plugin/private.ppk',
    //   pluginZipPath: './plugin/plugin.zip',
    // }),
  ],
};
