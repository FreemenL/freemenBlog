# promise 原理解析

promise 是js 异步发展至今的一个时代的产物  js的异步 经过如下历程，  事件监听  回调函数  订阅发布 

promise 是一个时下异步 的一个解决方案   其核心设计思想主要概括为以下几点

1：所涉及到的设计模式 ： 订阅发布模式（观察者模式 ） 状态模式

2 ：事件循环

promise 中的 三个状态分别为

pending   //进行中
fulfilled  //成功
rejected  //失败

状态只能从pending 转为fulfilled 或者rejected  此为promise  守护的三个状态   （状态模式）

因为涉及到异步调用 其实promise还是用的订阅发布的原理 来解决异步这一问题  

即 一个成功时的任务队列  失败时的任务队列 

私有方法  resolve 和reject 充当的角色为 改变状态 和 任务订阅 

原型方法  then 方法负责根据当前状态来进行相应的逻辑处理 

promise A+ 规范中 异步可以基于setTimeout 和process  区别就是在事件循环中所处的位置   setTimeout 在处于宏任务 process 处

于微任务中 注：（ ES6中的promise 处于微任务中 此处我们用setTimeout 方式实现 ）

具体代码如下 ：
​
```js
const PENDING = "pending"; //进行中
const FULFILLED = "fulfilled"; //成功
const REJECTED = "rejected"; //失败
function MyPromise(executor){

	let self = this; //缓存当前promise 的实例
	self.status = PENDING;
	//成功回调任务队列
	self.onResolvedCallbacks = [];
	//失败回调的任务队列。
	self.onRejectedCallbacks = [];

	//当调用此方法的时候如果promise 状态为pending 可以转成成功态
	//   如果已经是成功态或者失败态则什么都不做
	function resolve(value){
		if (value instanceof Promise) {
	      return value.then(resolve, reject)
	    }
	    setTimeout(function(){ // 异步执行所有的回调函数  
			if(self.status==PENDING){
				self.status=FULFILLED;
				self.value = value; //成功后会有一个不可变的值 
				self.onResolvedCallbacks.forEach(cb=>cb(self.value));
			}
		})
	}

	function reject(reason){
		setTimeout(function(){ // 异步执行所有的回调函数
			if(self.status==PENDING){
				self.status=REJECTED;
				self.value = reason;
				self.onRejectedCallbacks.forEach(cb=>cb(self.value));
			}
		})
	}

	try{
		//此函数可能会异常 所以需要捕获。 如果出错了 需要用reject掉当前promise
		executor(resolve,reject);
	}catch(err){
		reject(err)
	}
}

MyPromise.prototype.then = function(onFulfilled,onRejected){
	//前两句判断用来做 值的穿透。
   onFulfilled = typeof onFulfilled=="function"?onFulfilled:value=>value;
   onRejected = typeof onRejected=="function"?onRejected:reason=>{throw reason}
   let self = this;
   let promise2;
   //如果当前的promise 状态已经是陈成功态了。onFulfilled 直接值
   if(self.status===FULFILLED){
   	  return promise2 = new MyPromise(function(resolve,reject){
   	  	setTimeout(function(){ // 异步执行所有onFulfilled
	   	  	try{
	   	  		let x = onFulfilled(self.value);
	   	  		resolvePromise(promise2,x,resolve,reject)
	   	  	}catch(err){
	   	  		reject(err);
	   	  	}
	   	 })
   	  })
   }
   if(self.status === REJECTED){
   	    return promise2 = new MyPromise(function(resolve,reject){
   	    	setTimeout(function(){ // 异步执行所有onRejected
	   	  	  try{
	   	  		 let x = onRejected(self.value);
	   	  		 resolvePromise(promise2,x,resolve,reject)
	   	  	   }catch(err){
	   	  		 reject(err);
	   	  	   }
	   	  	})
   	    })
   	  
   }
   if(self.status===PENDING){
   	promise2 = new MyPromise(function(resolve,reject){
   	  self.onResolvedCallbacks.push(function(){
   	  	let x = onFulfilled(self.value);
   	  	resolvePromise(promise2,x,resolve,reject)

   	  })
   	  self.onRejectedCallbacks.push(function(){
   	  	let x = onRejected(self.value);
   	  	resolvePromise(promise2,x,resolve,reject)
   	  })
   	})
   }
}

function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) { // 对应标准2.3.1节
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) { // 对应标准2.3.2节
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    if (x.status === PENDING) {
      x.then(function(value) {
        resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else { // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) { // 2.3.3
    try {

      // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 即要判断它的类型，又要调用它，这就是两次读取
      then = x.then 
      if (typeof then === 'function') { // 2.3.3.3
        then.call(x, function rs(y) { // 2.3.3.3.1
          if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject) // 2.3.3.3.1
        }, function rj(r) { // 2.3.3.3.2
          if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return reject(r)
        })
      } else { // 2.3.3.4
        resolve(x)
      }
    } catch (e) { // 2.3.3.2
      if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true
      return reject(e)
    }
  } else { // 2.3.4
    resolve(x)
  }
}

MyPromise.deferred = MyPromise.defer = function() {
  var dfd = {}
  dfd.promise = new MyPromise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = MyPromise;
```
