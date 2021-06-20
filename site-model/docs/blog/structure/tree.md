# 树
树是一种分层数据的抽象模型。现实生活中最常见的树的例子是家谱，或是公司的组织架构 图，如下图所示:

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master//imgs/tree01.png"/>

#### ```树的相关术语```
<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master//imgs/tree02.png"/>

|术语|解释|
|-|-|
|根节点|位于树顶部的节点
|节点  | 树中的每个节点 
|内部节点| 至少有一个子节点 <br/>(7、5、9、15、13和20是内部 节点)
|外部节点| 没有子元素的节点 <br/>(3、6、8、10、12、14、18和25是叶节点)
|子树|子树由节点和它的后代构成<br/>例如，节点13、12和14构成了上 图中树的一棵子树。
|深度|节点的深度取决于它的祖先节点的数量<br/>比如，节点3有3个祖先节 点(5、7和11)，它的深度为3。
|高度|树的高度取决于所有节点深度的最大值。一棵树也可以被分解成层级。根节点在第0层，它 的子节点在第1层，以此类推。上图中的树的高度为3(最大高度已在图中表示——第3层)。

### ```二叉树和二叉搜索树```

二叉树中的节点最多只能有两个子节点:一个是左侧子节点，另一个是右侧子节点。这些定 义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。二叉树在计算机科学中的 应用非常广泛。
二叉搜索树(BST)是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值， 在右侧节点存储(比父节点)大(或者等于)的值。上一节的图中就展现了一棵二叉搜索树

##### 创建BinarySearchTree类
下图展现了二叉搜索树数据结构的组织方式

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master//imgs/tree03.png"/>
和链表一样，将通过指针来表示节点之间的关系(术语称其为边)。在双向链表中，每个节 点包含两个指针，一个指向下一个节点，另一个指向上一个节点。对于树，使用同样的方式(也 使用两个指针)。但是，一个指向左侧子节点，另一个指向右侧子节点。因此，将声明一个Node 类来表示树中的每个节点(行{1})。值得注意的一个小细节是，不同于在之前的章节中将节点 本身称作节点或项，我们将会称其为键。键是树相关的术语中对节点的称呼。


```代码实现```

```js
 function BinarySearchTree(){

    let Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }

    let root = null;

    this.insert = function(key){
        let newNode = new Node(key);
        if( root == null ){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }
    //添加节点
    function insertNode(node,newNode){
        if( newNode.key < node.key ){
            if(node.left===null){
                node.left = newNode;
            }else{
                insertNode( node.left,newNode );
            }
        }else{
            if( node.right === null ){
                node.right = newNode;
            }else{
                insertNode( node.right,newNode );
            }
        }
    }   
    //中序遍历
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback); //{1}
    };

    function inOrderTraverseNode(node,callback){
        if(node!==null){
            inOrderTraverseNode(node.left,callback);
            callback(node);
            inOrderTraverseNode(node.right,callback)
        }
    }
    
    this.getTree = function(){
        return root;
    }

    }

    var tree = new BinarySearchTree();
    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);
    tree.insert(6);
    
    function printNode(node){
        console.log(node)
    }
    tree.inOrderTraverse(printNode);
```

以上代码构建的二叉搜索树如下

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree04.png"/>

### ```中序遍历的结果如下```
1.先把left推进栈 2.执行自己 3.把right推进栈
<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree07.png"/>
```所以输出 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25```

下面的图描绘了inOrderTraverse方法的访问路径:

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree06.png"/>

### ```先序遍历```

先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree08.png"/><br/>
> 1.先执行自己 
2.把left推进栈
3.把right推进栈


代码

```js
this.preOrderTraverse = function(callback){
    preOrderTraverseNode(root, callback);
};

function preOrderTraverseNode(node,callback){
    if(node!==null){
        callback(node);
        preOrderTraverseNode(node.left,callback);
        preOrderTraverseNode(node.right,callback);
    }
}
```
下面是控制台上的输出结果(每个数字将会输出在不同的行):
11 7 5 3 6 9 8 10 15 13 12 14 20 18 25  9
### ```后序遍历```

后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。

> 1.先把left推进栈
2.把right推进栈 
3.执行自己

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree09.png"/>

```js
this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root, callback);
};
var postOrderTraverseNode = function (node, callback) {
    debugger;
    if (node !== null) {
        postOrderTraverseNode(node.left, callback);  
        postOrderTraverseNode(node.right, callback); 
        callback(node.key); 
    } 
}
```

下面是控制台的输出结果(每个数字将会输出在不同行):
3 6 5 8 10 9 7 12 14 13 18 25 20 15 11


### ```搜索最小值和最大值```
根据BST的定义和下图可以看出 最小值是最左边的值 对大值是最右边的值
<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree10.png"/>

代码
```js
// 最小值
this.min = function() {
    return minNode(root); //{1}
};
var minNode = function (node) {
        if (node){
            while (node && node.left !== null) { //{2}
             node = node.left;
        return node.key;
    }
    return null;  //{4}
};
//最大值
this.max = function() {
        return maxNode(root);
};
var maxNode = function (node) {
    if (node){
        while (node && node.right !== null) { //{5}
                node = node.right;
        }
        return node.key;
    }
    return null;
};
```

