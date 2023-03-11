# React18文档知识点


## 关于side effect
渲染函数应该保持pure, 这可以确保组件的可预测性与一致性。所有的side effect应该在event handler中进行处理。因为，很多副作用是和用户的交互相关的。
比如，当用户点击一个按钮时，我们需要发送一个请求，这个请求是和用户的交互相关的，所以这个请求应该在event handler中进行处理。
把在useEffect中处理副作用当作是没有办法时的**最后手段**，因为这样会导致组件的可预测性与一致性降低。


## 添加事件到组件
- 除了onScroll只会在它attach的组件上执行，在react中其他的事件都会进行冒泡，所以在组件上添加事件时，需要注意事件的冒泡。
- 如果不想进行事件的冒泡，可以使用`stopPropagation`方法。
- 如果子元素的事件设置了`stopPropagation`，但是父元素仍然想要监听这个事件，可以在父元素上的事件后加上Capture,比如
```js
<div onClickCapture={handleClick}>
  <button onClick={(e) => {e.stopPropagation()}}>Click</button>
</div>
```


> stopImmediatePropagation()方法阻止其他事件处理程序被调用，并阻止任何事件的进一步传播和默认行为。

> stopPropagation()方法阻止事件的进一步传播，但是它允许当前处理程序处理该事件。

> preventDefault()方法阻止元素发生默认的行为。

> 如果同一个组件的同一个事件有多个处理程序，stopImmediatePropagation()会阻止其他同一事件的剩余处理程序被调用，
> 但是stopPropagation()不会阻止其他处理程序被调用。


## State
### 本地变量
- 本地变量在渲染时是不会被保存的，所以每次渲染时，本地变量都会被重置。
```javascript
function Gallery() {
    let index = 0;

    function handleClick() {
        index = index + 1;
    }
    return null
}
```
- 本地变量不会触发re-render
## useState实现
```javascript
let hooksArray = [];
let cursor = 0;
function useState(initialState) {
    const state = hooksArray[cursor] || initialState;
    const setState = (newState) => {
        hooksArray[cursor] = newState;
        render();
    }
    cursor++;
    return [state, setState];
}
function render() {
    cursor = 0;
    ReactDOM.render(<App />, document.getElementById('root'));
}
```
> https://beta.reactjs.org/learn/state-a-components-memory 这里有个简单的原理实现

## useEffect实现
```javascript
let hooksArray = [];
let cursor = 0;
function useEffect(callback, deps) {
    const hasNoDeps = !deps;
    const depsChanged = hooksArray[cursor] ? !deps.every((dep, i) => dep === hooksArray[cursor][i]) : true;
    if (hasNoDeps || depsChanged) {
        callback();
        hooksArray[cursor] = deps;
    }
    cursor++;
}

function render() {
    cursor = 0;
    ReactDOM.render(<App />, document.getElementById('root'));
}

```   

## React Re-render
- 如果在一个事件处理函数里面多次调用setState更新state，那么React会把这些更新合并成一个更新，然后在事件处理函数执行结束后再进行更新。
- react不会对事件处理函数进行合并，每个事件处理函数都会单独执行。
- 如果想要执行多次更新，可以给状态变更函数穿一个函数作为参数，这个函数会接收到更新队列中上一次的state作为参数，然后返回一个新的state。
```javascript
function Counter() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
    }
    function handleClick2() {
        setCount2((c) => c + 1);
        setCount2((c) => c + 1);
    }
    return (
        <div>
            <button onClick={handleClick}>Click</button>
            <button onClick={handleClick2}>Click2</button>
            <p>{count}</p>
            <p>{count2}</p>
        </div>
    )
}
```
> https://beta.reactjs.org/learn/queueing-a-series-of-state-updates 这个讲解state的更新原理非常清晰


## state保持read-only
### 如果state是一个对象
可以使用immer来实现state的不可变性。
- immer是一个用来生成不可变数据的库，可以让我们在不改变原始数据的情况下，生成一个新的数据。
- immer的原理是使用了Proxy，Proxy可以拦截对象的读写操作，然后在读写操作时，生成一个新的对象。
- 