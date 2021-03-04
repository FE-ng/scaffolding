<!--
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 -->

<!--
 * @Author: your name
 * @Date: 2021-03-04 16:40:00
 * @LastEditTime: 2021-03-04 16:40:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scaffolding/src/pb.md
-->



# Protocol Buffer(protobuf)
Protocol Buffer是Google提供的一种数据序列化协议, 可以将数据序列化为二进制也可以反序列化:
> Protocol Buffers are a language-neutral, platform-neutral, 
extensible way of serializing structured data for use in communications protocols,
 data storage, and more, originally designed at Google


> Protocol Buffers 是一种轻便高效并且和语言、平台无关、可扩展的序列化结构数据格式,很适合作为数据存储或者通信交互的格式。

## 序列化
是将对象的状态信息转换为可以存储或传输的形式的过程，前端接触最多的就是JSON序列化的api；如下
``` javascript
const obj = { message: "Hello World!" };
const str = JSON.stringify(obj);
const res = JSON.parse(str);
```

## 二进制
``` javascript
// node
const buf = Buffer.from("Hello World!");
console.log(buf);
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
```
## How fast ?

从官方的测试数科院看到一条消息数据，用protobuf序列化后的大小是json的10分之一，只有xml格式的20分之一，但是性能却是它们的5~100倍!
这是飞一样的感觉~~这也就是为什么我们要了解它的原因,万一哪天用到了呢😼;快的原因这里不去深究,感兴趣的同学可以从文献中参考一二;
 proto3 中导入 proto2 定义的消息类型，反之亦然。然而，proto2 中的枚举不能直接用在 proto3 语法中（但导入到 proto2 中 proto3 定义的枚举是可用的）。

## 定义
proto3 比 proto2 支持更多语言却更加简洁。去除了一些复杂的语法和特性，更强调约定而弱化语法,所以我们基于proto3进行示例;
``` 
  syntax = "proto3”;
  // 指定proto版本，默认为proto2，并且该声明必须是第一行

  package testProto;
  // 命名空间

  message MyMessage {
      string Name = 1;
      float age = 2;
      bytes msg = 3;
  }


```
syntax = "proto3”;指定proto版本，默认为proto2，并且在proto文件中必须是第一行
proto文件是可以相互引用的 因此 package 可以给文件一个的命名空间 防止消息类型之间的名称冲突
message 消息类型,前端理解成一个interface会事半功倍;
消息类型中的定义都遵循 `[keywords?] [type] [custom_key] = [tag]`
1. keywords: 
   - singular 格式正确的消息可以有 0 个或 1 个该字段(但不能多于 1 个)。proto3 语法的默认字段规则；
   - repeated 格式正确的消息中该字段可以重复任意次数（包括 0 次）。重复值的顺序将被保留；
   - reserved 在使用彻底删除或注释掉某个字段的方式来更新消息类型时，将来其他用户再更新该消息类型时可能会重用这个字段编号。后面再加载该 .ptoto 的旧版本时会如数据损坏，隐私漏洞等问题。防止该问题发生的办法是将需要删除字段的编号（或字段名称，字段名称会导致在 JSON 序列化时产生问题）设置为保留项 reserved；
2. type: 
   - 数据中自己定义的message(理解成interface可以被嵌套使用)；
   - type类型对应表中的值(和定义interface时的类型声明类似)；
3. custom_key: 自己定义的key键；
4. tag: proto文件中对我们custom_key键的描述,或者理解成react组件中的唯一key值；
   >tag用于在消息二进制格式中标识字段，同时要求消息一旦使用字段编号就不应该改变。
   另外 1 到 15 的字段编号需要用 1 个字节来编码，编码同时包括tag本身的值和以及该tag对应的type。
   16 到 2047 的字段编号需要用 2 个字节。
   因此应将 1 到 15 的编号用在消息的常用字段上。注意应该为将来可能添加的常用字段预留字段编号。
   最小的字段编号为 1，最大的为 2^29 - 1(536,870,911)。
   注意不能使用 19000 到 19999 （FieldDescriptor::kFirstReservedNumber 到 FieldDescriptor::kLastReservedNumber）的字段编号，因为这些是 protocol buffer 内部保留的
   如果使用了这些预留的编号 或者之前用户自己保留的字段(reserved)protocol buffer 编译器会发出警告。

此外pb还支持嵌套,枚举,定义map(map<key_type, value_type> map_field = N);

