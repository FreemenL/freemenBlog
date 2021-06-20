# 链表

要存储多个元素，数组(或列表)可能是最常用的数据结构。正如之前提到过的，每种 语言都实现了数组。这种数据结构非常方便，提供了一个便利的[]语法来访问它的元素。然而， 这种数据结构有一个缺点:(在大多数语言中)数组的大小是固定的，从数组的起点或中间插入 或移除项的成本很高，因为需要移动元素( 尽管我们已经学过的JavaScript的Array类方法可以帮 我们做这些事，但背后的情况同样是这样 )

<br/>
链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。下图展 示了一个链表的结构:

<img src='https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/chain.png'>

相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然 而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何 位置的任何元素，而要想访问链表中间的一个元素，需要从起点(表头)开始迭代列表直到找到 所需的元素。
<br/>
<br/>

以火车为例，一列火车是由一系列车厢(也 称车皮)组成的。每节车厢或车皮都相互连接。你很容易分离一节车皮，改变它的位置，添加或 移除它。下图演示了一列火车。每节车皮都是列表的元素，车皮间的连接就是指针

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/car.png">

理解了链表是什么之后，现在就要开始实现我们的数据结构了。以下是我们的```LinkedList```类的骨架

```js
function LinkedList() {
        var Node = function(element){ 
            this.element = element;
            this.next = null;
        };
        var length = 0; 
        var head = null; 
        this.append = function(element){};
        this.insert = function(position, element){};
        this.removeAt = function(position){};
        this.remove = function(element){};
        this.indexOf = function(element){};
        this.isEmpty = function() {};
        this.size = function() {};
        this.toString = function(){};
        this.print = function(){};
}
```

| 方法 | 详情 |
|--|--|
| append(element)|向列表尾部添加一个新的项|
|insert(position, element)|向列表的特定位置插入一个新的项。|
|remove(element)|从列表中移除一项。|
|indexOf(element)|返回元素在列表中的索引。如果列表中没有该元素则返回-1|。
|removeAt(position)|从列表的特定位置移除一项。|
|isEmpty()|如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。 |
|size()|返回链表包含的元素个数。与数组的length属性类似。 toString():由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的|
|toString方法|让其只输出元素的值。|

>向链表尾部追加元素

向LinkedList对象尾部添加一个元素时，可能有两种场景:列表为空，添加的是第一个元 素，或者列表不为空，向其追加元素。

```js

this.append = function(element){
        var node = new Node(element),
            current; 
        if (head === null){ 
            //列表中第一个节点 
            head = node;
        } else {
            current = head; 
                //循环列表，直到找到最后一项 while(current.next){
                current = current.next;
            }
            //找到最后一项，将其next赋为node，建立链接
            current.next = node;
        }
        //更新列表的长度 
        length++; 
};
```

>从链表中移除元素

```js
this.removeAt = function(position){
    //检查越界值
    if (position > -1 && position < length){ 
        var current = head, 
            previous, 
            index = 0; 
        //移除第一项
        if (position === 0){ 
            head = current.next;
        } else {
            while (index++ < position){ 
                previous = current;     
                current = current.next; 
            }
            //将previous与current的下一项链接起来:跳过current，从而移除它
            previous.next = current.next; 
        }
        length--; 
        return current.element;
    } else {
            return null; 
    } 
};
```
>在任意位置插入一个元素

```js
this.insert = function(position, element){
    //检查越界值
    if (position >= 0 && position <= length){ 
            var node = new Node(element),
                current = head,
                previous,
                index = 0;
            if (position === 0){ //在第一个位置添加 node.next =         current; 
                head = node;
            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current; 
                previous.next = node; 
            }
            length++; //更新列表的长度
            return true;
        } else {
            return false; //{6}
        }
};
```

>完整实现

```js
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
            string+=current.element;
            current = current.next;
        }
        return string;
    };
    this.print = function(){};
}
```
### 双向链表

双向链表和普通链表的区别在于，在链表中， 一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的:一个链向下一个元素， 另一个链向前一个元素，如下图所示。
<img src="https://github.com/FreemenL/learn-javascript-arithmetic/raw/master/imgs/duplex.png"/>

双向链表提供了两种迭代列表的方法:从头到尾，或者反过来。我们也可以访问一个特定节 点的下一个或前一个元素。在单向链表中，如果迭代列表时错过了要找的元素，就需要回到列表 起点，重新开始迭代。这是双向链表的一个优点。

### 循环链表 
循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链 表之间唯一的区别在于，最后一个元素指向下一个元素的指针(tail.next)不是引用null， 而是指向第一个元素(head), 如下图所示 

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/loopchain.png">

双向循环链表有指向head元素的tail.next，和指向tail元素的head.prev

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/dloopchain.png">


