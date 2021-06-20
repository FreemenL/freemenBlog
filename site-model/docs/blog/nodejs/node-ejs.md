# ejs 模版实现原理

>with关键字通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身 比如

```js
	var obj = {
		a:1,
		b:2,
		c:3
	}
	//单调乏味的重复“obj”
	obj.a = 2;
	obj.b = 3;
	obj.c = 4;
	//简单的快捷方式
	with(obj){
	   a=3;
	   b=4;
	   c=5;
	}
```
但这实际上并不仅仅是为了方便访问对象的属性，考虑如下代码：

```js
function foo(){
	with(obj){	
		a =2;
	}
};

var o1 = {
	a:3
};

var o2 = {
	b:3
}
foo(o1);
console.log(o1.a)//2 

foo(o2);
console.log(o2.a)// undefined
console.log(a) //2  不好，a被泄露到全局作用域上了
```

这个例子中创建了o1和o2 两个对象。其中一个具有a属性，另外一个没有。foo(..)函数接受一个obj参数。该参数是一个对象的引用，并对这个对象执行了 with(obj){..} 。我们的代码看起来只是对变量a 进行简单的词法引用，实际上就是一个```LHS 引用```，并将2赋值给他。

当我们将o1传进去, a =2 赋值操作找到了o1.a 并将2 赋值给他。 而当o2传进去他并没有a属性，因此不会创建这个属性，	o2.a保持undefined但是可以看到一个奇怪的现象就是，实际上a=2的赋值操作创建了一个全局的变量a； 
这是```with```的一些坑 还有一些性能上特性 可以参考《你不知道的jacascript》中第二章部分的详述。
我们这里利用with的这一语法特性 配合正则来实现ejs模版的功能

```js
let str = `
<%if(user){%>
   hello <%=user.name%>
<%}else{%>
   hello guest
<%}%>
<ul>
<%for(let i=0;i<total;i++){%>
  <li><%=i%></li>
<%}%>
</ul>
`;
//它的原理就是拼出一段函数体代码，然后把options做为作用域变量提供属性
let options = { user: { name: 'test' }, total: 10 };
function render(str, options, callback) {
    let head = "let template = ``;\nwith (options) {\n template+=`";
    str = str.replace(/<%=([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "}";
    });
    str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return "`;\n" + arguments[1] + "\n;template+=`";
    });
    let tail = "`}\n return template; ";
    let html = head + str + tail;
    let fn = new Function('options', html);
    let result = fn(options);
    return result;
}
let result = render(str, options);//hello test
```
