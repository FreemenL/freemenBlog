# 基础算法

##### 排序算法
* 冒泡排序：拿当前值跟后面的值挨个比较 如果当前值比后面的值大 就替换位置
<br/>
* 选择排序：每次找到数组中最小的值的索引 跟当前索引位置元素交换
<br/>
* 插入排序：把当前索引的值当作一个基准  拿前一个值跟这个值对比 如果比他大就替换他的位置 最后把它插入到自己该在的位置。排序小型数组时，此算法比选择排序和冒泡排序性能要好
<br/>
* 归并排序：把数组先剁两半 然后各自排序 不断递归这个过程 最后把两大半数组排序，其复杂度跟快排一样 为O(nlogn)   logn的意思是以2为底n的对数   说白了就是2的几次方等于n
<br/>
* 快排:快排的复杂度和归并排序一样为O(nlogn)    一指针两拨片
    1.首先，从数组中选择中间一项作为主元。
    2.创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。然后移动左右指针，左找大，右找小，交换位置
    重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之 
    前，而比主元大的值都排在主元之后。这一步叫作划分操作
    3.接着，算法对划分后的小数组(较主元小的值组成的子数组，以及较主元大的值组成的 子数组)重复之前的两个步骤，直至数组已完全排序
* 二分搜索:
    (1) 选择数组的中间值。
    (2) 如果选中值是待搜索值，那么算法执行完毕(值找到了)。
    (3) 如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找。 (4) 如果待搜索值比选中值要大，则返回步骤1并在选种值右边的子数组中寻找。

### 冒泡排序

拿当前值跟后面的值挨个比较 如果当前值比后面的值大 就替换位置

```js
let array = [1,2,6,4,5,3];
//拿当前值跟后面的值挨个比较 如果当前值比后面的值大 就替换位置
const bubbleSort = function(){
    var length = array.length;
    for (var i=0; i<length; i++){
      for (var j=0; j<length-1; j++ ){ 
        if (array[j] > array[j+1]){
            swap(j, j+1);           
      } 
    }
  }
  return array;
}

var swap = function(index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
}
// 2
const modifiedBubbleSort = function(){
    var length = array.length;
    for(var i=0; i<length; i++){
        for (var j=0; j<length-i; j++ ){
            if(array[j] > array[j+1]){
              swap(j, j+1);
      }
    } 
  }
  return array
};

```
### 选择排序

每次找到数组中最小的值的索引 跟当前索引位置元素交换

```js
//选择排序：每次找到数组中最小的值的索引 跟当前索引位置元素交换
const selectionSort = function(){
      let length = array.length;
      for(let i=0;i<length;i++){
        let minIndex = i;
        for(let j = i;j<length;j++){
          if(array[minIndex]>array[j]){
            minIndex = j;
          }
        }
        if(minIndex!==i){
          swap(minIndex,i);
        }
      }
      return array;
};
    
```

### 插入排序：

* 思想:把当前索引的值当作一个基准  拿前一个值跟这个值对比 如果比他大就替换他的位置 最后把它插入到自己该在的位置 
* 排序小型数组时，此算法比选择排序和冒泡排序性能要好

```js
const insertionSort = function(){
    let length = array.length,j,temp;
    for(let i=1;i<length;i++){
      let j = i;
      temp = array[i];
      // 拿前一个值跟当前值对比 如果比他大就替换他的位置
      while(j>0&&array[j-1]>temp){
        array[j] = array[j-1];
        j--;
      }
      // 把当前值插入到自己该在的位置
      array[j] = temp;  
    }
    return array;
};
```

### 归并排序:

* 归并排序。把数组先剁两半 然后各自排序 不断递归这个过程 最后把两大半数组排序
* 其复杂度跟快排一样 为O(nlogn)   logn的意思是以2为底n的对数   说白了就是2的几次方等于n

```js
		const mergeSortRec = function(array){
    		var length = array.length;
    		if(length === 1) {    
        		return array;      
    		}
    		var mid = Math.floor(length / 2),
       		left = array.slice(0, mid),
        	right = array.slice(mid, length);		
			return merge(mergeSortRec(left), mergeSortRec(right));
		};

		var merge = function( left, right){
			//[5] [3]        [3,5]
			//[2] [4]        [2,4]
			//[1] [2,4]    	 [1,2,4]
			//[3,5] [1,2,4]	 [1,2,3,4,5]
   			var result = [], 
				il = 0,
				ir = 0;
			while(il < left.length && ir < right.length) { 
				if(left[il] < right[ir]) { //il +1
    				result.push(left[il++]);  
				} else { //ir +1 +1 +1
					result.push(right[ir++]);
				}
			}
			while(il < left.length){
     			result.push(left[il++]);
			}
			while(ir < right.length){
    			result.push(right[ir++]);
			}
			return result;
		};
```

### 快排

快排的复杂度和归并排序一样为O(nlogn)    一指针两拨片

1.首先，从数组中选择中间一项作为主元。

2.创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。然后移动左右指针，左找大，右找小，交换位置

重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元之 
前，而比主元大的值都排在主元之后。这一步叫作划分操作

