# 虚拟DOM => 新文档已改为UI Tree
1. 作用
作为state的映射，最小化真实DOM操作

2. 优点 
- 高效地更新UI,保障应用基本性能。通过diff算法对虚拟DOM树进行差异比较找到真实DOM需要更新的部分，避免频繁操作真实DOM。
- 维护组件的状态，从而映射到UI。虚拟DOM会随着状态的变化生成新的树。
- 跨平台能力。作为UI的中间表示，可以转化为其他平台(native)的元素

3. 缺点
- 额外的计算。需要构建并维护一颗虚拟DOM树,还要 Diff 算法比较新旧树,开销不小。
- 不等于真实DOM。虚拟DOM最终还需要渲染到真实环境,它只是作为渲染的中间步骤。

> Dan: VDOM是Elements + 不相关的实现细节的营销术语。
> React并不是比真实DOM快。但是它可以让我们在构建大型高性能应用程序，而不需过多考虑性能。
> React有助于跟上不断变化的需求并防止某些类型的错误。
> https://twitter.com/dan_abramov/status/790326092582252544
>
> Elements are the smallest building blocks of React apps.Unlike browser DOM elements, React elements are plain objects, and are cheap to create. 


## props vs state vs context
- 组件自身设计到的可变数据 => state
- useState or useReducer: https://react.dev/learn/extracting-state-logic-into-a-reducer
- 其他的props 或 context
  - 组件层次比较深或许多组件需要相同的信息 => context
  - prop drilling
  - 使用context之前
    - 先使用props传递 => 数据流动很清晰
    - 提取组件并把jsx作为children传递。对于一些中间组件，<Layout posts={posts} />可以改为<Layout><Posts posts={posts} /></Layout>这样从而减少中间组件的层次。
  - context使用场景
    - theming, 比如dark mode之类的，还有i18n等。
    - 当前账户信息
    - 路由
    - 管理状态

### 确定组件内部state的过程
- 识别组件的不同视觉状态 => 因为State是一个随时间变化的数据，所以先找到随时间变化的点。
- 确定触发这些视觉状态变化的因素
- 使用useState(useReducer)来设置状态变量
- 删除任何非必要的状态变量
- 连接事件处理程序来设置状态

### state注意点
1. 删除任何非必要的状态变量
   1. 会导致悖论吗? 如果一个form有输入框，status不能通过isTyping和isSubmitting的布尔值组合来判断，因为这两个不能都是true，所以两个布尔值的四种组合有一个是不可能出现的情况，要删除这种不可能的状态。可以将它们组合成一个status必须是以下三个值之一的值：'typing'、'submitting'或'success'。
   2. 相同的信息是否已经在另一个状态变量中可用？即是否可以通过其他的状态变量计算得到。
   3. 能从另一个状态变量的倒数中得到相同的信息吗？ 比如，isError可以通过error !== null来检查。
2. 结构化state的原则(和上面的类似，可按照这个整理)
   1. 组合相关的状态 => 同时更新的多个状态，组合成一个
   2. 避免状态上的矛盾  => 避免产生“不可能”的状态
   3. 避免冗余状态 => 能从props或其他state计算得到的，不应该放到state中
   > 这里注意： 不能把props中的值直接作为state的初始值。否则，在props变化后，state不会发生更新，直接function Message({ messageColor }) { const color = messageColor; ... }
   4. 避免状态的重复
   ```javascript
    // 选中后的item也是在items里面的，所以这里没必要再保存一遍选中的item信息。保存id就好
    const [items, setItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);
   ```
   5. 避免深度嵌套state => 更新比较麻烦


### 受控与非受控
- It is common to call a component with some local state “uncontrolled”. 
- In contrast, you might say a component is “controlled” when the important information in it is driven by props rather than its own local state. This lets the parent component fully specify its behavior. 
- components as “controlled” (driven by props) or “uncontrolled” (driven by state).

### React注意点
1. *UI trees中相同位置*的相同组件会保留状态
  1. 组件类型不同
  2. 增加Key
