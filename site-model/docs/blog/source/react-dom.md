### react 虚拟dom 浅析

虚拟dom 的概念 随着 react vue 等框架的普及 在前端圈一度成为一个热议的话题

争论点在于:

1. 虚拟dom 真的可以提高 操作dom的性能么 ?
2. 与传统的jq  相比 性能到底有多大提升 ? 

于是带着这两个问题 我研究了下 这块的知识

首先我们来看下虚拟dom的 构建过程

jsx语法的转换 我们代码中的jsx 主要有babel 负责语法解析转换 这块主要是用到了babel-preset-react 这个预设 babel的预设其实就相当于是一些babel 插件的集合 pabael-preset-react 所含盖的插件包括（preset-flow，syntax-jsx，transform-react-jsx，transform-react-display-name） 他负责将我们的jsx语法转 换成js可识别 dom描述对象 原理是生成一棵抽象语法树 然后进行相应的语法转换 - React.createElement 方法接受转译后的dom 描述对象 创建虚拟dom树 在didmount的时候将这棵虚拟dom树转换成真正的dom 挂载到页面上

```js
//根据传进来的值 产生虚拟dom 对象
class Element{
	constructor(type,props,children){
		this.type = type;
		this.props = props;
		this.children = children;
	}
}
//生成虚拟dom
function createElement(type,props,children){
	return new Element(type,props,children)
}

let vertualDom = createElement('ul',{class:"list"},[
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['a'])
])

//负责将虚拟dom处理成真实的dom
function render(eleObj){
	let el  = document.createElement(eleObj.type);
	for(let key in eleObj.props){
		//设置属性的方法
		setAttr(el,key,eleObj.props[key]);
	}
	eleObj.children.forEach((child)=>{
		child = (child instanceof Element)?render(child):document.createTextNode(child);
		el.appendChild(child)
	})
	return el;
}

//设置属性
function setAttr(node,key,value){
	switch(key){
		case"value":
			if(node.tagName.toUpperCase()==="INPUT"||
				node.tagName.toUpperCase()==="TEXTAREA"){
				node.value = value
			}else{
				node.setAttribute(key,value);
			}
			break;
		case"style":
			node.style.cssText = value;
		   break;
		default:
			node.setAttribute(key,value);
		   break;

	}
}
//把dom挂在到页面中
function renderDOm(el,target){
	target.appendChild(el);
}
```

虚拟dom 创建 到此结束 （简陋版实现）

### dom diff

接下来就是我们的dom diff

在每次调用setState 的时候 会生成 一颗新的虚拟dom 树 与原先老的树进行对比 得到一个补丁包 然后 拿着这个补丁包去dom 中进行相应的操作 ，dom diff的算法 也是整个虚拟dom 中最核心的部分
个人的理解： 原先的的老树相当于是一个资源池 我们的新树是我们最终想要渲染的结果 通过两个树对比 我们能以最小的代价 来更新的我们的视图

```js
const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = 'REPLACE';
let Index = 0;

// 对比前后两棵树 之前的差别 返回一个补丁对象 
function diff(oldTree,newTree){

   let patches = {};
   let index = 0;
   walk(oldTree,newTree,index,patches);
   return patches;
}
// 具体的对比方法 
function walk(oldNode,newNode,index,patches){
   let currentPatches = []; 

   if(!newNode){ //没有新的节点。删除
   	currentPatches.push({type:REMOVE,index});
   }else if(isString(oldNode)&&isString(newNode)){ //判断文本是否变换 
   	if(oldNode!==newNode){
   		currentPatches.push({type:TEXT,text:newNode});
   	}
   }else if(oldNode.type === newNode.type){ //type 相同 判断属性 
   	let attrs = diffAttr(oldNode.props,newNode.props);
   	if(Object.keys(attrs).length>0){
   		currentPatches.push({type:ATTRS,attrs})
   	}
   	diffChildren(oldNode.children,newNode.children,index,patches)
   }else{
   	//节点被替换了 
   	currentPatches.push({type:REPLACE,newNode})
   }
   if(currentPatches.length>0){  //产生补丁包 
   	patches[index] = currentPatches;
   }
}
//对比属性的不同 
function diffAttr(oldAttrs,newAttrs){
   let patch = {}
   //更新 
   for(let attr in oldAttrs){
   	if(oldAttrs[attr]!== newAttrs[attr]){
   		patch[attr] = newAttrs[attr]
   	}
   }
   //新增
   for(let attr in newAttrs){
   	if(!oldAttrs.hasOwnProperty(attr)){
   		patch[attr] = newAttrs[attr]
   	}
   }
   return patch;
}

//递归遍历子节点的不同 
function diffChildren(oldNode,newNode,index,patches){
   oldNode.forEach((child,idx)=>{
   	walk(child ,newNode[idx],++Index,patches)
   })
}

function isString(node){
   return Object.prototype.toString.call(node)=="[object String]";
}
```

