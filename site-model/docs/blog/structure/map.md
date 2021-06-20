# 集合，字典和散列表

### 集合
集合是由一组无序且唯一(即不能重复)的项组成的。这个数据结构使用了与有限集合相同 的数学概念，但应用在计算机科学的数据结构中。在数学中，集合也有并集、交集、差集等基本操作.

我们要实现的类就是以ECMAScript 6中Set类的实现为基础的

有一个非常重要的细节，我们使用对象而不是数组来表示集合(items)。但也可以用数组 实现。在这里我们用对象来实现，稍微有点儿不一样，也学习一下实现相似数据结构的新方法。 同时，JavaScript的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的

接下来，需要声明一些集合可用的方法(我们会尝试模拟与ECMAScript 6实现相同的Set类

|方法|详情|
|-|-|
 add(value)|向集合添加一个新的项。
|remove(value)|从集合移除一个值。|
|has(value)|如果值在集合中，返回true，否则返回false。|
|clear()|移除集合中的所有项。|
|size()|返回集合所包含元素的数量。与数组的length属性类似|
|values()|返回一个包含集合中所有值的数组。|

> 具体代码

```js
function Set(){
    let items = {};
    this.has = function(value){
        return items.hasOwnProperty(value);
    }
    this.remove = function(value){
        if(this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    }
    this.clear = function(){
        items = {};
    }
    this.add = function(value){
        if(!this.has(value)){
            items[value] = value;
            return true
        }
        return false;
    }
    this.size = function(){
        return Object.keys(items).length;
    }
    this.values = function(){
        let keys = [];
        for(let key in items){
            keys.push(key); 
        }
        return keys;
    }
    //并集 
    this.union = function(otherSet){
        let unionSet = new Set();

        let currentValues = this.values();
        for(let i in currentValues){
            unionSet.add(currentValues[i])
        }

        let otherValues =  otherSet.values();
        for(let j in otherValues){
            unionSet.add(otherValues[j])
        }

        return unionSet;
    }
    // 交集
    this.intersection = function(others){
        let values = this.values();
        let intersection = new Set();
        for(let key in values){
            if(others.has(key)){
                intersection.add(key)
            }
        }
        return intersection;
    }
    //差集
    this.difference = function(otherSet){
        let difference = this.values();
        let differenceSet = new Set();
        for(let key in values){
            if(!others.has(key)){
                differenceSet.add(key)
            }
        }
        return differenceSet;
    }
    this.subset = function(otherSet){
        if (this.size() > otherSet.size()){ 
            return false;
        } else {
            var values = this.values();
            for (var i=0; i<values.length; i++){ 
                if (!otherSet.has(values[i])){ 
                    return false; 
                } 
            }
            return true; 
        }
    }
}

```

### 字典和散列表
### ```字典```
集合、字典和散列表可以存储不重复的值。在集合中，我们感兴趣的是每个值本身，并把它 当作主要元素。在字典中，我们用[键，值]的形式来存储数据。在散列表中也是一样(也是以[键， 值]对的形式来存储数据)。但是两种数据结构的实现方式略有不同，本章中将会介绍。

我们将要实现的类就是以ECMAScript 6中Map类的实现为基础的。你会发现它和 类很相似(但不同于存储[值，值]对的形式，我们将要存储的是[键，值]对)。

创建一个字典 他有如下方法
|方法|详情|
|-|-|
|set(key,value)|向字典中添加新元素。|
|remove(key)|通过使用键值来从字典中移除键值对应的数据值。|
|has(key)|如果某个键值存在于这个字典中，则返回true，反之则返回false。||get(key)|通过键值查找特定的数值并返回。|
|clear()|将这个字典中的所有元素全部删除。|
|size()|返回字典所包含元素的数量。与数组的length属性类似。|
|keys()|将字典所包含的所有键名以数组形式返回。|
|values()|将字典所包含的所有数值以数组形式返回。|

代码 
```js
function Dictionary(){

    let items = {};

    this.has = function(key){
        return key in items;
    };

    this.get = function(key){
        return this.has(key)?items[key]:undefined;
    };

    this.set = function(key,value){
        items[key] = value;
    }

    this.remove = function(key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }

    this.values = function(){
        let result = [];
        for(let key in items){
            if (this.has(key)) {
                result.push(items[key])
            }
        }
        return result;
    }

    this.getItems = function(){
        return items;
    }
}

var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has("Gandalf"));
console.log(dictionary.get("Gandalf"));
```

### ```散列表```
散列算法的作用是尽可能快地在数据结构中找到一个值。在之前的章节中，你已经知道如果 要在数据结构中获得一个值(使用get方法)，需要遍历整个数据结构来找到它。如果使用散列 函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后 返回值在表中的地址。

举个例子，我们继续使用在前一节中使用的电子邮件地址簿。我们将要使用最常见的散列函 数——“lose lose”散列函数，方法是简单地将每个键值中的每个字母的ASCII值相加

创建一个散列表

```js
function HashTable() {
    var table = [];
    var loseloseHashCode = function (key) {
        let hash = "";
        for(let i=0; i<key.length;i++){
            hash += key.charCodeAt(i);
        }
        return hash%37;
    }
    this.put = function(key,value){
        let position = loseloseHashCode(key);
        table[position] = value;
    }
    this.get = function (key) {
        return table[loseloseHashCode(key)];
    };
    this.remove = function(key){
        table[loseloseHashCode(key)] = undefined;
    }
}
```


### 处理散列表中的冲突 

有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为``冲突``
处理冲突有几种方法:分离链接、线性探查和双散列法。我们会介绍前两种方法。

```分离链接```（ 散列表+链表 ）
分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间

我们在之前的测试代码中使用分离链接的话，输出结果将会是这样
<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/separation.png" />


对于分离链接和线性探查来说，只需要重写三个方法:put、get和remove。这三个方法在 每种技术实现中都是不同的。

为了实现一个使用了分离链接的HashTable实例，我们需要一个新的辅助类来表示将要加入 LinkedList实例的元素。我们管它叫ValuePair类(在HashTable类内部定义):

具体实现

```js
function HashMap(){
    let table = [];

    var loseloseHashCode = function (key) {
        let hash = "";
        for(let i=0; i<key.length;i++){
            hash += key.charCodeAt(i);
        }
        return hash%37;
    }

    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;
        this.toString = function(){
            return "["+this.key+"-"+this.value+"]"
        }
    }

    this.put = function(key,value){
        let position = loseloseHashCode(key);
        if(table[position]===undefined){
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key,value))
    }

    this.get = function(key){
        let position = loseloseHashCode(key);
        if(table[position]){
            let current = table[position].getHead();
            while(current.next){
                if(current.element.key==key){
                    return current.element.value
                }
                current = current.next;
            }
            //检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key){ //{9}
                return current.element.value;
            }
        }else{
            return undefined
        }
    }

    this.remove = function(key){
        let position = loseloseHashCode(key);
        if(table[position]!==undefined){
            let current = table[position].getHead();
            while(current.next){
                if ( current.element.key === key ){
                    table[position].remove(current.element);
                    if (table[position].isEmpty()){ 
                        table[position] = undefined; 
                    }
                    return true; 
                }
                current = current.next;
            }
            if (current.element.key === key){ //{16}
                table[position].remove(current.element);
                if (table[position].isEmpty()){
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }
}

function LinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null;  // 保存第一个元素的引用
    this.append = function(element){
        let node = new Node(element);
        let current;
        if(head==null){
            head = node;
        }else{
            current = head;
            // 以head 为起点查找最后一个next属性不为空的节点
            while(current.next){
                current = current.next;
            }
            // 把当前创建的节点添加到尾部
            current.next = node;
        }
        length++;
    };
    this.insert = function(position,element){
        if(position>-1&&position<length){
            let node = new Node(element);
            let current = head;
            let index=0;
            let previous;
            if(position===0){
                node.next = current;
                head = node;
            }else{
                // 查找到 position 对应节点上一个和下一个值
                while (index++ < position){ 
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
            return true;
        }else{
            return false;
        }
    };
    this.removeAt = function(position){
        //检查越界值
        if (position > -1 && position < length){
            var current = head,
                previous, 
                index = 0; 
            
            if (position === 0){ 
                //如果要删除的是第一个元素就让 head 指向current的next 
                head = current.next; 
            } else {
                while (index ++ < position){ 
                    previous = current;    
                    current = current.next; 
                }
                // 连接指定位置的上一个元素和下一个元素
                previous.next = current.next; // {9}
            }
            length--; // {10}
            return current.element;
        } else {
            return null; // {11}
        } 
    }
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    this.indexOf = function(element){
        let current = head;
        let index = -1;
        while(current){
            if(current.element = element){
                return index; 
            }
            index++;
            current = current.next;
        }
        return index;
    };
    this.isEmpty = function(){
        return length == 0;
    };
    this.size = function() {
        return length;
    };
    this.toString = function(){
        let current = head;
        let string = '';
        while(current){
            string += current.element;
            current = current.next;
        }
        return string;
    };
    this.print = function(){};
    this.getHead= function(){
        return head;
    }
}
```
### ```线性探查```

另一种解决冲突的方法是线性探查。当想向表中某个位置加入一个新元素的时候，如果索引 为index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，就尝试 index+2的位置，以此类推。

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/line.png"/>

代码

```js
function HashMap(){
    let table = [];

    var loseloseHashCode = function (key) {
        let hash = "";
        for(let i=0; i<key.length;i++){
            hash += key.charCodeAt(i);
        }
        return hash%37;
    }

    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;
        this.toString = function(){
            return "["+this.key+"-"+this.value+"]"
        }
    }

    this.put = function(key,value){
        let position = loseloseHashCode(key);
        if(table[position]===undefined){
            table[position] = new ValuePair(key,value);
        }else{
            let index = ++ position;
            while(table[index]!==undefined){
                index ++;
            }
            table[index] = new ValuePair(key,value);
        }
    }

    this.get = function(key){
        let position = loseloseHashCode(key);
        if(table[position]){
            if(table[position].key==key){
                return table[position].value;
            }else{
                let index = ++position;

                while(table[index]==undefined||table[index]['key']!==key){
                    index++
                }

                if(table[index]['key']==key){
                    return table[index].value;
                }

            }
        }
        return undefined
    }

    this.remove = function(key){
        let position = loseloseHashCode(key);
        if(table[position]){
            if(table[position].key==key){
                return table[position]=undefined;
            }else{
                let index = ++position;
                while(table[index]==undefined||table[index]['key']!==key){
                    index++;
                }
                if(table[index]['key']==key){
                    return table[index] = undefined;
                }

            }
        }
        return false
    }
}

```
## ```创建更好的散列函数```

我们实现的“lose lose”散列函数并不是一个表现良好的散列函数，因为它会产生太多的冲 突。如果我们使用这个函数的话，会产生各种各样的冲突。一个表现良好的散列函数是由几个方 面构成的:插入和检索元素的时间(即性能)，当然也包括较低的冲突可能性。我们可以在网上 找到一些不同的实现方法，或者也可以实现自己的散列函数。


```js
 var djb2HashCode = function (key) {
        var hash = 5381; //{1}
        for (var i = 0; i < key.length; i++) { //{2}
            hash = hash * 33 + key.charCodeAt(i); //{3}
        }
        return hash % 1013; //{4}
    };

```

它包括初始化一个hash变量并赋值为一个质数(行{1}——大多数实现都使用5381)，然后 迭代参数key(行{2})，将hash与33相乘(用来当作一个魔力数)，并和当前迭代到的字符的ASCII 码值相加(行{3})。

最后，我们将使用相加的和与另一个随机质数(比我们认为的散列表的大小要大——在本例 中，我们认为散列表的大小为1000)相除的余数。

