<!--
 * @Author: your name
 * @Date: 2021-03-12 17:11:44
 * @LastEditTime: 2021-03-16 16:19:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scaffolding/src/components.md
-->

# 搭建组件库

1. 组件库前期开发工作以及环境 
CLI: Create React App 官方支持的 CLI 脚手架，提供一个零配置的现代构建设置；
UI: Ant Design;
BUILD: webepack rollup parcel esbuild vite gulp;
OTHER: eslint\commit lint\typescript\changelog\husky\lint staged ...；
2. 代码组织方式：是否应该采用 MonoRepo？(lerna --> monorepo)
3. 目录结构
eg:
```
├── build                     // 打包脚本
├── docs                      // 文档部署目录（Github Pages）
├── examples                  // 示例代码（本地开发环境）
├── lib                       // 打包结果
├── scripts                   // 自动化脚本
├── site                      // 文档静态站点
├── src                       // 组件库源码
    ├── components            // 所有组件
        ├── [componentName]   // 单个组件
            ├── __tests__     // 组件测试文件
    ├── styles                // 样式
    ├── types                 // 类型声明文件
├── tests                     // 测试
├── .babelrc                  // 插件
├── .eslintrc                 // eslint 配置
├── .publish-ci.yml           // npm 包发布、站点部署 CI 脚本
├── jest.config.js            // Jest 配置文件
└── package.json              // package.json
```
4. 文档工具&部署
   
|工具名称|区别一|区别二|
|--|--|--| 
|storybook|使用特有的API开发文档说明，可以引入markdown文件|生成文档的界面带有storybook的痕迹较多一些| 
|docz|完美的结合了react和markdown语法开发文档.docz基于MDX（Markdown + JSX），可以在 Markdown 中引入 React 组件，使得一边编写文档，一边预览调试成为了可能。而且得益于 React 组件生态，我们可以像编写应用一般编写文档，不仅仅是枯燥的文字。docz 也内置了一些组件，比如<Playground>。|生成的文档界面是常规的文档界面|

react-styleguidist

https://css-tricks.com/front-end-documentation-style-guides-and-the-rise-of-mdx/
https://dev.to/giteden/6-tools-for-documenting-your-react-components-like-a-pro-1gml

1. Jest：JavaScript 测试框架，用于组件库的单元测试；Jest + Enzyme;?
2. 打包编译：提供umd/cjs/esm 规范的包(以及按需加载的两种打包方式)
   rollup
   业务组件库的打包输出则用的是 rollup
   配置简单，更小巧，默认自动开启 tree-shaking
   rollup的优缺点分别如下

   优：
   输出结果更扁平
   自动移除未引用代码
   打包结果依然完全可读
   
   缺：
   加载非ESM第三方模块比较复杂
   模块最终都被打包到一个函数中，无法实现HMR（热替换）
   浏览器环境中，代码拆分功能依赖AMD库

   开发应用 webpack 更全更常见
   开发框架类库 rollup
3. 组件按需加载
组件库的按需加载有两种思路：
   1. 多入口打包，打包成多个组件，然后借助如 babel-plugin-import 这类babel插件
   该插件可以在 Babel 配置中针对组件库进行按需加载.
   "plugins": [
     [
       "import",
       {
         "libraryName": "reactui", // 转换组件库的名字
         "libraryDirectory": "dist/components", // 转换的路径
         "camel2DashComponentName":false,  // 设置为 false 来阻止组件名称的转换
         "style":true
       }
     ]
   ]
   >import { Button } from 'reactui';

   >import { Button } from 'reactui/dist/components/Button';
   >require('reactui/dist/components/Button/style');

   开发组件库的时候组件对应的样式文件还需要放在 style 文件夹下；
   用户在使用组件库的时候还需要安装 babel-plugin-import， 并做相关 plugins 配置；

   2.  “antd 的 JS 代码默认支持基于 ES modules 的 tree shaking”
   > 什么是 tree shaking？ AST 对 JS 代码进行语法分析后得出的语法树 (Abstract Syntax Tree)。AST 语法树可以把一段 JS 代码的每一个语句都转化为树中的一个节点。DCE Dead Code Elimination，在保持代码运行结果不变的前提下，去除无用的代码。
   还有一种就是rollup打包，成js， css注入到js
8. 样式按需加载
组件库的 JS 是按需加载的，但是样式文件一般只输出一个文件，即把组件库中的所有文件打包编译成一个 index.css 文件，用户在项目中引入即可;
则每个组件的 index.tsx 文件中就需要引入对应的 SCSS(LESS) 文件：
生成的 SCSS 文件也需要打包到每个组件中，而不是生成到一个文件中：
styled-components

9. 本地调试组件库 npm link
10.  组件发布到npm
11.  CI/CD
Github + Travis CI  提供持续集成服务，用于进行项目的持续集成以及持续部署； (github)
Github + Github Actions
Gitlab + Gitlab CI/CD



工具链umi，umi的father专门是提供组件库或者工具库打包的集成工具，我们只需要更改配置文件就能轻松搭建一款自带说明文档的组件库。
https://umijs.org/zh-CN/docs  
antd pro  
farther
```
  ✔︎ 基于 docz 的文档功能
  ✔︎ 基于 rollup 和 babel 的组件打包功能
  ✔︎ 支持 TypeScript
  ✔︎ 支持 cjs、esm 和 umd 三种格式的打包
  ✔︎ esm 支持生成 mjs，直接为浏览器使用
  ✔︎ 支持用 babel 或 rollup 打包 cjs 和 esm
  ✔︎ 支持多 entry
  ✔︎ 支持 lerna
  ✔︎ 支持 css 和 less，支持开启 css modules
  ✔︎ 支持 test
  ✔︎ 支持用 prettier 和 eslint 做 pre-commit 检查
  ```
https://github.com/umijs/father

umi-plugin-library

react-simple-code-editor - 代码展示区域
prismjs - 代码高亮
raw-loader - 将源码转成字符串
react-copy-to-clipboard - 能够 copy demo 代码
react-tooltip/react-feather 辅助组件
styled-components 方便在文档示例中让用户看到样式，也用作文档组件的样式处理
plop.js: 快速创建组件模板。

