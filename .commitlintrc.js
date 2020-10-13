/**
 * build : 改变了build工具 如 webpack
 * ci : 持续集成新增
 * chore : 构建过程或辅助工具的变动
 * docs : 文档改变
 * feat : 新功能
 * fix : 修复bug
 * perf : 性能优化
 * merge : 合并代码
 * refactor : 某个已有功能重构
 * revert : 撤销上一次的 commit
 * style : 代码格式改变
 * test : 增加测试
 * anno: 修改注释
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 60],
    'body-max-length': [2, 'always', 72],
    'footer-max-length': [2, 'always', 72],
    'subject-case': [0, 'never'],
    'scope-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'merge', 'refactor', 'revert', 'style', 'test', 'anno'],
    ],
  },
};
