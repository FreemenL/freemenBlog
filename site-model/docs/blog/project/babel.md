# babel7相关

在前端开发领域，浏览器兼容性问题来来去去，不曾消失过。除了 CSS，我们还要面对 JavaScript 的兼容性问题：你用了 JavaScript 的 A 特性，能够在 B 浏览器上正常运行，却在 C 浏览器的 D 版本上报错。

```@babel/cli```是 babel 提供的命令行工具，用于命令行下编译源代码。

这里假定我们已通过 npm init 初始化项目。
首先，在项目中安装```@babel/cli：```
```js
npm install --save-dev @babel/core @babel/cli
```
如果你用过 babel 6，可能要问，怎么不是 npm install --save-dev babel-cli？@ 符号又是什么？这是 babel 7 的一大调整，原来的 babel-xx 包统一迁移到babel 域下 - 域由 @ 符号来标识，一来便于区别官方与非官方的包，二来避免可能的包命名冲突。

现在假定我们的项目下有一个 script.js 文件，内容是：

```js
let fun = () => console.log('hello babel.js')
```

我们试试运行 npx babel script.js：

```js
$ npx babel script.js
let fun = () => console.log('hello babel.js');
```

这个调整则是在 babel 6 里发生的。Babel 6 做了大量模块化的工作，将原来集成一体的各种编译功能分离出去，独立成插件。这意味着，默认情况下，当下版本的 babel 不会编译代码。

现有如下伪代码：
```js
class classApi{
  //格式化时间 
  static formdatatime = (time)=>{
    let date = new Date(time * 1000)
    const getDoubleDigit = curr => curr < 10 ? `0${curr}` : curr;
    return `${date.getFullYear()}-${getDoubleDigit(date.getMonth() + 1)}-${getDoubleDigit(date.getDate())} ${getDoubleDigit(date.getHours())}:${getDoubleDigit(date.getMinutes())}:${getDoubleDigit(date.getSeconds())}`
  } 
  // 构造函数
  constructor(localItem){
      this.initData(localItem);
      this.initParams();
  }
  // 获取参数的具体规则
  generateParams(params){
   
  }
  // 获取参数的代理方法
  ProxyParams(key){
    
  }
  //主函数 用于生成具体的api
  main(key){
    
  }
  // 初始化数据
  initData(localItem){
    
  }
  //初始化参数 apiObject对象是需要维护的对象
  initParams(){
    
  }
  // 生成api的工厂
  generateApi(){
    
  }
}

const classApiObject = new classApi("roomData");
classApiObject.generateApi();
```

使用如下命令编译

```bash
npx babel --no-babelrc dist/classApi.js --out-dir dist --presets=@babel/preset-env --plugins=@babel/plugin-proposal-class-properties
```
--no-babelrc : 表示不使用babelrc
--out-dir  ： 指定编译输出目录
--presets ： 指定babel的预设
--plugins： 指定babel 插件

则生层如下代码
```js
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var classApi =
/*#__PURE__*/
function () {
  //格式化时间 
  // 构造函数
  function classApi(localItem) {
    _classCallCheck(this, classApi);

    this.initData(localItem);
    this.initParams();
  } // 获取参数的具体规则


  _createClass(classApi, [{
    key: "generateParams",
    value: function generateParams(params) {
 
    } // 获取参数的代理方法

  }, {
    key: "ProxyParams",
    value: function ProxyParams(key) {
      
    } //主函数 用于生成具体的api

  }, {
    key: "main",
    value: function main(key) {
     
    } // 初始化数据

  }, {
    key: "initData",
    value: function initData(localItem) {
     
    } //初始化参数  apiObject对象是需要维护的对象

  }, {
    key: "initParams",
    value: function initParams() {
      
    } // 生成api的工厂

  }, {
    key: "generateApi",
    value: function generateApi() {
      
    }
  }]);

  return classApi;
}();

_defineProperty(classApi, "formdatatime", function (time) {
  var date = new Date(time * 1000);

  var getDoubleDigit = function getDoubleDigit(curr) {
    return curr < 10 ? "0".concat(curr) : curr;
  };

  return "".concat(date.getFullYear(), "-").concat(getDoubleDigit(date.getMonth() + 1), "-").concat(getDoubleDigit(date.getDate()), " ").concat(getDoubleDigit(date.getHours()), ":").concat(getDoubleDigit(date.getMinutes()), ":").concat(getDoubleDigit(date.getSeconds()));
});

var classApiObject = new classApi("roomData");
classApiObject.generateApi();
```

