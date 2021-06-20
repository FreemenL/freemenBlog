# babel 之 按需加载

babel 简单的理解他是一个语法转换器 

Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）

Babel 项目是作为一个 monorepo 来进行管理的，它由无数 npm 包组成 其中babel-core为其核心库

babel 解析代码的过程大致为

1，对输入的源代码字符串进行解析并生成初始 抽象语法树（AST）

2，对 AST 进行遍历，解析出整个树的 path，

3，遍历 AST 树并应用各个插件 生成变换后的 AST 树

4， 用 babel-generator 将 AST 输出为转码后的代码字符串



了解了这些思想后接下来我们可以参照各个 模块的文档 来开发一个我们的babel-plugin

代码如下

```js
var babel = require('babel-core');
var types = require('babel-types');

//Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

const visitor = {//访问者中 获取抽象语法树的 函数会在解析和转换时分别进入一次 
    // 对import转码
    ImportDeclaration(path, state = {opts:{}}){
        const specifiers = path.node.specifiers;
        const source = path.node.source;
        // 只有libraryName满足才会转码
        if (state.opts.libraryName == source.value && (!types.isImportDefaultSpecifier(specifiers[0])) ) { //state.opts是传进来的参数
            var declarations = specifiers.map((specifier) => {      //遍历 所又通过{ isEqual } 这种方式引入声明 
                return types.ImportDeclaration(                         //创建importImportDeclaration节点
                    [types.importDefaultSpecifier(specifier.local)],
                    types.StringLiteral(`${source.value}/${specifier.local.name}`)
                )
            })
            path.replaceWithMultiple(declarations)    //转换ast（抽象语法树）
        }
    }

};
module.exports = function (babel) {
    return {
        visitor
    };
}

```

编写好代码后 在我们的node_modules目录下 新建一个目录 babel-plugin-我们配置的plugin名字   安装好我们所需要的依赖后 需要用 'browser', 'module', 'main'其中一个字段指定我们的主入口文件 

```js
{
  "name": "babel-plugin-empty-import",
  "version": "0.0.1",
  "description": "",
  "main": "./lib/index.js",
  "dependencies": {},
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-types": "^6.26.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "freemenL",
  "license": "ISC",
  "_from": "babel-plugin-empty-import@0.0.1",
  "_resolved": "http://registry.npm.taobao.org/babel-plugin-empty-import/download/babel-plugin-empty-import-0.0.1.tgz"
}
```

接下来配置我们的babel的plugin 

```js
{
  "presets": [
    ["env", { "modules": false }],
    "react",
    "stage-0"
  ],
  plugins:[
	  ["empty-import",{
	  	"libraryName": "lodash"
	  }]
  ]
}
```

也可以将其上传到npm上  方便我们以后使用
