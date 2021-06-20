# promise.all

### promise定义：
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

### 简单使用

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

```

开发中 通常会遇到多个异步并行的情况   

情景1：（在同一个函数里面要同时调用两个不同的接口   两个接口的返回数据   做为下一步操作的依据）

<img src="https://img-blog.csdn.net/2018092611585739?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>

情景2：（一些第三方的异步api   以高德地图逆地理编码解析接口为例）

该接口每次只解析一个经纬度值 且是异步的   但我们需求是 获取到所有解析结果 一次性提交 这就涉及到多个异步并行的情况

所以在使用promise的情况下我们的代码是这样的 （typescript 可以忽略）

<img src="https://img-blog.csdn.net/20180926122308203?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>

inspectPoints 就是我们需要解析的经纬度数组 数据结构是[ {lat:22,lng:114}, {lat:22,lng:114}]   遍历该数组  返回promise 对象 解析成功的值作为该promise resolve的值  resp 就是我们所有解析地址的promise的集合   传给promise.all() 

<img src="https://img-blog.csdn.net/20180926122534354?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>
使用async函数得到 我们解析好的结果  await  后面跟的是一个promise 对象 会等待该promise 执行完成并把返回值赋值给前面的变量 

promise.all 方便了我们的开发  接下来我们来看下如何实现 一个promise.all 

<img src="https://img-blog.csdn.net/20180926123123715?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"/>

一个简单的函数实现   自己实现promise 的情况下 可以把all函数 定义在promise 的原型上 

该函数接受一个Iterator对象 作为参数  首先我们验证该参数类型  如果参数类型不对 我们直接抛出一个类型错误

promise_all 返回的也是一个promise  在其then 方法的参数中获得 异步的结果  所以我们获得到参数的length值 创建一个数组 用

一个变量 来计数异步的执行   接下来遍历我们的promise 集合  用promise.resolve 把异步的执行结果传给我们的then 函数  等待

所有异步执行完毕 我们就把保存了执行结果的数组 传给我们all方法的then函数 