## type类型对应表格
| .proto Type | Notes | C++ Type | Java Type | Python Type[2] | Go Type | Ruby Type | C# Type | PHP Type | Dart Type | 
| :---------- | :----------------------------------------------------------- | :------- | :--------- | :------------- | :------ | :----------------------------- | :--------- | :---------------- | :-------- | 
| double | | double | double | float | float64 | Float | double | float | double | 
| float | | float | float | float | float32 | Float | float | float | double |
| int32 | 使用可变长度编码。编码负数的效率低 - 如果您的字段可能有负值，请改用sint32。 ||int32 | int | int | int32 | Fixnum or Bignum (as required) | int | integer | int | 
| int64 | 使用可变长度编码。编码负数的效率低 - 如果您的字段可能有负值，请改用sint64。 | int64 | long | int/long[3] | int64 | Bignum | long | integer/string[5] | Int64 |
| uint32 | 使用可变长度编码 | uint32 | int | int/long | uint32 | Fixnum or Bignum (as required) | uint | integer | int | 
| uint64 | 使用可变长度编码. | uint64 | long | int/long | uint64 | Bignum | ulong | integer/string[5] | Int64 |
| sint32 | 使用可变长度编码。签名的int值。这些比常规int32更有效地编码负数。 | int32 | int | int | int32 | Fixnum or Bignum (as required) | int | integer | int | 
| sint64 | 使用可变长度编码。签名的int值。这些比常规int64更有效地编码负数。 | int64 | long | int/long | int64 | Bignum | long | integer/string[5] | Int64 | 
| fixed32 | 总是四个字节。如果值通常大于228，则比uint32更有效。 | uint32 | int | int/long | uint32 | Fixnum or Bignum (as required) | uint | integer | int |
| fixed64 | 总是八个字节。如果值通常大于256，则比uint64更有效 | uint64 | long | int/long[3] | uint64 | Bignum | ulong | integer/string[5] | Int64 | 
| sfixed32 | 总是四个字节 | int32 | int | int | int32 | Fixnum or Bignum (as required) | int | integer | int | 
| sfixed64 |总是八个字节 | int64 | long | int/long | int64 | Bignum | long | integer/string[5] | Int64 | 
| bool | | bool | boolean | bool | bool | TrueClass/FalseClass | bool | boolean | bool | 
| string | 字符串必须始终包含UTF-8编码或7位ASCII文本，且不能超过232。 | string | String | str/unicode | string | String (UTF-8) | string | string | String |
| bytes | 可以包含不超过232的任意字节序列。 | string | ByteString | str | []byte | String (ASCII-8BIT) | ByteString | string | List |

