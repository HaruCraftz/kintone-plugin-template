const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const environment = process.env.NODE_ENV || 'production';

console.log('🔧 Environment:', environment);

const srcDir = path.join(__dirname, 'src');
const desktopEntryPath = path.join(srcDir, 'desktop', 'index.ts');
const mobileEntryPath = path.join(srcDir, 'mobile', 'index.ts');

// エントリーポイントを動的に構築するオブジェクト
const dynamicEntries = {
  config: path.join(srcDir, 'config', 'index.ts'),
};

// desktopエントリファイルが存在するかチェックし、存在すれば追加
if (fs.existsSync(desktopEntryPath)) {
  dynamicEntries.desktop = desktopEntryPath;
  console.log('✅ Including desktop entry point.');
} else {
  console.log('❎ Desktop entry point not found > skipping.');
}

// mobileエントリファイルが存在するかチェックし、存在すれば追加
if (fs.existsSync(mobileEntryPath)) {
  dynamicEntries.mobile = mobileEntryPath;
  console.log('✅ Including mobile entry point.');
} else {
  console.log('❎ Mobile entry point not found > skipping.');
}

console.log('\n📦 Webpack building...\n');

const config = {
  mode: environment,
  target: ['web', 'es2023'],
  entry: dynamicEntries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  cache: {
    type: 'filesystem',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/contents', to: 'contents' }],
    }),
    new KintonePlugin({
      manifestJSONPath: './manifest.json',
      privateKeyPath: './plugin/private.ppk',
      pluginZipPath: './plugin/plugin.zip',
    }),
  ],
};

module.exports = () => {
  switch (environment) {
    case 'production':
      return merge(config, {
        optimization: {
          minimizer: [],
          emitOnErrors: false,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: { format: { comments: false } },
              extractComments: false,
            }),
            new CssMinimizerPlugin(),
          ],
        },
      });
    case 'development':
      return merge(config, {
        devtool: 'inline-source-map',
        // devServer: {
        //   static: {
        //     directory: path.join(__dirname, 'plugin'),
        //   },
        //   compress: true,
        //   port: 8080,
        //   hot: true,
        // },
      });
    default:
      throw new Error(`Invalid environment: ${environment}`);
  }
};
