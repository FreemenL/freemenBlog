# vuex 源码解读

### 前言

在较为复杂的web应用中通常会面临状态管理的问题，关于这一问题不同的web框架有各自的解决方案，例如react中的react-redux。 vuex是vue中状态管理的解决方案。vuex 中的关键概念如下:

* state：        用于保存我们应用的状态。
* mapState：     处理顶层状态到组件的映射关系。
* Getters：      对状态进行公共的处理。
* mapGetters：   处理 Getter 到组件的映射关系。
* mutations：     业务组件中通过$store.commit 同步修改state。
mapMutations： 简化 mutation 的调用。
* Actions：       子组件中通过 dispatch action 异步修改应用状态。
* mapActions：   简化action的调用。
* Modules：	    对 store 进行模块化管理。

### vuex中的数据流向

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ef5e26010614adaaf0cae2848cf5dbc~tplv-k3u1fbpfcp-watermark.image"/>

如图可以看出 vuex 中的数据流向： 子组件中 dispatch action 请求后端接口，拿到结果后提交mutations 改变相应的状态

### 源码解读:

vuex 的本质类似于 react-redux，都是订阅/发布模式的一种实践。 

1. 首先我们得知道 被 vue use 的插件可以是一个对象或者是函数，如果是对象的话必须提供一个install方法。 源码如下:

```js
const install = (_Vue)=>{
  Vue = _Vue;
  Vue.mixin({
    // 通过 Vue.mixin 给所有的组件都混入一个 beforeCreate 生命周期 用于注册 $store 
    
    // 这样就可以直接在模版语法中使用
    beforeCreate(){
      if( this.$options && this.$options.store ){
        this.$store = this.$options.store; 
      } else{ 
        this.$store = this.$parent && this.$parent.$store;
      } 
    } 
  }) 
};
```

2. 创建Store类

```js
// new Vuex.Store
class Store { 
  constructor(options={}){
    // 将用户的状态放入 store 中。
    this.s = new Vue({ // 将 state 转成响应式。
      data(){
        return {
          state: options.state
        }
      }
    });
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    this._modules = new ModuleCollection(options);
    //  递归将结果进行分类;
    installModules(this,this.state,[],this._modules.root);
  }

  dispatch = (actionName,pyload)=>{
    this.actions[actionName](pyload);
  }

  commit = (mutationName,pyload) => {
    this.mutations[mutationName].forEach(fn=>{
      fn(pyload); 
    });
  }
  
  // 通过 new Vue 的方式将 state 转换成响应式的。 
  get state(){
    return this.s.state;
  }
}
```

Store 类中首先会初始化 getters，mutations，actions 三个实例属性，之后通过ModuleCollection 方法逐级注册各模块。

```js
class ModuleCollection {

  constructor(options){
    this.register([],options);
  }

  register (path, rootModule){
    // 定义好模块固定格式
    const module = {
      _rawModule: rootModule, 
      _children:  {},
      state: rootModule.state
    };

    if( path.length===0 ){
      this.root = module;
    } else {
      const parent = path.slice(0,-1).reduce((root,current)=>{
        return root._children[current];
      },this.root);
      parent._children[path[path.length-1]] = module;
    }
    // 递归挂载模块
    if(rootModule.modules){
      forEach(rootModule.modules,(moduleName,mod)=>{
        this.register(path.concat(moduleName),mod);
      });
    }
  }
};
```

最后通过 installModules 方法收集各子模块上的 state，getters，mutations，actions 全部挂载到根store上。

```js
const installModules = (store,rootState,path,rootModule) => {
  // 把子模块的 state 全部挂载到根上。
  if(path.length>0){
    let parent = path.slice(0,-1).reduce((root,current)=>{
      return root[current];
    },rootState);

    Vue.set(parent,path[path.length-1],rootModule.state);
  };  

  // 把子模块的 getters 全部挂载到根上。
  let getters = rootModule._rawModule.getters;
  if(getters){
    forEach(getters,(getterName,fn)=>{
      Object.defineProperty(store.getters, getterName,{
        get(){
          // 让 getter 执行将自己的状态传入
          return fn(rootModule.state,getters); 
        }
      })
    });
  };
  
  // 收集所有模块中的 mutations 组装mutations的订阅数组
  let mutations = rootModule._rawModule.mutations;
  if(mutations){
    forEach(mutations,(mutationName,fn)=>{
      let mutations = store.mutations[mutationName] || [];
      mutations.push((pyload)=>{
        fn(rootModule.state,pyload);
      });
      store.mutations[mutationName] = mutations;
    });
  };  
  // 收集所有模块中的 actions 组装actions的订阅数组
  let actions = rootModule._rawModule.actions;
  if(actions){
    forEach(actions,(actionsName,fn)=>{
      let actions = store.actions[actionsName] || [];
      actions.push((pyload)=>{
        fn(rootModule.state,pyload);
      });
      store.actions[actionsName] = actions;
    });
  };

  // 递归收集子模块中的数据;
  forEach(rootModule._children,(moduleName,moudle)=>{
    installModules(store,rootState, path.concat(moduleName),moudle);  
  });
};
```
