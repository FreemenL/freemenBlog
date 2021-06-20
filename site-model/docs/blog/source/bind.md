# js中 bind 函数的原理

```js
/**
* bind 函数在js中的应用
*/
this.name = "test";
let testObj = {
	name:'zhangsan',
	introduce:function(){
		return this.name;
	}
}
let test = {
	name:"lisi"
}
let test1 = {
	name:"wangwu"
}
let fn = testObj.introduce;
console.log(fn());//test   
console.log(fn.bind(test)());//lisi
console.log(fn.bind(test1)());//王五
console.log(fn());//test 注：不存在永久改变this指向的说法  
 
 
/**
	*bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。这些参数（如果有的话）作为bind()的第二个参数             跟在this（或其他对象）后面，之后它们会被插入到
	*目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。
*/
function list() {
  return Array.prototype.slice.call(arguments);
}
 
 
var list1 = list(1, 2, 3); // [1, 2, 3]
 
 
var leadingThirtysevenList = list.bind(undefined, 37,21);
 
 
var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37,21, 1, 2, 3]
var list4 = leadingThirtysevenList(1, 2, 3, 4); // [37,21, 1, 2, 3,4]
 
/**
* 来看es6中的函数初始值 
*/
function EsArguments(name='zhangsan'){
	console.log(name);
}
EsArguments();//zhangsan
EsArguments("lisi");//lisi
 
 
/**
* 在自定义对象中的应用  demo 
* 跟es6中函数的初始值的区别在于不会覆盖原始值 
*/
function testBind(){
	this.cacheArgs = this.transformArgs.bind(undefined,...arguments);
};
testBind.prototype.transformArgs = function(){
	return Array.prototype.slice.call(arguments);
}
testBind.prototype.showArgList = function(){
	return this.cacheArgs(...arguments);
}
 let Test = new testBind(1,2,3); 
 console.log(Test.showArgList(13,14));
 console.log(Test.showArgList(5,21));
 
 
/* bind和call apply的区别在于不会立即调用 原因在于 bind() 函数会创建一个新函数（称为绑定函数），
* 新函数与被调函数（绑定函数的目标函数）具有相同的函数体。
* bind一般用在异步调用和事件
* ->下面看bind函数的原生实现方式 
*/
Function.prototype.bind = function() {
        var self = this, // 保存原函数执行上下文中的this指向 
        context = Array.prototype.shift.call(arguments), // 需要绑定的this上下文
        args = Array.prototype.slice.call(arguments); // 剩余的参数转成数组
        return function() { //返回一个新函数
        // 执行新函数时，将传入的上下文context作为新函数的this
        // 并且组合两次分别传入的参数，作为新函数的参数
		return self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments))); 
      }
};

/** bind 官方文档解释
* 语法
* fun.bind(thisArg[, arg1[, arg2[, ...]]])
* 参数thisArg
* 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参
                    数 无 效。 (注：原因在于new操作会创建一个空对象)
* arg1, arg2, ...
* 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。
* 返回值
                 * 返回由指定的this值和初始化参数改造的原函数拷贝
*/
 
/**
  * bind函数在setTimeout中的应用
*/
let testBingMethod = {
	name:'123',
	test:function(){
		console.log(this.name);
},
showList:function(){
	setTimeout(this.test.bind(this),1000);
  //第一个this为当前对象执行上文的this 
  //第二个this为setTimeout函数的this指向即window对象
	}
}
testBingMethod.showList()
/**
  bind作为构造函数使用的绑定函数自然而然地，绑定函数适用于用new操作符 new 去构造一个由目标函数创建 的新的实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。然而, 原先提供的那些参数仍然会被前置到构造函数调用的前面。 <---原因在于new操作会创建一个空对象-->
  */
function Point(x, y) {
  this.x = x;
  this.y = y;
}
 
 
Point.prototype.toString = function() { 
  return this.x + ',' + this.y; 
};
 
 
var p = new Point(1, 2);
p.toString(); // '1,2'
 
 
// 以下这行代码在 polyfill 不支持,polyfill下必须指向一个新的对象 
// 在原生的bind方法运行没问题: 
var YAxisPoint = Point.bind(null, 0/*x*/);
var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'
 
 
/**
* bind 的快捷调用: 你可以用 Array.prototype.slice 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以创建这样一个捷径：
*/

function testFn(){
	var slice = Array.prototype.slice;
	slice.apply(arguments);
 
	/* 用 bind()可以使这个过程变得简单。在下面这段代码里面，slice 是 Function.prototype 的 apply() 方
	法的绑定函数，并且将 Array.prototype 的slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply()调用了。
	*/ 
	var unboundSlice = Array.prototype.slice;
	var slice = Function.prototype.apply.bind(unboundSlice);
	slice(arguments);
}

```
