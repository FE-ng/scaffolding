/*
 * @Author: your name
 * @Date: 2020-10-09 17:06:36
 * @LastEditTime: 2021-03-04 16:36:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /scaffolding/scripts/constants.js
 */
const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
const isDev = process.env.NODE_ENV !== 'production';
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = '3008';

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  isDev,
};
