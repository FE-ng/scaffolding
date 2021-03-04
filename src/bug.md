<!--
 * @Author: your name
 * @Date: 2020-11-18 10:44:05
 * @LastEditTime: 2021-03-04 16:41:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scaffolding/src/bug.md
-->
1. react 中两个相同的组件使用了相同的 key 会导致删除时有着预期之外的问题
2. key 值 card 上使用时会导致输入框输入失焦点
3. button 和 ajax 混用会引起 request 请求中途取消;
4. ios 输入框问题 当 UI 的需求是输入组件位于页面底部,当 focus 时将输入组件顶起尽量不要使时;尽量不要使用 fixed 或者 abselute 布局 否则 ios 的输入框不同的版本都会出现不同情况的 bug;并且使用 scrolIntoView()此类处理函数也不会正常的执行;
5. React-router-dom V4 的版本进行路由跳转时，push（{pathname}）的方法不可取，可能会导致路由改变而组件不该更新；api 使用的案例也没有推荐该用法，进入到源码中会发现 v4 版本在进行 pathname 处理 pathname 的时候会使用正则去批评判断是否有 search 的参数，然后自动分割；但是有时可能匹配有一定的问题所以路由不正常跳转；因此建议使用路由跳转时严格按照组件 api 的案例；

"editor.autoIndent": "none",

会导致回车不自动加缩进
进行代码合并时发现merge了一个错误的分支，然后又merge了正确的分支并且也进行了提交，导致一个分支上有了两个分支的所有信息提交；
由于是自己的开发分支本质上应该不会有别人使用因此可以采取git reset –hard 然后force push进行覆盖性提交；或者另外拉一个新的分支；
但假设是大家都会使用的分支这种方式显然不行，会导致分支错乱；对此应该使用 git revert -m进行回滚用一个提交去覆盖之前的merge提交；

overscroll-behavior滚动阻止演示实例页面

git 怎么优雅的合并uat或者线上的bug



undefined这个值在非严格模式下会被重新赋值，使用void 0必定返回真正的 undefined。

// 模板字符串中的注释也会被传递 也就会改变
/* transform: rotateZ(${(props: { angel: number }) => props.angel}deg); */

npm install -g tldr

tldr 学习linux命令的cli工具


array.at(index)
Array.prototype.at = function(index) {
  if (!Array.isArray(this)) return;
  const idx = index >= 0 ? index : this.length + index;
  return idx;
}

-webkit-box-reflect


# 知识点
1. pb的定义以及使用
2. https://developers.google.com/protocol-buffers/docs/proto3
- protobuf 概念和使用
- 动态pb的接收和处理,即对方将会发送pb文件我们需要先接收并且处理,通过本地的唯一静态pb处理经过原理中的pb构造器去完成动态的pb文件的构建,完成后再去反序列化二进制数据从而拿到真实的数据

1. - websocket的原理、应用以及传递的数据帧的概念

- 几乎在前端不会涉及到的二进制类型以及其在前端的应用,例如arraybuffer等
- blob流类型和二进制类型的之间的相互转化

- 需要使用到地图组件,以及地图组件对应的mark和区域改变等功能
- 地理围栏的处理
- 组合动画的使用
- styled-component的使用和优化
- 对于视频流的理解

- MSE直播方案及其原理
- video和MSE方案的联系以及使用,**video的切换和布局**
- 大屏的视频
- 后期需要注意
- 视频处理


随机生成16位数字字母的[0-9a-zA-Z]方法

``` javascript

new Array(16).join()
    .replace(/(.|$)/g, () => (~~(Math.random() * 36))
    .toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']());

```