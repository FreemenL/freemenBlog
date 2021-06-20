# react  中的 function Component

因为hooks的出现 解决了函数式 组件没有生命周期的一个痛点 同时也有一些新的坑等待我们,遇到的第一个坑就```在配置了react-hot-loader的情况下无法使用hoosk```原因是react-hot-loader的那个babel插件的问题 可能在解析某些语法上做了特殊的处理

# class Component 和 function Component 的区别
为什么要了解 Function 写法的组件呢？因为它正在变得越来越重要。
那么 React 中 Function Component 与 Class Component 有何不同？

###### ```Capture props   (props 的捕获)```
对比下面两段代码。

###### class Component 
```js
import React from 'react';

class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={ this.handleClick }>Follow</button>;
  }
}

export default ProfilePage;
```
## function Component
```js
import React from 'react';

function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={ handleClick }>Follow</button>
  );
}

export default ProfilePage;
```
这两个组件都描述了同一个逻辑：点击按钮 3 秒后 alert 父级传入的用户名。

父级组件代码
```js
import React from "react";
import ReactDOM from "react-dom";

import ProfilePageFunction from './ProfilePageFunction';
import ProfilePageClass from './ProfilePageClass';

class App extends React.Component{

  state = {
    user: 'Dan',
  };

  render() {
    return (
      <>
        <label>
          <b>Choose profile to view: </b>
          <select
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
          >
            <option value="Dan">Dan</option>
            <option value="Sophie">Sophie</option>
            <option value="Sunil">Sunil</option>
          </select>
        </label>
        <h1>Welcome to { this.state.user }’s profile!</h1>
        <p>
          <ProfilePageFunction user={ this.state.user } />
          <b> (function)</b>
        </p>
        <p>
          <ProfilePageClass user={ this.state.user } />
          <b> (class)</b>
        </p>
        <p>
          Can you spot the difference in the behavior?
        </p>
      </>
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

运行的结果是 class Component  每次拿到的都是父级组件改变后的状态，function Component 拿到的是改变之前的状态

那么 React 文档中描述的 props 不是不可变（Immutable） 数据吗？为啥在运行时还会发生变化呢？

原因在于，虽然 props 不可变，是 this 在 Class Component 中是可变的，因此 this.props 的调用会导致每次都访问最新的 props。

而 Function Component 不存在 this.props 的语法，因此 props 总是不可变的。

### Hooks 也具有 ```capture value```特性  
```js
function MessageThread() {
  const [message, setMessage] = useState("");

  const showMessage = () => {
    alert("You said: " + message);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  return (
    <>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```
在点击 Send 按钮后，再次修改输入框的值，3 秒后的输出依然是 点击前输入框的值。这说明 Hooks 同样具有 capture value 的特性。
```利用 useRef 可以规避 capture value 特性```
```js
function MessageThread() {
    const latestMessage = useRef("");
  
    const showMessage = () => {
      alert("You said: " + latestMessage.current);
    };
  
    const handleSendClick = () => {
      setTimeout(showMessage, 3000);
    };
  
    const handleMessageChange = e => {
      latestMessage.current = e.target.value;
    };

    return (
      <>
        <input onChange={handleMessageChange} />
        <button onClick={handleSendClick}>Send</button>
      </>
    );
}
```
###### ```怎么替代 React.PureComponent```
说实话，Function Component 替代 PureComponent 的方案并没有 Class Component 优雅，代码是这样的：
```js
const Button = React.memo(props => {
  // your component
});
```
React.memo是一个更高阶的组件。它类似于React.PureComponent功能组件而不是类。
默认情况下，它只会浅显比较props对象中的复杂对象。如果要控制比较，还可以提供自定义比较函数作为第二个参数。
###### ```实现shouldComponentUpdate```
```js
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```
##### ```怎么替代 componentDidUpdate```
<h6>useEffect</h6>

```js
function MessageThread() {
    useEffect(() => {
        let DOM  = document.getElementById("dom");
        console.log(DOM);
    });

    return (
      <>
        <input id="dom"/>
        <button> Send </button>
      </>
    );
}
```
```有条件地使用useEffect```
useEffect默认行为是在每次完成渲染后触发,但是，在某些情况下，这可能有点过分
我们可以传递第二个参数来避免这种情况
```js
useEffect(() => {
    console.log(props);
     let DOM  = document.getElementById("dom");
     console.log(DOM);
},[props.test]);
```
这种情况下只有当props.test的值改变时才会重新渲染

#### ```聚合管理 State```
```js
const [ state, setState ] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100
});
const handleClick = () => {
    setState( state =>({ ...state,width:300 }));
}
```
### ```获取上一个props```
```js
function MessageThread (){
    const [ count, setCount ] = useState(0);
    const prevCount = usePrevious(count);
    return (
      <h1>
        Now: {count}, before: {prevCount}
        <button onClick={()=>setCount(count+1)}>待机</button>
      </h1>
    );
  }
  
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
```
可见，合理运用 useEffect useRef，可以做许多事情，而且封装成 CustomHook 后使用起来仍然很方便

### ```性能注意事项```
useState 函数的参数虽然是初始值，但由于整个函数都是 Render，因此每次初始化都会被调用，如果初始值计算非常消耗时间，建议使用函数传入，这样只会执行一次

```js
const [ state, setState ] = useState(()=>{ 
    console.log("init")
    return({
         left: 0,
         top: 0,
         width: 100,
         height: 100
     })
 });
```
