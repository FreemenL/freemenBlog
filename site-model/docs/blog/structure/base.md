# 时间复杂度和大O表示法

每一个优秀的开发者脑中都有时间概念。他们想给用户更多的时间让用户做他们想做的事情。他们通过最小化时间复杂度来实现这一目的。

在你能理解程序的时间复杂度之前，你需要了解最常使用它的地方：算法设计。
## 所以究竟什么是算法？
简单来说，算法就是一系列被控制的步骤，你通过按序执行这些步骤可以实现一些目标或者产生一些输出。让我们以你祖母烘烤蛋糕的菜单为例子。等等，这也可以算作算法？当然算！

```js
function 烘烤蛋糕(风味, 加冰){

"
 1. 烤箱预热到350度（华氏）
 2. 混合面粉、酵母粉、盐
 3. 打发黄油和糖直到蓬松

 4. 添加鸡蛋
 5. 将黄油和鸡蛋混到面粉中
 6. 添加牛奶和 " + 风味 + "
"
}
BakeCake('香草味', 要加冰) => 美味
```
算法在检查时间复杂度时非常有用，因为它可以以各种形态和大小出现。
就犹如你可以用100中不同的方式来切开一个派一样，你可以用多种不同的算法来解决同一个问题。有的解决方法效率更高，比其他的方法需要更少的时间和更少的空间。
所以问题就是：我们怎么分析确认哪一个算法效率最高？
数学！程序的时间复杂度分析仅是一个极其简单的数学方法，这种方法就是分析一个算法对于给定数量的输入需要多长时间来完成任务。这通常定义为大O表示法。

你会问，什么是大 O 表示法？
如果你答应不会放弃并且继续阅读，我会告诉你。
大O表示法就是将算法的所有步骤转换为代数项，然后排除不会对问题的整体复杂度产生较大影响的较低阶常数和系数。
数学家可能会对我的“整体影响”假设有点沮丧，但是开发人员为了节省时间，这种方式更容易简化问题：

```js
规律       Big-O

2             O(1)   --> 就是一个常数

2n + 10       O(n)   --> n 对整体结果会产生最大影响

5n^2         O(n^2) --> n^2 具有最大影响

```
简而言之，这个例子所要表达的就是：我们只关注表达式中对表达式最终结果会产生最大影响的因子。（当常数非常大而n很小的时候并不是这样的，但是我们现在不要担心这种情况）。

下面是一些常用的时间复杂度以及简单的定义。更完整的定义可以翻阅维基百科。
* O(1)— **常量时间：给定一个大小为n的输入，概算法只需要一步就可以完成任务。
* O(log n)— **对数时间：给定大小为n的输入，该算法每执行一步，它完成任务所需要的步骤数目会以一定的因子减少。
* O(n)— **线性时间：给定大小为n的输入，该算法完成任务所需要的步骤直接和n相关（1对1的关系）。
* O(n²)—二次方时间：给定大小为n的输入，完成任务所需要的步骤是n的平方。
* O(C^n)— **指数时间：给定大小为n的输入，完成任务所需要的步骤是一个常数的n次方（非常大的数字）。

有了这些概念，我们一起来看看每一个复杂度完成任务所需要的步骤数：

```js
let n = 16;

O (1) = 1 step "(awesome!)"

O (log n) = 4 steps "(awesome!)" -- assumed base 2

O (n) = 16 steps "(pretty good!)"
O(n^2) = 256 steps "(uhh..we can work with this?)"
O(2^n) = 65,536 steps "(...)"
```
如你所见，随着算法复杂度的提高，事情的复杂度也会以数量级增长。幸运的是，计算机足够强悍能够相对快速的处理非常复杂的问题。
所以我们怎样使用大O表示法来分析我们的代码？
这里有一些简便的例子向你展示怎么将这些知识运用到已有的或者你自己写的代码。
在我们的例子中将使用如下的数据结构：

