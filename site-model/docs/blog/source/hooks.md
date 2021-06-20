# webpack之tapable库中hooks

剧透下我们的插件 [empty-webpack-build-detail-plugin](https://github.com/FreemenL/empty-webpack-build-detail-plugin) 友好的展示编译输出 ，如果您觉得好用 ，可以给个star 

Webpack本质上是一种串行事件流的机制，它的工作流程就是将各个插件串联起来，实现这一切的核心就是Tapable，

webpack中最核心的负责编译的Compiler和负责创建bundle的Compilation都是Tapable的实例

### compiler 对象
compiler 对象是 webpack 的编译器对象，webpack 的核心就是编译器，
compiler 对象会在启动 webpack 的时候被一次性的初始化，
compiler 对象中包含了所有 webpack 可自定义操作的配置，
例如 loader 的配置，plugin 的配置，entry 的配置等各种原始 webpack 配置等，
在 webpack 插件中的自定义子编译流程中，我们肯定会用到 compiler 对象中的相关配置信息，
我们相当于可以通过 compiler 对象拿到 webpack 的主环境所有的信息。


### compilation 对象

compilation 对象负责生成编译资源

compilation 实例继承于 compiler，
compilation 对象代表了一次单一的版本 webpack 构建和生成编译资源的过程。
当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，
从而生成一组新的编译资源以及新的 compilation 对象。
一个 compilation 对象包含了 当前的模块资源、编译生成资源、变化的文件、以及 被跟踪依赖的状态信息。
编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

### 简单的流程图

<img src="https://img-blog.csdnimg.cn/20190107110801568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70"/>


tapable 为webpack 中的核心库  负责控制各插件在 webpack 事件流上运行

tapable包暴露了许多Hook类，可用于为插件创建钩子

各钩子的核心思想其实就是我们常见的订阅发布模式的一种应用

我们来看几个hook的实现

### SyncHook
```js
class SyncHook{
	constructor(){
		this.hooks = [] //任务队列
	}
	tap(name,fn){  //订阅者
		this.hooks.push(fn)
	}
	call(...arg){ //发布者
		this.hooks.forEach((item)=>item(...arg))
	}
}

let queue = new SyncHook(["name"]);

queue.tap("1",function(name){
		console.log(1,name);
})
queue.tap("2",function(name){
		console.log(2,name);
})
queue.tap("3",function(name){
		console.log(3,name);
})
queue.call("test",()=>{
   console.log("end")
})

```

### AsyncSeriesHook

```js

class AsyncSeriesHook{
	constructor(){
		this.hooks = []
	}
	tapAsync(name,fn){
		this.hooks.push(fn)
	}
	callAsync(...arg){
		let num = 0
		let done = arg[arg.length-1];
		let name = arg[0];
		let that = this;
		function next(){// 把当前函数传给钩子的回调 递归调用 就是这个钩子的核心 
			that.hooks[num]?that.hooks[num](name,next):done();
			num++;
		}
		next();
	}
}
let queue = new AsyncSeriesHook(["name"]);
console.time("start")
queue.tapAsync("1",function(name,cb){
	setTimeout(function(){
		console.log(1,name);
		cb();
	},1000)
})
queue.tapAsync("2",function(name,cb){
	setTimeout(function(){
		console.log(2,name);
		cb();
	},2000)
})
queue.tapAsync("3",function(name,cb){
	setTimeout(function(){
		console.log(3,name);
		cb();
	},3000)
})

queue.callAsync("test",()=>{
   console.timeEnd("start")
})

注册钩子：

const { Tapable ,SyncHook } = require("tapable");

let t = new Tapable();

t.hooks = {
	myhook:new SyncHook()
}

let called = 0;

t.hooks.myhook.tap("myhook",()=>called++);
t.hooks.myhook.call();

t.hooks.myhook.tap("myhook",()=>called+=10);
t.hooks.myhook.call();

console.log(called);

```
