# redux思想

redux 是一种架构模式 。 react-redux是这种架构模式的一种实现

react-redux的出现是 因为react本身有个contextApi 但是官方并不推荐使用 。 因为简单的使用context api会造成整个应用的状态（mudule层）不可控（随便一个子组件都能直接操作最顶层的状态） 。

react-redux 的核心思想是将整个应用的状态至于最顶层 并且只能通过dispath action的方式来操作reducer里面的状态 相比直接使用context api的优点就是 将状态可控 。

react-redux处理数据的整体流程大概是：

(1) createStore函数接受的第一个参数是reducer （reducer中保存的就是我饿们整个应用的module ） 该函数 中用了订阅发布模式 。 即：他有一个缓存所有dispatch函数的数组listener 。 每次往store里面分发action的时候就会把这个分发action的函数（dispatch函数）push到listener数组里面(该操作是由subscribe函数来完成的 ) reducer接收到 新的state和action 做出相应的响应后 。 最终会用foreach的方式遍历执行listener中的每一项dispatch函数 这样就不用每次dispatch 一个action之后都要再重新render 这也就是react-redux中订阅发布模式的使用 。 是在createstore函数里面 。 该函数会返回一个对象 。 即{getState , dispatch , subscribe} getstate用于获取计算后的state值 dispatch即分发action的函数 subscribe用来监听状态的改变

(2)reducer 相当于是整个应用的module层 该函数的两个参数state 和action 分别为 初始状态和dipatch进来的对象（或者是函数，如果只函数的话就需要用redux-thunk之类的辅助工具） 函数体内部通过switch的action的type属性 来做出相应的响应 然后view层接受到新的state后就会做出相应的响应，原因就在于createstore中的那个监听

（3）provider 组件中使用contextApi 负责把创建好的store至于应用的最顶层 方便在子组件中获取这些状态

（4）connect 为一个高阶组件，所谓高阶组件就是返回值为函数的这么一个函数该函数用来建立子组件跟顶层状态之间连接（同样使用的是contextApi）
该函数接受两个参数mapStateToProps , mapDispatchToProps ；在返回的函数中把要获取顶层状态的子组件传进去 ；这样就能在子组件中通过props的方式来获取到state和改变state的dispatch函数

（4）1> mapStateToProps 是一个函数用于 建立外部状态到ui组件props的映射简单说就是 将指定的顶层状态传给子组件 。该函数执行后应该返回一个对象，里面的每一个键值对就是一个映射。

（4）2> mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

[实例](https://github.com/FreemenL/redux-todos)
