'use strict';
module.exports = {
  types: [
    { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复 BUG' },
    { value: 'merge', name: 'merge: 合并代码' },
    { value: 'refactor', name: 'refactor: 重构代码，理论上不影响现有功能 (不是修复 bug 或是添加新功能)' },
    { value: 'style', name: 'style: 修改代码格式，不影响代码逻辑 (空格、代码格式化、缺少分号等)' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具和库 (如文档生成) 的更改' },
    { value: 'test', name: 'test: 增加或修改测试用例' },
    { value: 'docs', name: 'docs: 修改文档' },
    { value: 'perf', name: 'perf: 提升性能' },
    { value: 'revert', name: 'revert: 回滚到某一个版本 (带上版本号)' },
    { value: 'anno', name: 'anno: 修改注释' },
  ],
  scopes: ['containers', 'components', 'static', 'docs', 'config', 'hooks', 'state', 'utils'],
  skipQuestions: ['body', 'breaking', 'footer'],
  messages: {
    type: '选择要提交的更改类型:',
    scope: '选择更改影响的范围:',
    subject: '写一个简短、命令时态的语句来描述更改:',
    // body: '详细描述更改原因 (可选，按回车跳过). 使用 "|" 来换行:\n',
    // breaking: '列出 BREAKING CHANGES (可选):\n',
    // footer: '列出这次更改关闭的 ISSUES (可选). 如: #31, #34:\n',
    confirmCommit: '确定提交上面的更改?',
  },
  footerPrefix: 'close',
};
