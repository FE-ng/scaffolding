const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common.js');
const { PROJECT_PATH } = require('../constants');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin({
      // 不删除dll目录下的文件
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'],
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1', // host 设置
      analyzerPort: 8888, // 端口号设置
    }),
  ],
});
