# vue mvvm 原理

### 前言

MVVM 是 Model-View-ViewModule 的缩写，他是前端的一种架构模式，View和Model之间通过ViewModel进行交互，其核心是ViewModel通过双向数据绑定将View和Model连接起来了，这使得View数据的变化会同步到Model中，而Model数据的变化也会立即反应到View上，本文主要阐述的是vue中 mvvm的实现原理。

### 实现原理

vue 中实现 mvvm 的核心是 Object.defineProperty 的 getter和setter 和 观察者模式，在它的实现原理中有5个比较重要的概念：

```bash
  1. vue 类
  2. Observer 类
  3. Compiler 类
  4. Dep 类
  5. Watcher类
```

整体的实现思路:

```bash

1. 初始化Vue对象  将 el 和 data 挂载到vue实例上
2. 实例化 Observer 通过 Object.defineProperty 对data中的数据进行劫持,在get方法中添加订阅，set方法中当目标值发生改变的时候触发Dep中的notify。
3. 实例化 Compiler 对象分别对节点型模版和文本型模版进行编译, 编译的同时给节点添加数据监听，当数据改变的时候触发相应试图的更新。

```

代码实现:

```js
class Dep {
  constructor(){
    this.subs = [];
  }
  // 订阅 
  addSub(watcher){ 
    this.subs.push(watcher);
  }
  // 发布
  notify(){
    this.subs.forEach((watcher)=>{
      watcher.update();
    })
  }
}

// 观察者模式 观察者/被观察者
class Watcher {
  constructor(vm,expr,cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldValue = this.get(); 
  }
  get(){ 
    Dep.target = this;
    return compileUtil.getVal(this.vm,this.expr);
  }
  update(){
    let newValue =  compileUtil.getVal(this.vm,this.expr);
    if(newValue!==this.oldValue){
      this.cb(newValue);
    }
  }
}

class Observer {
  constructor(data){
    this.walk(data);
  } 
  walk(data){
    if(data && typeof data==='object') {
      for(let key in data){
        this.defineReactive(data,key,data[key]);
      }
    }
  } 
  defineReactive(obj,key,value){
    this.walk(value); 
    let dep = new Dep();  // 给 data 上的每个属性都加上 发布订阅
    // 用 Object.defineProperty 实现数据劫持
    Object.defineProperty(obj,key,{
      get(){
        Dep.target && dep.addSub(Dep.target);
        return value;
      }, 
      set: (newVal) => {
        if(value!==newVal){
          this.walk(newVal);
          value = newVal;
          dep.notify();
        }
      }
    })
  }
}


class Compiler {
  constructor(el,vm){
    this.vm = vm;
    // 判断el属性是不是一个元素，如果不是元素，那就获取他 
    this.el = this.isElementNode(el)?el:document.querySelector(el);
    // 把当前节点移动到内存中
    let fragment = this.node2Fragment(this.el);
    // 把节点中的内容进行替换
    this.compile(fragment);
    // 编译模版 用数据编译 
    
    // 把内容塞到页面中
    this.el.appendChild(fragment);
  }

  isDirective(directive){
    return directive.startsWith('v-');
  }

  // 编译元素节点
  compileElement(node) {
    let attributes = node.attributes;
    [...attributes].forEach(attr=>{
      let { name,value:expr } = attr;  
      if(this.isDirective(name)){
        const [,directive] = name.split('-');
        const [directiveName,eventName] = directive.split(":");
        compileUtil[directiveName](node,expr,this.vm,eventName);
      }
    })
  }

  // 编译文本节点
  compileText(node){
    const content = node.textContent;
    if(/\{\{.+?\}\}/.test(content)){
      compileUtil['text'](node,content,this.vm);
    }
  } 
  // 编译内存中的DOM  
  compile(node){
    const childNodes = node.childNodes;
    [...childNodes].forEach(child=>{
      if(this.isElementNode(child)){
        this.compileElement(child);
        this.compile(child);
      }else{
        this.compileText(child);
      }
    })
  }   
  isElementNode(el){
    return el.nodeType===1;
  }
  node2Fragment(node){
    let fragment = document.createDocumentFragment();
    let firstChild;
    while(firstChild  = node.firstChild){
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
};

const compileUtil = {
    on(node,expr,vm,eventName){
      node.addEventListener(eventName,(event)=>{s
        vm[expr].call(vm,event);
      })
    },
    // 获取 $data 中的对应的数据
    getVal(vm,expr){
      return expr.split('.').reduce((data,current)=>{
        return data[current.trim()]
      },vm.$data);
    }, 
    setValue(vm,expr,value){
      expr.split(".").reduce((data,current,index,arr)=>{
        if(index==arr.length-1){
          return data[current]=value;
        }
        return data[current];
      }, vm.$data);
    },  
    model(node,expr,vm){ 
      const fn = this.updater['modelUpdater'];
      // 实例化 Watcher 的方式 添加监听。
      new Watcher(vm,expr,(newValue)=>{
        fn(node,newValue);
      });
      const value = this.getVal(vm,expr);
      node.addEventListener("input",(e)=>{
        let value = e.target.value;
        this.setValue(vm,expr,value);
      }); 
      fn(node,value);
    },
    html(node,expr,vm){
      const fn = this.updater['htmlUpdater'];
      // 实例化 Watcher 的方式 添加监听。
      new Watcher(vm,expr,(newValue)=>{
        fn(node,newValue);
      });
      const value = this.getVal(vm,expr);
      fn(node,value);
    },
    getContentValue(vm,expr){
      return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
        return this.getVal(vm,args[1]);
      }) 
    },
    text(node,expr,vm) {
      const fn = this.updater['textUpdater'];
      let content = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
        // 实例化 Watcher 的方式 添加监听。
        new Watcher(vm,args[1],()=>{
          fn(node, this.getContentValue(vm,expr));
        });
        return this.getVal(vm,args[1]);
      });
      fn(node, content);
    },
    updater:{
      modelUpdater(node,value){
        node.value = value;
      },  
      textUpdater(node,value){
        node.textContent = value;
      },
      htmlUpdater(node,value){
        node.innerHTML = value;
      }
    }
}

class Vue {
  constructor(options){
    this.$el = options.el;
    this.$data = options.data;
    let computed = options.computed; 
    const methods = options.methods;
    if(this.$el) {
      // 把数据全部转化成用 Object.defineProperty 来定义;
      new Observer(this.$data);
      // computed 原理
      for(let key in computed){ // 有依赖关系 数据
        Object.defineProperty(this.$data,key,{
          get:()=>{ 
            return computed[key].call(this);
          }
        })
      };
      // methods 原理
      for(let key in methods){ // 有依赖关系 数据
        Object.defineProperty(this,key,{
          get:()=>{
            return methods[key];
          }
        })
      };
      // vm上直接获取数据: 把数据获取操作 vm 上的取值操作都代理到 vm.$data 上; 
      this.proxyVm(this.$data);
      new Compiler(this.$el,this);
    } 
  }
  proxyVm(data){
    for(let key in data){
      Object.defineProperty(this,key,{
        get(){
            return data[key];
        },
        set(newValue){
          data[key] =  newValue;
        }
      })
    }
  } 
}
```