### babel-polyfill 

babel-polyfill 其实包含```regenerator runtime、core-js，```如果你的代码只需要其中一部分 polyfill，那么你可以考虑直接引入 core-js 下的特定 polyfill，不必使用 babel-polyfill 这样的庞然大物。

另一种办法，是配合 @babel/preset-env 的 useBuiltIns 配置
当然你还可以引入cdn上的包



### babel-runtime
@babel/runtime 是 babel 生态里最让人困惑的一个包。而在 babel 7 下，我们还多了一个 @babel/runtime-corejs2。
我们先来看看 @babel/runtime 的 package.json 里的 description 怎么写：
> babel's modular runtime helpers

有点不知所谓。

不过从 package.json 里没有 main 字段我们可以看出，它的用法肯定不是 require('babel-runtime') 这样。

那么，babel-runtime 与 babel-polyfill 的区别究竟是什么？

我们知道，IE 11 不支持 Object.assign，此时，我们有俩种候选方案：

1. 引入 babel-polyfill，补丁一打，Object.assign 就被创造出来
2. 配置 @babel/plugin-transform-object-assign

第二种方案中，babel 会将所有的 Object.assign 替换成 _extends 这样一个辅助函数。如下所示：
```js
Object.assign({}, {})
```
编译成：
```js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

_extends({}, {});
```
问题是，如果你的项目里有 100 个文件，其中有 50 个文件里写了 Object.assign，那么，坏消息来了，_extends 辅助函数会出现 50 次。

怎么办？我们自然而然会想到把 _extends 分离出去，然后在每个文件中引入 - 这正是 @babel/runtime 的作用：
非常漂亮。可没人想要手动转换这些代码。

于是 babel 提供了 @babel/plugin-transform-runtime 来替我们做这些转换。

这样，我们不需要 babel-polyfill 也一样可以在程序中使用 Object.assign，编译后的代码最终能够正常运行在 IE 11 下。
>提问：在经过 @babel/plugin-transform-runtime 的处理后，IE 11 下现在有 Object.assign 吗？

答案是，仍然没有。

这正是 babel-polyfill 与 babel-runtime 的一大区别，前者改造目标浏览器，让你的浏览器拥有本来不支持的特性；后者改造你的代码，让你的代码能在所有目标浏览器上运行，但不改造浏览器。

如果你还是困惑，我推荐一个非常简单的区分方法 - 打开浏览器开发者工具，在 console 里执行代码：

    引入 babel-polyfill 后的 IE 11，你可以在 console 下执行 Object.assign({}, {})
    而引入 babel-runtime 后的 IE 11，仍然提示你：Object doesn't support property or method 'assign'
### babel-register
经过 babel 的编译后，我们的源代码与运行在生产下的代码是不一样的。

babel-register 则提供了动态编译。换句话说，我们的源代码能够真正运行在生产环境下，不需要 babel 编译这一环节。

我们先在项目下安装 babel-register：
```bash
$ npm install --save-dev @babel/register
```
然后在入口文件中 require
```js
require('@babel/register')
require('./app')
```
在入口文件头部引入 @babel/register 后，我们的 app 文件中即可使用任意 es2015 的特性。
当然，坏处是动态编译，导致程序在速度、性能上有所损耗

###  babel-node 
我们上面说，babel-register 提供动态编译，能够让我们的源代码真正运行在生产环境下 - 但其实不然，我们仍需要做部分调整，比如新增一个入口文件，并在该文件中 require('@babel/register')。而 babel-node 能真正做到一行源代码都不需要调整：

```bash
$ npm install --save-dev @babel/core @babel/node
$ npx babel-node app.js
```
只是，请不要在生产环境中使用 babel-node，因为它是动态编译源代码，应用启动速度非常慢。
