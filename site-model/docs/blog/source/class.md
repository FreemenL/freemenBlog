# ES6中 class跟普通function的区别

不知大家有没有想过这个一个问题 ？es5 中的function 可以用call apply bind 的方式 来改变他的执行上下文，但是class 却不可以 ， class 虽然本质上也是一个函数  ，但是 babel或者浏览器 在对其进行解析的时候，做了一层代理来禁止了这种行为。

我们打开[babel的官网repl](https://babeljs.io/repl) 键入如下代码

```js
class Test{
  // 静态方法
  static move(){}
  constructor(){
    // 实例属性
    this.name='name'
  }
  say(){
  	
  }
}
```

如图所示

```jsx | inline
import React from 'react';
import gif from '../../assets/babel-func.jpg';

export default () => (
  <>
    <img src={gif} width="800" />
  </>
);
```

### 分析编译后结果如下

```js
'use strict';

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    /*
      这句代码就是 class 不能被call 到别的对象上的原因
    */
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    /*
      用Object.defineProperty 给 target 添加方法
      target : object descriptor.key:string descriptor:{key: function value(){}}
    */
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Test = /*#__PURE__*/ (function() {
  /*
    添加静态方法，本质就是给构造函数添加了一个静态方法
    此处的做法是Test.move = function move(){}
    这就是为何静态方法能直接用 class 调用的原因所在
  */
  _createClass(Test, null, [
    {
      key: 'move',
      // 静态方法
      value: function move() {},
    },
  ]);
  /*
    创建构造函数
  */
  function Test() {
    _classCallCheck(this, Test);

    // 实例属性
    this.name = 'name';
  }
  /*
   定义原型方法
  */
  _createClass(Test, [
    {
      key: 'say',
      value: function say() {},
    },
  ]);

  return Test;
})();

```