```js
var friends = {

 'Mark' : true,
 'Amy' : true,
 'Carl' : false,
 'Ray' : true,
'Laura' : false,
}
var sortedAges = [22, 24, 27, 29, 31]
```
## O(1)— 常量时间
当你知道key（objects）或者index（arrays）时进行查找只需要一步就可以完成，所用时间就是一个常量。
```js
//If I know the persons name, I only have to take one step to check:

function isFriend(name){ //similar to knowing the index in an Array 
 return friends[name]; 
};
isFriend('Mark') // returns True and only took one step
function add(num1,num2){ // I have two numbers, takes one step to return the value
 return num1 + num2
}
```
## O (log n)— 对数时间
如果你知道在一个数组的哪一侧进行查找一个指定值时，你可以排除掉另外一半进而节约时间。
```js
//You decrease the amount of work you have to do with each step

function thisOld(num, array){
 var midPoint = Math.floor( array.length /2 );
 if( array[midPoint] === num) return true;
 if( array[midPoint] < num ) --> only look at second half of the array
 if( array[midpoint] > num ) --> only look at first half of the array
 //recursively repeat until you arrive at your solution
}
thisOld(29, sortedAges) // returns true 
//Notes
 //There are a bunch of other checks that should go into this example for it to be truly functional, but not necessary for this explanation.
 //This solution works because our Array is sorted
 //Recursive solutions are often logarithmic
 //We'll get into recursion in another post!
 //The number of steps you take is directly correlated to the your input size
function addAges(array){
var sum = 0;
for (let i=0 ; i < array.length; i++){ //has to go through each value
sum += array[i]
}
return sum;
}
addAges(sortedAges) //133
```


### O(n²)— 二次方时间
for循环嵌套的复杂度就是二次方的，因为你在一个线性操作里执行另外一个线性操作（或者说： n*n =n² ）
```js
//The number of steps you take is your input size squared

function addedAges(array){
 var addedAge = [];
   for (let i=0 ; i < array.length; i++){ //has to go through each value
     for(let j=i+1 ; j < array.length ; j++){ //and go through them again
       addedAge.push(array[i] + array[j]);
     }
   }
 return addedAge;
}
addedAges(sortedAges); //[ 46, 49, 51, 53, 51, 53, 55, 56, 58, 60 ]
//Notes
 //Nested for loops. If one for loop is linear time (n)
 //Then two nested for loops are (n * n) or (n^2) Quadratic!
```


### 基础算法

>题目一：把一个二维数组展开为一个一维数组      ` *`
> let arrs = [[1,2,3,4],[5,6,7,8]];
> 展开为[1,2,3,4,5,6,7,8];

```javascript
	let arrs = [[1,2,3,4],[5,6,7,8]];
	console.log(Array.prototype.concat.call(...arrs));
	//[1,2,3,4,5,6,7,8]
```

>题目二：多维数组降维度                    ` *`
>let arrs = [1,[1],[1,[1,2,3,[4,5,6]]]];
>展开为[1,1,1,1,2,3,4,5,6]

```js
let arrs = [1,[1],[1,[1,2,3,[4,5,6]]]];
const flatten = (arr) => {
    return Array.prototype.concat.call([],
          ...arr.map((a)=>Array.isArray(a)?flatten(a):a)
     );
}
```

```js
//依赖语言特性的写法
const flatten = (arr) => {
    return eval(`[${arr}]`);
}
```

>题目三：函数截流      ` *`

```js
window.addEventListener('resize',throttle(function(){
   console.log(1);
}));

function throttle(fn,delay=300){
   let lock = false;
   return (...args)=>{
      if( lock === true ){return void 0};
      fn(args);
      lock = true;
      setTimeout(function(){ lock = false },delay);
   }
}
```

> 题目三：防抖  ` *`

```js
window.addEventListener('resize',throttle(function(){
        console.log(1);
}));

function throttle(fn,delay=300,I=null){
    let func = fn;
    return (...args)=>{
        clearTimeout(I);
        I = setTimeout(func,delay);
    }
}
```

* 题目三四的核心都是定时器而且很像 总结一句话 ``节不清，抖请``

>题目五：写一个函数curry  完成下列输出 （函数柯里化） `**`
>const foo = curry((a,b,c,d)=>{
>        console.log(a,b,c,d);
>   })
>  foo(1)(2)(3)(4);//1,2,3,4
>  foo(1)(2)(3);  //无输出
> const f = foo(1)(2)(3);
  > f(5) //1,2,3,5

 ```js
 let curry = (fn)=>{
 	const resFn = (...allArgs)=> allArgs.length>=fn.length
 	?fn(...allArgs)
 	:(...args)=>resFn(...allArgs,...args);
 	return resFn
 }
 ```

### 最终总结：

* O(1)— **常数时间：该算法仅仅使用一步就可以完成任务
* O(log n)— **对数时间：该算法每执行一步，它完成任务所需要的步骤数目会以一定的因子减少。
* O(n)— **线性时间：该算法完成任务所需要的步骤直接和n相关（1对1的关系）。
* O(n²)— **二次方时间：完成任务所需要的步骤是n的平方。
* O(C^n)— **指数时间：完成任务所需要的步骤是一个常数的n次方（非常大的数字）。

