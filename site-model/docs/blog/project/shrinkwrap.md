# npm shrinkwrap

### 什么是 npm shrinkwrap？

npm shrinkwrap 是 npm 包管理器的一项功能。可以按照当前项目 node_modules 目录内的安装包情况生成稳定的版本号描述。shrinkwrap 文件的结构类似以下这种形式

```js
{
  "name": "A",
  "version": "1.1.0",
  "dependencies": {
    "B": {
      "version": "1.0.1",
      "from": "B@^1.0.0",
      "resolved": "https://registry.npmjs.org/B/-/B-1.0.1.tgz",
      "dependencies": {
        "C": {
          "version": "1.0.1",
          "from": "org/C#v1.0.1",
          "resolved": "git://github.com/org/C.git#v1.0.1"
        }
      }
    }
  }
}
```
重要的字段一个是 version（模块的版本），以及 resolved（模块的安装路径）。在工程中有 shrinkwrap 描述文件的情况下会遵循该 version 和 resolved 信息去安装

### 为什么需要它？

在没有 shrinkwrap 的项目中，任意一个依赖包都可能在开发者不知情的情况下发生改动，进而引发线上故障。

在一个 JavaScript 项目中，每次执行 npm install，最后生成的结果可能是不一样的。 譬如说现在某个项目依赖了模块 A, 虽然我们可以为它指定一个固定的版本号，然而 A 所依赖的其它模块版本使用的是 npm semver 规则（semantic version，npm 模块依赖默认遵循的规则）。它并不严格规定版本，而是选择符合当前 semver 规则的最新版本进行安装。

一个简单的例子：假如模块 A 中依赖了 B，并且在 A 的 package.json 中指定 B 的 semver 为 ~1.2.3，那么所有形式为 1.2.x 的版本都是符合规则的。当模块 B 更新了一个 1.2.x 的小版本后，项目在下次构建中就会获取到它。

semver 这样设计的初衷是使模块的开发者可以将 bugfix 等微小的改动能更便捷地到达使用方。但它的负面影响却是使每次 npm install 构建过程之间，项目内的模块内容随时可能发生改变。我们没法确定在每个模块内部，每一次小版本更新时究竟是加入了 bugfix，还是改变了 API，亦或是注入了恶意代码。

为了保证线上构建的稳定性，我们决定强制在每个 JavaScript 项目中添加 shrinkwrap。

### 对于我的项目，我需要做什么？

1. 如果项目中没有 shrinkwrap，请执行 npm shrinkwrap 命令来生成一个。第一次生成时经常会遇到错误，请看下面的 trouble-shooting 部分。
2. 尽量保持 npm 的版本是 4 或以上，这样当你在安装和更新模块时 npm 会帮你自动更新 npm-shrinkwrap.json。
就是以上这些，项目中有了 npm-shrinkwrap.json 以后，每次执行 npm 模块安装的时候就会首先遵循 npm-shrinkwrap.json 的版本来安装

### trouble-shooting
大多数错误有一个公用的解决方案——升级到 npm5，如果你执意不升级的话请往下看。

生成 npm-shrinkwrap.json 过程的中报错，大多是因为 package.json 和 node_modules 中对于模块的描述不一致（其实是不应该出现的），按照提示的信息改正即可。下面列两个最常见的错误。

extraneous: package@version
代表这个 包在 node_modules 中有，而工程中的 package.json 中没有
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190903202714432.png)

解决方法：如果你需要这个包，请添加到 package.json 中。如果你不需要它，从 node_modules 中删除即可。

invalid: package@version
代表这个 包在 node_modules 中和 package.json 中的版本不一致。

shrinkwrap 报错

解决方法：安装一个你需要的版本保证两边的统一。

另外 ykit 在 qunar 插件中也提供了 shrinkwrap 功能，比 npm 本身的规则更宽容，当然最好的办法还是升级 npm5。