其实key 在整个dom diff 中扮演了重要的 角色主要优化了这个过程的性能 key 主要意义是为了以最小的代价来更新dom 就是最小化性能对资源池（老树）的操作

```js
/**
 * 在 dom diff 中如何识别和处理 key 
*/
const REMOVE = "REMOVE";
const INSERT = "INSERT";


class Element{
    constructor(tagName,key,children){
        this.tagName = tagName;
        this.key = key;
        this.children = children;
    }
    render(){
        let element = document.createElement(this.tagName);
        element.innerHTML = this.children;
        element.setAttribute("key",this.key);
        return element;
    }
}

function el(tagName,key,children){
    return new Element(tagName,key,children);
}

let oldChildren = [
    el("li","A","A"),
    el("li","B","B"),
    el("li","C","C"),
    el("li","D","D")
];
let ul = document.createElement("ul");
oldChildren.forEach(item=> ul.appendChild(item.render()));
document.body.appendChild(ul);

let newChildren = [
    el("li","A","A"),
    el("li","C","C"),
    el("li","B","B"),
    el("li","D","D"),
];

let patches = diff(oldChildren,newChildren);
console.log(patches)//[{ type: REMOVE,index:0},{type:INSERT,index,node}]
patch(ul,patches);
function patch(root,patches){
    let oldNode;
    let oldNodeMap = {};
    Array.from(root.childNodes).forEach(node=>{
        oldNodeMap[node.getAttribute("key")] = node  
    });
    patches.forEach(patch=>{
        switch(patch.type){
            case INSERT:
                let newNode;
                if(oldNodeMap[patch.node.key]){
                    newNode = oldNodeMap[patch.node.key];
                    delete oldNodeMap[patch.node.key];
                }else{
                    newNode = patch.node.render();
                }
                oldNode = root.childNodes[patch.index];
                if(oldNode){
                    root.insertBefore(newNode,oldNode);
                }else{
                    root.appendChild(newNode);
                }
                break;
            case REMOVE:
                oldNode = root.childNodes[patch.index];
                root.removeChild(oldNode);
                break;
            default:
                throw new Error("没有这种布丁类型！");
        }
    })
}
function diff(oldChildren,newChildren){
    
    let patches = [];
    let newKeys = newChildren.map(item=>item.key);
    // 第一步，把老数组中在新数组中没有的元素移除掉
    let oldIndex = 0;
    let newLength = newChildren.length;
    while(oldIndex< oldChildren.length){
        let oldKey = oldChildren[oldIndex].key;
        if(!newKeys.includes(oldKey)){
            remove(oldIndex);
            oldChildren.splice(oldIndex,1);
        }else{
            oldIndex++; 
        }
    }
    
    oldIndex = 0;
    let newIndex = 0;
    //对比 newKey 和 oldKey 的不同 , 插入新的节点 
    
    while(newIndex<newLength){
        let newKey =( newChildren[newIndex]||{}).key;
        let oldKey =( oldChildren[oldIndex]||{}).key;
        if(!oldKey){ // oldChildren 被遍历完的情况下  的情况下插入新的元素 newIndex++ 4c
            insert(newIndex,newKey);
            newIndex++;
        }else if(oldKey!=newKey){  // oldKey!=newKey 的情况下插入新的元素 newIndex++ 
            let nextOldKey = (oldChildren[oldIndex+1]||{}).key;
            if(nextOldKey==newKey){
                remove(newIndex);
                oldChildren.splice(oldIndex,1);
            }else{
                insert(newIndex,newKey);
                newIndex++;
            }
        }else{
            oldIndex++;
            newIndex++
        }
    }

    function insert(index,key){
        patches.push({type:INSERT,index,node:el("li",key,key)});
    }

    function remove(index){
        patches.push({type:REMOVE,index})
    }

    return patches;
}
```

有几个值得注意的 地方

1. 虚拟dom的创建过程 先序深度优先
2. diff 对比的过程只会对同级进行相应的比较
3. 打补丁的过程是 从下到上 倒着来的
4. 虚拟dom的意义是 我们把对dom 的操作 都交由他来处理 避免了一些不必要的dom 回流和重绘 ,也就是我们在对dom 操作时读写分离的重要性 以及一些 性能优化的注意点
