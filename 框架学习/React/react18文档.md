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


## State相关
### 为什么state的更新是异步的
- 为了提升性能，React会把多个setState合并成一个更新，然后在事件处理函数执行结束后再进行更新。
- 如果state的更新是同步的，那么在事件处理函数中，state的更新会被合并，然后在事件处理函数执行结束后再进行更新，这样会导致state的更新不是最新的。

### state结构
- 删除任何非必要的状态变量
  - 如果一个状态变量可以通过其他状态变量计算出来，那么就不需要这个状态变量了。
  - 状态会引起悖论吗？比如form的state, isTyping, isSubmitting不可能同时为true,因此如果设置这两个状态，两个布尔值之间会有四种组合，但是只有三个是合法的。因此，对于这种情况，使用status来替换这两个state, status有三个值，typing, submitting, success。
- 结构化状态
  - 把相关的状态组合起来，放到一个对象中，这样可以减少状态的数量，减少状态的更新。
  - 避免矛盾的状态，⬆️面有讲到。
  - 避免状态的冗余，比如一个状态可以通过其他状态计算出来，那么就不需要这个状态了。
  - 避免状态的深层嵌套，如果状态的嵌套层级太深，那么就需要写很多的`?.`来访问状态，这样会导致代码的可读性变差。
- 不要把props放到state里面。如果prop作为state的初始值，如果prop发生变化，但是这个时候prop只是作为useState的initialValue,那么state不会发生变化，这样会导致state和prop不一致。

## 如何保存被移除组件的状态
- 初始渲染的时候，渲染所有的组件而不是仅仅渲染需要的那个。然后，使用CSS来隐藏其他的组件。这样的话，组件就不会从组件树中移除，从而保存了各个组件的本地状态。**但是这种做法只适合简单的UI，如果一个组件的UI比较复杂的话，就会使渲染变慢。**
- 提升组件的状态，把状态相关的数据放到父组件中，这是最常见的方式。
- 可以把使用一个非React state的数据来源。可以把相关的数据存在localStorage中。

## 抽象State逻辑到一个Reducer中
当我们有多同一个或同一类数据进行处理的时候，可以把这部分的逻辑抽象出来。
比如，
```javascript
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
          tasks.map((t) => {
            if (t.id === task.id) {
              return task;
            } else {
              return t;
            }
          })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}

=> 

function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}

```
> 个人理解是，如果有一些state的数据处理可以用switch来处理，那么就可以把这部分的逻辑抽象出来，使用Reducer的思想来处理这段数据。

### useState VS useReducer
- 代码量
  - 如果state的更新逻辑比较简单，那么使用useState会比较简单。
  - 如果state的更新逻辑比较复杂，那么使用useReducer会比较简单。尤其是当有许多事件处理函数需要以相似的方式处理state的时候。
- 可读性
  - 如果state的更新逻辑比较简单，那么使用useState会比较简单。
  - useReducer可以清楚地将更新逻辑的方式与事件处理程序发生的情况分离开来。
- 调试
  - useReducer由于是把state的更新逻辑抽象出来，所以可以把action和state两部分分别清晰的排查。只是相对于useState而言，可能一步步要排查的代码多一些。
- 测试
  - reducer是一个纯函数

> 官方推荐：如果在一些组件经常遇到由于非正确的更新state导致的bugs时，这个时候建议使用useReducer。

### useReducer的注意点
- reducer函数一定要是pure的，也就是说，reducer函数不应该有副作用，比如修改外部变量，或者调用非纯函数。
- 每一个action只描述用户的一个行为，即使这个行为会导致多个state的更新。
- > https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer#writing-concise-reducers-with-immer


## 通过Context传递深层数据
- 通过Context传递数据，可以避免在组件树中传递props。 => prop drilling
- 每个context都是独立的，一个组件可以使用或提供多个不同的context。

### 不一定使用Context的情况
- 传递参数。对于一些不是非常简单的组件，通过props传递参数可能是必要的。这样做可以清晰地表明哪些组件使用了哪些数据。在维护代码时，其他人也会对数据的流动更加明确。
- 抽象组件，将JSX作为children传递
```javascript
<Layout posts={posts} /> 
// 这个posts不会在Layout组件中使用

// => 改为以下方式：
<Layout>
  <Posts posts={posts} />
</Layout>
```

> 如果上面两种方式都不适用，那么就可以使用Context来传递数据。

### 使用场景
- 主题。如果想改变外观之类的。 语言之类的i18n也是可以使用的。
- 当前的账户。可能在应用的不同地方需要用户账户信息。
- 路由。
> 大多数路由解决方案在内部使用了上下文来保存当前路由。这就是每个链接如何"知道"它是否处于活跃状态。
- 管理状态。随着应用程序的增长，最终可能会有很多状态接近应用程序的顶部。
下面许多遥远的组件可能想要改变它。常见的做法是将 reduce 与上下文一起使用，以管理复杂的状态，并将其传递给远程组件，而不会产生太多麻烦。

> 如果更新了Context的值，那么所有使用了这个Context的组件都会重新渲染。所以，如果Context的值是一个对象，那么就要注意，如果对象的值发生了变化，那么组件也会重新渲染。这个时候，可以使用useMemo来避免不必要的渲染。

### 结合useReducer使用Context
官网给的例子很棒，把reducer和ContextProvider单独抽象到一个文件中。然后本来context的使用者,可能会在组件中使用useContext来注入数据。
但是，可以结合自定义hooks使用。把context的使用抽象成自定义hooks，这样，所有context相关的处理都在同一个文件中了。


## 通过Refs引用值
> 当想要让组件"记住"一些信息，但又不想让这些信息触发重新渲染，这个时候可以使用ref.

### ref与state的区别
- ref不会触发组件的重新渲染。
- **不能在渲染期间读取或者写current的值** => 如果在jsx中使用current的值，会发现组件没有更新，因为ref不会触发re-render

### 使用场景
- timeout id的引用
- 存储和操作DOM元素
- 存储不需要计算JSX的其他对象

> 如果组件需要存储一些值，但是这些值不需要触发组件的重新渲染，那么可以使用ref。

### 最佳实践
- ref是一个"紧急逃生舱"，不会被频繁地用到。如果发现自己在组件中频繁地使用ref，那么就需要考虑一下是否可以使用state或者其他方式来解决问题。
- 当涉及到外部系统或浏览器APIs时，ref可能是比较有用的
- 不要在渲染期间读取或者写ref的值。如果需要在渲染期间读取或者写ref的值，那么就需要考虑一下是否可以使用state或者其他方式来解决问题。