## 函数式编程

### 什么是函数式编程
一种应用使用纯函数，避免共享mutable数据以及副作用来构建应用程序的编程范式。其中lambda是函数式编程的基础。

### Lamdba运算
Lambda运算是一种基于函数应用的通用计算模型。在lambda演算中，函数是king。有三个重要的点使得lambda演算特别：
- 函数是匿名的。在js中，const sum = (x, y) => x + y 右侧部分是匿名函数表达式(x, y) => x + y;
- 在lambda演算中，函数总是unary的，即：他们只接收一个单一参数。这样的话，如果需要多个参数，可以将函数接收一个输入参数，返回一个新的接收另一个参数的函数。直到所有的参数都被函数收集然后执行。 => 柯里化
- 函数是一等公民（first-class）， => 函数可以作为其他函数的输入以及函数也可以返回一个函数。

### 函数式编程的基础

#### 元，柯里化，point-free
- 元：函数的参数的个数。上面介绍了，函数式编程的大部分函数是unary（一元）的 => 为了更好的实现函数组合和复用
- 柯里化 => 在函数组合，复用场景
  - 柯里函数是一个可以接收多个参数的函数，一次只接收一个的函数 => 闭包
- point-free: 无参风格



### 函数式编程的核心点

#### first-class: 函数也是一种数据 => 毕竟是函数式编程，函数是该范式的基石

#### Pure Functions => 确定性的 => react数据更新
特点
- 相同的输入 => 总是相同的输出
- 无副作用产生

> 引用透明（referential transparency） => replace a function call with its resulting value without changing the meaning of the program

- 好处：
  - 可缓存 => 减少计算量
```javascript
const squareNumber = memoize(x => x * x);
squareNumber(4); // 16
squareNumber(4); // 16, returns cache for input 4
squareNumber(5); // 25
squareNumber(5); // 25, returns cache for input 5

const memoize = (f) => {
  const cache = {};
  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  };
};
```
  - 易测试
  - 可读性强
  - 易重构，debug, test, maintain
##### avoid side effects
什么是副作用
- Modifying any external variable or object property (e.g., a global variable, or a variable in the
parent function scope chain)
- Logging to the console
- Writing to the screen
- Writing to a file
- Writing to the network
- Triggering any external process
- Calling any other functions with side-effects

> 减少副作用 => 易重构，debug, test, maintain


#### avoid shared state => Immutability
shared state是存在于共享作用域内的任意变量，对象或内存空间。
> Shared state is any variable, object, or memory space that exists in a shared scope, or as the property
> of an object being passed between scopes

当避免共享状态时，函数的调用顺序和时机不会改变函数的调用结果。
<br />
js中展开运算符。

#### 不可变性 Immutability
不可变对象在创建后，不可修改。

<br />
js中增加了const声明，但是对于对象来说不能实现不可变，Object.freeze()只能freeze一层。

一些函数库，immutable.js, immer.js

#### 函数组合 => redux的applyMiddleware, reduce方法
函数组合是为了产生一个新的函数或执行一些计算而结合两个或多个函数的过程。

#### 高阶函数实现复用
- 什么是高阶函数
  - A higher order function is any function which takes a function as an argument, returns a function,or both


#### 一些函数式编程语言存在的，而js没有的
- Purity: js不会强制purity,允许表达式存在副作用
- Immutability
- Recursion: 一些函数式编程语言中，这是唯一的方式去进行迭代，没有for, while，do等。尾部调用， js在es6中实现了。 => 允许递归函数复用栈帧。