/* eslint-disable no-irregular-whitespace */
/*
 *
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug
 * 　　　┃　　　┃　　+
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 *
 */

/*
 * @Author: your name
 * @Date: 2020-10-09 17:06:36
 * @LastEditTime: 2021-03-04 16:36:55
 * @LastEditors: your name
 * @Description: In User Settings Edit*
 * @FilePath: /scaffolding/scripts/proxySetting.js
 */
const yapi = '****';

const proxySettings = {
  // 接口代理1
  '/api/': {
    target: 'http://198.168.111.111:3001',
    changeOrigin: true,
  },
  // 接口代理2
  '/api-2/': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/api-2': '',
    },
  },
  '/': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
  },
  '/oms': yapi,
};

module.exports = proxySettings;
