const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin({
      // 不删除dll目录下的文件
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'],
    }),
  ],
});
