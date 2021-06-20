# 深入v8提供的堆栈跟踪

错误定位是开发中的一项必备的重要能力，我们来看下在前端开发中v8为我们提供的Error关键字

### Error作为函数使用

当像函数一样使用 Error 时 -- 如果没有 new，它将返回一个 Error 对象。所以， 仅仅调用 Error 将产生与通过new 关键字构造 Error 对象的输出相同。
```js
// this:
const x = Error('I was created using a function call!');
​​​​// has the same functionality as this:
const y = new Error('I was constructed via the "new" keyword!');
```

### Error 类型

除了通用的Error构造函数外，JavaScript还有6个其他类型的错误构造函数

 - EvalError
创建一个error实例，表示错误的原因：与 eval() 有关。
- InternalError 
创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多".
- RangeError
创建一个error实例，表示错误的原因：数值变量或参数超出其有效范围。
- ReferenceError
创建一个error实例，表示错误的原因：无效引用。
- SyntaxError
创建一个error实例，表示错误的原因：eval()在解析代码的过程中发生的语法错误。
- TypeError
创建一个error实例，表示错误的原因：变量或参数不属于有效类型。
- URIError
创建一个error实例，表示错误的原因：给 encodeURI()或  decodeURl()传递的参数无效。

创建V8时抛出的所有内部错误都将捕获堆栈跟踪。可以通过非标准error.stack属性从JavaScript访问此堆栈跟踪。V8还具有各种钩子，用于控制如何收集和格式化堆栈跟踪，并允许自定义错误也收集堆栈跟踪。本文档概述了V8的JavaScript堆栈跟踪API。

### 基本堆栈跟踪
默认情况下，V8引发的几乎所有错误都具有一个stack属性，该属性保存最顶层的10个堆栈帧，格式为字符串。这是一个完全格式化的堆栈跟踪的示例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019110402322456.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
#### 改变堆栈帧数
堆栈跟踪是在创建错误时收集的，并且无论在何处或抛出错误的次数都相同。我们收集10帧，因为通常它足以有用，但数量不多，会对性能产生明显的负面影响。可以通过设置变量来控制收集多少堆栈帧
```js
Error.stackTraceLimit
```
将其设置为0禁用堆栈跟踪收集。任何有限的整数值都可以用作要收集的最大帧数。设置为Infinity表示将收集所有帧。该变量仅影响当前上下文。必须为每个需要不同值的上下文显式设置它。

```注意```Error.stackTraceLimit是一个非标准的api 请勿在生产环境下使用

### 堆栈跟踪收集自定义异常
用于堆栈错误的堆栈跟踪机制是使用通用堆栈跟踪收集API来实现的，该API也可用于用户脚本
```js
Error.captureStackTrace(error, constructorOpt)
```

将堆栈属性添加到给定的error对象，该属性在调用时产生堆栈跟踪captureStackTrace。收集的堆栈跟踪信息Error.captureStackTrace将立即收集，格式化并附加到给定的error对象。

可选constructorOpt参数允许您传递函数值。收集堆栈跟踪时，对该函数最顶层调用（包括该调用）上方的所有帧均不包含在堆栈跟踪中。这对于隐藏对用户无用的实现细节很有用。定义捕获堆栈跟踪的自定义错误的通常方法是：

```js
function MyError() {
  Error.captureStackTrace(this, MyError);
  // Any other initialization goes here.
}
console.log(new MyError().stack);
```

这样将会忽略堆栈中的函数调用栈信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191104024351334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
如果需要展示函数调用栈信息的话则去掉参数中的构造函数
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191104024536795.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
### 使用场景
由于Error.captureStackTrace()可以返回调用堆栈信息，因此在自定义Error类的内部经常会使用该函数，用以在error对象上添加合理的stack属性。上文中的MyError类即是一个最简单的例子。

为了不向使用者暴露自定义Error类的内部细节，在自定义Error类内部使用captureStackTrace时，往往会传入constructorOpt参数，其值即为自定义 Error类的构造函数。具体做法有3种：

1. Error.captureStackTrace(this, MyError); 将构造函数的变量名作为constructorOpt参数传入。这一做法比较简单、直接，但不利之处也比较明显：代码所要传达的是“忽略当前构造函数及其内部的堆栈调用信息”，而以具体的构造函数作为参数传入使得这一语句缺乏通用性，不利于程序的进一步抽象。
2. Error.captureStackTrace(this, this.constructor); 通过this.constructor传入constructorOpt参数。与上一种方法相比，这一方式更具通用性。在自定义Error类中使用captureStackTrace时，推荐采用该方法```webpack的错误捕获对象 WebpackError ```就是这么干的
```js
"use strict";

const inspect = require("util").inspect.custom;

class WebpackError extends Error {
	/**
	 * Creates an instance of WebpackError.
	 * @param {string=} message error message
	 */
	constructor(message) {
		super(message);

		this.details = undefined;
		this.missing = undefined;
		this.origin = undefined;
		this.dependencies = undefined;
		this.module = undefined;

		Error.captureStackTrace(this, this.constructor);
	}

	[inspect]() {
		return this.stack + (this.details ? `\n${this.details}` : "");
	}
}

module.exports = WebpackError;
```

3. Error.captureStackTrace(this, arguments.callee);通过arguments.callee将“当前函数”作为constructorOpt参数传入。不过，由于ES5的strict模式中禁用了arguments.callee，因此不建议使用该写法。

除了自定义Error类的使用场景，在JavaScript程序中，当需要获知调用堆栈信息时，都可以通过调用Error.captureStackTrace()来实现。以往如果需要获知调用堆栈信息，一般的做法是抛出一个Error对象并立即加以捕捉，通过访问该对象的stack属性来获得调用堆栈。一个简单的例子如下

```js
try {
  throw new Error();
} catch (e) {
  // e.stack 中包含了堆栈数据，可以进行处理从而忽略不感兴趣的堆栈信息
}
```

与这种做法相比，可以很明显的看到，使用Error.captureStackTrace()会更简洁、易用，也更优雅；而这，也许就是V8中添加Error.captureStackTrace()的原因。