### ```搜索一个特定的值```

```js

this.search = function(key){
    return searchNode(root, key); 
};

var searchNode = function(node, key){
    if (node === null){
        return false;
    }
    if (key < node.key){ 
        return searchNode(node.left, key); 
    } else if (key > node.key){
        return searchNode(node.right, key);
    } else {
        return true; 
    }
}

```

###  ```移除一个节点```

第一种情况是该节点是一个没有左侧或右侧子节点的叶节点

<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree11.png"/>

第一种情况是移除有一个左侧或右侧子节点的节点
<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree12.png"/>

现在是第三种情况，也是最复杂的情况，那就是要移除的节点有两个子节点
<img src="https://raw.githubusercontent.com/FreemenL/learn-javascript-arithmetic/master/imgs/tree13.png"/>

### ```二叉搜索树 完整代码```
BinarySearchTree
|方法名|解释|
|-|-|
insert(key)|添加一个节点
inOrderTraverse(callback)|中序遍历
postOrderTraverse(callback)|后序遍历
preOrderTraverse(callback)|先序遍历
getTree|获取当前树对象
min|获取最小值
max|获取最大值
search(key)|查找节点
remove(key)|删除节点
```js
function BinarySearchTree(){

        let that = this;

        let Node = function(key){
            this.key = key;
            this.left = null;
            this.right = null;
        }

        let root = null;
        // 添加一个节点
        this.insert = function(key){
            let newNode = new Node(key);
            if( root == null ){
                root = newNode;
            }else{
                insertNode(root,newNode);
            }
        }
        
        function insertNode(node,newNode){
            if( newNode.key < node.key ){
                if(node.left===null){
                    node.left = newNode;
                }else{
                    insertNode( node.left,newNode );
                }
            }else{
                if( node.right === null ){
                    node.right = newNode;
                }else{
                    insertNode( node.right,newNode );
                }
            }
        }   
        // 中序遍历
        this.inOrderTraverse = function(callback){
            inOrderTraverseNode(root, callback);
        };

        function inOrderTraverseNode(node,callback){
            if(node!==null){
                inOrderTraverseNode(node.left,callback);
                callback(node);
                inOrderTraverseNode(node.right,callback)
            }
        }
            
        this.getTree = function(){
            return root;
        }
        //先序遍历
        this.preOrderTraverse = function(callback){
            preOrderTraverseNode(root, callback);
        };

        function preOrderTraverseNode(node,callback){
            debugger;
            if(node!==null){
                callback(node);
                preOrderTraverseNode(node.left,callback);
                preOrderTraverseNode(node.right,callback);
            }
        }
        // 后序遍历
        this.postOrderTraverse = function(callback){
                postOrderTraverseNode(root, callback);
        };

        var postOrderTraverseNode = function (node, callback) {
            debugger;
            if (node !== null) {
                postOrderTraverseNode(node.left, callback);  
                postOrderTraverseNode(node.right, callback); 
                callback(node.key); 
            } 
        }
        //最小值
        this.min = function (){
            return minNode(root); 
        };
        //最大值
        this.max = function() {
            return maxNode(root); 
        };
        
        function findMinNode(node){
            return that.search(minNode(node)); 
        }

        function minNode(node){
            if(node){
                while(node && node.left !== null){
                    node = node.left
                } 
                return node.key;
            }
            return null;
        }

        function maxNode(node){
            if(node){
                while(node&&node.right){
                    node = node.right;
                }
                return node.key;
            }
            return null;
        }
        // 查询节点
        this.search = function(key){
            return searchNode(root, key);
        }

        function searchNode(node,key){
            if(node===null){
                return false;
            }
            if(key<node.key){
                return searchNode(node.left,key)
            }else if(key>node.key){
                return searchNode(node.right,key)
            }else{
                return node;
            }
        }
        //删除
        this.remove = function(key){
            root = removeNode(root, key); 
        };
        var removeNode = function(node, key){
            if (node === null){ 
                return null;
            }
            if (key < node.key){ 
                node.left = removeNode(node.left, key); 
                return node; 
            } else if (key > node.key){ 
                node.right = removeNode(node.right, key); 
                return node; 
            } else { 
                //键等于node.key
                //第一种情况——一个叶节点
                if (node.left === null && node.right === null){ 
                    node = null; 
                    return node; 
                }
                //第二种情况——一个只有一个子节点的节点 
                if (node.left === null){ 
                    node = node.right; 
                    return node; 
                } else if (node.right === null){ 
                    return node; 
                }
                //第三种情况——一个有两个子节点的节点 7
                debugger; 
                var aux = findMinNode(node.right); 
                node.key = aux.key; 
                node.right = removeNode(node.right, aux.key); 
                return node; 
            }
        };
    }

    var tree = new BinarySearchTree();
    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);
    tree.insert(6);
    
    function printNode(node){
        console.log(node)
    }
    //tree.inOrderTraverse(printNode);
    //tree.preOrderTraverse(printNode);
    // tree.postOrderTraverse(printNode);
    console.log(tree.remove(15));
    console.log(tree.getTree());
```