3.接着，算法对划分后的小数组(较主元小的值组成的子数组，以及较主元大的值组成的 子数组)重复之前的两个步骤，直至数组已完全排序

```js
  var quick = function(array,left,right){
    //[5,3,1,2,4] 0 4 
        var index; 
        if(array.length > 1){ 
            index = partition(array, left, right); 
    };
      if(left < index - 1) {
          quick(array,left,index-1);
    }
      if (index < right) { 
          quick(array, index, right);
    }  
    return array;
  }

  var partition = function(array, left, right) {
    // [5,3,1,2,4] 0 4
        var pivot = array[Math.floor((right + left) / 2)],//1
        i = left, //0
      j = right; //4
      while (i < j) {
        // [1,3,5,2,4]
        while(array[i] < pivot) {
        i++; 
      }
        while(array[j] > pivot) { 
            j--;
          }
          if(i <= j){ 
            //j-2  i=0
            swapQuickStort(array, i, j); 
        i++;
        j--;
      } 
    }
    return i;//1 
  };

  var swapQuickStort = function(array, index1, index2){
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
  };
  quick(array,  0, array.length - 1);

```

### 二分搜索

```js
		const binarySearch = function(item){
			this.quickSort();
			console.log(array)
			let start=0,end=array.length-1,mid,element;
			while(start<=end){
				mid = Math.floor((start+end)/2);
				element = array[mid];
				if(element<item){
					start = mid+1;
				}else if(element>item){
					end = mid-1;
				}else{
					return mid
				}
			}
			return -1; 
		}
	}

let arr = [5,3,1,2,4,9,8,7,6,16,26,66];

arr.binarySearch(66)

```

### 斐波那契数列

```js
function fibonacci(num){
    if(num==1||num==2){
        return 1;	
    }
    return fibonacci(num-1)+fibonacci(num-2)
}

function fib(num){
    let n  = 1;
    let n1 = 1;
    let n2 = 1;
    for(let i = 3;i<num;i++){
        n = n1+n2;
        n1 = n2;
        n2 = n;
    }
    return n
}
```

### 动态规划

动态规划(Dynamic Programming，DP)是一种将复杂问题分解成更小的子问题来解决的优化技术。

要注意动态规划和分而治之(归并排序和快速排序算法中用到的那种)是不 同的方法。分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答 案，而动态规划则是将问题分解成相互依赖的子问题

### 能用动态规划解决问题

```背包问题```:给出一组项目，各自有值和容量，目标是找出总值最大的项目的集合。这个 问题的限制是，总容量必须小于等于“背包”的容量

```最长公共子序列```:找出一组序列的最长公共子序列(可由另一序列删除元素但不改变余 下元素的顺序而得到)。

```矩阵链相乘```:给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法(计算次数尽可 能少)。相乘操作不会进行，解决方案是找到这些矩阵各自相乘的顺序
```硬币找零```:给出面额为d1...dn的一定数量的硬币和要找零的钱数，找出有多少种找零的 方法。
```图的全源最短路径```:对所有顶点对(u, v)，找出从顶点u到顶点v的最短路径

>动态规划 解决最少硬币找零问题   把一个大问题归结到很多小问题  把小问题的结果缓存到cache对象中 当我们找36的结果时 会用36 挨个减去coins 中的值得到一个最优解 36 的话就是1 + cache中的35的结果 10 +25 所以36 的结果是[1, 10, 25]

```js

function MinCoinChange(coins){
        var coins = coins; 
        var cache = {}; 
        this.makeChange = function(amount) {
            var me = this;
            if(!amount){ 
                return [];
            }
            if(cache[amount]){
                return cache[amount];
            }
            var min = [], newMin, newAmount;
            for(var i=0; i<coins.length; i++){
                var coin = coins[i];
                newAmount = amount - coin;
                if (newAmount >= 0){
                    newMin = me.makeChange(newAmount);
                }
               	// debugger;
                if (
                    newAmount >= 0 && 
                    (newMin.length < min.length-1 || !min.length)
                    && (newMin.length || !newAmount) 
                    ){
                    min = [coin].concat(newMin);
                    console.log(min,coin) 
				} 
			}
            return (cache[amount] = min); 
        };
        this.getCache = function(){
        	console.log(cache);
        }
	}
    var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
	minCoinChange.makeChange(36);
	minCoinChange.getCache();
```

### 贪心算法
>贪心算法解决最少硬币找零问题 把数组从小到大排序 然后从后往前累加得到结果
>贪心算法所执行的效率比动态规划快。但是得到的结果却不是最优解
>如果用[1, 3, 4]面额。
>执行贪心算法，会得到结果[4, 1, 1]。
>如果用动态规划的解法，会得到最优的结果[3, 3]。

```js
function MinCoinChanges(coins){
    var coins = coins; 
    this.makeChange = function(amount) {
        var change = [],
            total = 0;
        for (var i=coins.length; i>=0; i--){ 
            var coin = coins[i];
            while (total + coin <= amount) {
                change.push(coin);
                total += coin;
            } 
        }
        return change;
    };
}
var minCoinChanges = new MinCoinChanges([1,3,4]);
console.log(minCoinChanges.makeChange(6));
```
