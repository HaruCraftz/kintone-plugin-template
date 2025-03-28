const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
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