2. 在同一位置渲染不同的组件时，它会重置其整个子树的状态 => 树的结构不同，state就会被破坏
  > 不要用嵌套组件函数定义。假设内层嵌套一个输入框，外层组件更新，输入框内层组件的状态会被重置，因为每次渲染都会创建不同的函数。
3. 不要把props作为useState的初始值，否则，在props更新的时候，state不会更新

## 生命周期（class）

### 挂载
1. constructor
初始化一些state，bind事件处理函数
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

### 更新
1. static getDerivedStateFromProps(props, state)
2. shouldComponentUpdate(nextProps, nextState)
3. render()
4. getSnapshotBeforeUpdate(prevProps, prevState)
5. componentDidUpdate(prevProps, prevState, snapshot)

### 卸载
1. componentWillUnmount()

### 错误处理
1. static getDerivedStateFromError()
2. componentDidCatch()

## React事件系统
### 是什么
合成事件是react基于w3c标准实现的跨浏览器的事件对象。他的作用是为了抹平浏览器之间的差异，提供统一的事件接口
### 为什么
不同浏览器对事件的实现有差异,比如事件对象的属性和方法都不统一。为了解决这个问题,React 创建了自己的 SyntheticEvent 事件对象,它跨浏览器提供统一的事件属性和方法,开发者不再需要关心具体的浏览器事件细节,直接使用 React 提供的 SyntheticEvent 即可。
### 作用
1. 统一的事件 API:不管是 IE 还是 Chrome,我们都可以使用 SyntheticEvent 的事件对象和方法,简化了事件处理逻辑。
2. 更精确的事件冒泡:React 可以精确控制事件的冒泡范围,而不仅仅依赖浏览器的事件冒泡机制。
3. 可以控制默认事件行为:通过 SyntheticEvent 我们可以调用 preventDefault()来阻止默认行为。
### 实现原理
在 React 17 中,每次触发一个事件,React 都会创建一个新的 SyntheticEvent 事件对象,而不是像以前从事件池中重用一个。
这个 SyntheticEvent 对象会做如下处理:  
1. 根据 W3C 标准初始化事件属性,如 type,target 等。
2. 根据 React 的事件系统需要添加一些额外属性,如 animationName 等。
3. 代理 preventDefault()和 stopPropagation()等方法。调用这些方法会对应调用浏览器原生的方法。
4. 添加默认的事件冒泡机制。React 会从事件触发的元素开始,逐级向上调用注册的事件监听器。
5. 一旦事件被处理完成,SyntheticEvent 对象会被释放。
所以 SyntheticEvent 实际上是一个代理对象,它代理了浏览器的原生事件,对外提供统一的 API,并添加了 React 需要的额外功能,最终简化和增强了 React 中的事件处理。

> 与v16相比，v17把事件委托到了整个react应用挂载的node节点上。可以说,React 事件系统实现了一套“独立”于浏览器原生事件系统的事件冒泡机制。它将事件冒泡范围限定在 React 组件树的范围内,而不会无限冒泡到 document 对象。
### v17与v16对比
1. 支持异步回调访问事件。由于每次事件触发都会创建一个新的事件对象,我们可以在异步回调中安全访问事件对象,而不会因为事件池的限制导致事件对象被释放。
2. 事件对象属性不会被非本次事件修改。同样因为会为每次事件创建一个新的事件对象,我们不需要担心事件对象的属性被上一次事件修改。
3. 可以解决不同React版本嵌套使用的问题。因为挂载到document上，调用e.stopPropagation只会阻止事件在document上冒泡。事件会继续在16的组件树上冒泡。

### react事件系统
1. 事件绑定
2. 合成事件系统 => 封装和优化浏览器原生事件
3. 事件委托 => 将事件处理函数注册到组件的最顶层节点上
4. 合成事件对象 => react事件被触发时，会创建一个合成事件对象，并将其传给事件处理函数。普通js对象，包含了与原生事件相关的信息，如事件类型等。
5. 组件更新 => 事件处理为副作用，可能导致state的更新