## 选择一个好的工具
- [protobuf.js](https://github.com/protobufjs/protobuf.js)
- [Google protobuf js](https://github.com/protocolbuffers/protobuf/tree/master/js)
- [protocol-buffers](https://github.com/mafintosh/protocol-buffers)

从使用者的数量和文档完善程度以及protobuf.js能够直接读取proto文件考虑
本次的示例是选择protobuf.js 当然大家感兴趣也能去选择别的工具.


## talk is cheap show me your code!

### 前端使用
前端无法处理proto类型的文件，因此需要使用 protobuf.js 工具库
安装之后在./node_modules/protobufjs/bin/pbjs文件目录里提供了pbjs命令
不过命令藏得很深 并且没有设置alias 所以推荐使用npx;

    npx pbjs -t json *.proto > *.json 
    将proto转化成json

    npx pbjs -t json-module -w commonjs -o *.js  *.proto
    将proto转化成js

    这里推荐转化成js因为转成json也得用内置的api(本质还是转成了js)转化之后才能获得需要的数据；
  proto文件转成的json文件
  ```json
  {
    "nested": {
      "testProto": {
        "nested": {
          "MyMessage": {
            "fields": {
              "Name": {
                "type": "string",
                "id": 1
              },
              "age": {
                "type": "float",
                "id": 2
              },
              "msg": {
                "type": "bytes",
                "id": 3
              }
            }
          }
        }
      }
    }
  }
  ```
  proto文件转成的js文件
  ```js
  /*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  testProto: {
    nested: {
      MyMessage: {
        fields: {
          Name: {
            type: "string",
            id: 1
          },
          age: {
            type: "float",
            id: 2
          },
          msg: {
            type: "bytes",
            id: 3
          }
        }
      }
    }
  }
});

module.exports = $root;

```
### 浏览器中的使用
```js
// 导入生成的testPb文件
import testPb from './test';
// 收到数据进行处理
 ws.addEventListener('message', (e) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(e.data);
  reader.addEventListener('loadend', () => {
    const { result } = reader;
    console.log(result);
    
    if (!result || typeof result === 'string') return;
    // 如果引用的是json文件则还需要使用rotobufJs.Root.fromJSON进行一次转化
    // const protoFileDesRoot = protobufJs.Root.fromJSON(testPb);

    // lookupType即获取消息体中的message定义
    const pbMessage = testPb.lookupType('testProto.MyMessage');
    console.log(pbMessage);
    // 将arrayBuffer转成Uint8Array, decode函数的传参要求
    const viewBuffer = new Uint8Array(result);
    const data = pbMessage.decode(viewBuffer);
    console.log(data);
  });
});

```

### node中的使用
有部分资料还是说在node环境中也需要像浏览器环境一样把proto文件进行处理再使用,但是protobufjs的库能够让我们直接在node环境中使用pb文件不需要额外的处理;
```js
const protoBuf = require('protobufjs');

protoBuf.load('./web/test.proto', (err, root) => {
    if (err) throw err;
    // Obtain a message type
    const pbMessage = root.lookupType('testProto.MyMessage');
    console.log('pbMessage', pbMessage);
    // mock数据
    const payload = { Name: 'tony', age: 18, msg: Buffer.from('tall rich handsome') };

    // 验证数据合法性
    const errMsg = pbMessage.verify(payload);
    if (errMsg) throw new Error(errMsg);

    // 创建消息体
    const message = pbMessage.create(payload);
    console.log('message', message);

    // 把消息体编码成 Uint8Array (browser) or Buffer (node)
    const buffer = pbMessage.encode(message).finish();
    console.log('buffer', buffer);

    // 把消息体解码成 Uint8Array (browser) or Buffer (node)
    const data = pbMessage.decode(buffer);
    // ... do something with data
    console.log(`Name:${data.Name}`);
    console.log(`age:${data.age}`);
    console.log(`msg:${data.msg}`);
  });
```
node输出
```js
pbMessage: Type {
  options: undefined,
  parsedOptions: null,
  name: 'MyMessage',
  parent: Namespace {
    options: undefined,
    parsedOptions: null,
    name: 'testProto',
    parent: Root {
      options: undefined,
      parsedOptions: null,
      name: '',
      parent: null,
      resolved: false,
      comment: null,
      filename: null,
      nested: [Object],
      _nestedArray: null,
      deferred: [],
      files: [Array]
    },
    resolved: false,
    comment: null,
    filename: null,
    nested: { MyMessage: [Circular] },
    _nestedArray: null,
    MyMessage: [Circular]
  },
  resolved: false,
  comment: null,
  filename: 'web/test.proto',
  nested: undefined,
  _nestedArray: [],
  fields: {
    Name: Field {
      options: undefined,
      parsedOptions: null,
      name: 'Name',
      parent: [Circular],
      resolved: false,
      comment: null,
      filename: 'web/test.proto',
      rule: undefined,
      type: 'string',
      id: 1,
      extend: undefined,
      required: false,
      optional: true,
      repeated: false,
      map: false,
      message: [Circular],
      partOf: null,
      typeDefault: null,
      defaultValue: null,
      long: false,
      bytes: false,
      resolvedType: null,
      extensionField: null,
      declaringField: null,
      _packed: null
    },
    age: Field {
      options: undefined,
      parsedOptions: null,
      name: 'age',
      parent: [Circular],
      resolved: false,
      comment: null,
      filename: 'web/test.proto',
      rule: undefined,
      type: 'float',
      id: 2,
      extend: undefined,
      required: false,
      optional: true,
      repeated: false,
      map: false,
      message: [Circular],
      partOf: null,
      typeDefault: null,
      defaultValue: null,
      long: false,
      bytes: false,
      resolvedType: null,
      extensionField: null,
      declaringField: null,
      _packed: null
    },
    msg: Field {
      options: undefined,
      parsedOptions: null,
      name: 'msg',
      parent: [Circular],
      resolved: false,
      comment: null,
      filename: 'web/test.proto',
      rule: undefined,
      type: 'bytes',
      id: 3,
      extend: undefined,
      required: false,
      optional: true,
      repeated: false,
      map: false,
      message: [Circular],
      partOf: null,
      typeDefault: null,
      defaultValue: null,
      long: false,
      bytes: true,
      resolvedType: null,
      extensionField: null,
      declaringField: null,
      _packed: null
    }
  },
  oneofs: undefined,
  extensions: undefined,
  reserved: undefined,
  group: undefined,
  _fieldsById: null,
  _fieldsArray: null,
  _oneofsArray: null,
  _ctor: null
}
message: MyMessage {
  Name: 'tony',
  age: 18,
  msg: <Buffer 74 61 6c 6c 20 72 69 63 68 20 68 61 6e 64 73 6f 6d 65>
}

buffer: <Buffer 0a 04 74 6f 6e 79 15 00 00 90 41 1a 12 74 61 6c 6c 20 72 69 63 68 20 68 61 6e 64 73 6f 6d 65>

  Name:tony
  age:18
  msg:tall rich handsome

```


### 结语
选择什么方案都是结合当前自己的需求来判别,protobuf虽然在资源上的占比传输上都很优秀,但是在当前没有性能上的追求时也不用刻意去追去,比较protobuf的传输都建立在二进制上,要真有数据上的问题调试起来非常困难,并且都得维护同一份proto定义,维护的成本也得考虑
不过维护的处理方式有后端传一个proto文件来,即动态pb,这样的处理也就根据麻烦了,因此因地制宜才是上策;

### 参考文献
- https://developers.google.com/protocol-buffers/docs/proto3
- https://www.deadalnix.me/2017/01/08/variable-size-integer-encoding/
- https://zhuanlan.zhihu.com/p/73549334
- https://www.jianshu.com/p/72108f0aefca
















