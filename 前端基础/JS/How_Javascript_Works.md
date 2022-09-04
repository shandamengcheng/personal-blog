## How Javascript Works - Runtime, JS Engine && Event Loop

### Overview

  很多人都听说过JS引擎（经常是V8引擎），而且大家也了解Javacscript是单线程的，这意味着，JS引擎每次只能执行一个任务，只有当前任务执行完毕后，才能执行下一个任务，那么其他的任务等待在哪里的呢？这些任务是怎么排列，怎么调度的呢？JS引擎又是以怎样的方式来执行任务的呢？此外，我们也经常会看到runtime这个词，尤其是在Node, Deno, Bun的介绍时，那么什么是runtime呢？这些问题都将在本文得到解答。
  [![vTQ69e.png](https://s1.ax1x.com/2022/09/04/vTQ69e.png)](https://imgse.com/i/vTQ69e)
  [![vTQgcd.png](https://s1.ax1x.com/2022/09/04/vTQgcd.png)](https://imgse.com/i/vTQgcd)
  [![vTQ2jA.png](https://s1.ax1x.com/2022/09/04/vTQ2jA.png)](https://imgse.com/i/vTQ2jA)

浏览器中JS代码的执行大概流程如下图所示，后续会详细介绍每一部分。
[![vTlW24.png](https://s1.ax1x.com/2022/09/04/vTlW24.png)](https://imgse.com/i/vTlW24)

### Runtime
Runtime或 Runtime Environment是程序执行的环境。该环境决定了程序可访问的全局对象（比如，浏览器中的全局对象为window. node中的全局对象为global），并且提供了相关的API接口供程序调用，比如浏览器中的Web APIs， Node中的文件操作，IO操作等相关操作API。

#### Two Types
- 浏览器运行时环境
  浏览器运行环境提供了我们常用的一些API, 比如，window.alert(), console相关的函数，setTimeout等
- 服务端运行时环境
  有的文章这个类型写的是Node Runtime Environment，这个有点特指Node了。现在也有一些新的类Node的Runtime Environment，比如Deno, 势头强劲的Bun。所以，我觉得这里可以用服务端运行环境可以包含这几个。它们共同点是提供了一些“后端”常用的API, 类似文件处理，内存处理，IO操作等。

> 当然，随着Javascript语言的发展，可以在很多领域使用JS，我们这里只针对互联网开发做说明和区别。

### JS Engine
> JS引擎详细说起来的话，需要另写一篇文章，这里先抽象说明结构，把重点放在Event Loop这个主题上。

JS引擎主要包含了两个部分：内存堆(Memory Heap) 和 调用栈(Call Stack)。
- Memory Heap - 这里是内存申请的地方。
- Call Stack - 这里是代码执行时栈桢所在的位置。

### Event Loop
Event Loop是所有Javascript宿主环境都有的一种内置机制。Event Loop用来循环处理程序多个代码块的执行，每次都会涉及到对JS引擎的调用。

#### Call Stack

在计算机科学中，Call Stack是一个堆栈结构，用于存储计算机中active态的子例程(subroutines)的信息。子例程是一个已被调用但尚未执行完成的子程序，<font color="orange">在子例程执行完成后需要将控制权交还给调用点</font>。子例程的这种结构可以嵌套到任何级别，所以是stack结构而不是queue结构。因此，Call Stack的最主要的作用就是：<font color="orange">追踪每个active态的子例程在执行结束后应该返回控制的点</font>。它是一种解释器的机制。
<br />
回到JS这边，Call Stack是JS解释器的一种机制，<font color="orange">用来追踪调用的多个函数(哪个函数现在正在运行以及在当前函数中调用了哪些函数等)在脚本的位置</font>。

- 当一个函数被调用时，解释器把它添加到call stack，然后开始执行该函数。
- 任何在该函数中被调用的函数都将被添加到call stack中，并在调用到达的时候调用执行。
- 在当前函数结束执行后，解释器会把它从栈中取出来，然后从该函数的调用点处恢复执行。
- 如果栈占用比分配给它更多的空间，会导致"stack overflow"错误。

```javascript
function greeting() {
   // [1] Some code here
   sayHi();
   // [2] Some code here
}
function sayHi() {
   return "Hi!";
}

// Invoke the `greeting` function
greeting();
```
如果这是一个JS文件里的代码，且要执行该文件时，执行过程如下：
- 整个script文件会被当成一个匿名函数(anonymous)压入栈中，并执行该“函数”
[![vT8XzF.png](https://s1.ax1x.com/2022/09/04/vT8XzF.png)](https://imgse.com/i/vT8XzF)
- 在anonymous中，发现greeting函数的调用，解释器把greeting()添加到call stack中。
> 此时的call stack: anonymous - greeting
- 执行greeting函数中的代码，发现sayHi()函数的调用
- 把sayHi()函数添加到call stack中
> 此时的call stack: anonymous - greeting - sayHi
- 执行sayHi()函数，直到代码执行结束
- 返回执行到sayHi()函数调用的那一行，并且继续执行greeting()函数的后续代码
- 从call stack中移除sayHi()函数
> 此时的call stack: anonymous - greeting()
- 在greeting()函数执行完毕后，返回控制到greeting()函数的调用行，继续执行anonymous中的其他代码
- 从call stack中删除greeting()函数
> 此时的call stack: anonymous
- 此时，没有其余代码的执行了，从call stack中移除anonymous
> 此时的call stack: EMPTY

##### Uncaught RangeError: Maximum call stack size exceeded
上面提到了，如果call stack占用了比分配给它的更多空间，就会导致“stack overflow”错误。
[![vTGYLj.png](https://s1.ax1x.com/2022/09/05/vTGYLj.png)](https://imgse.com/i/vTGYLj)

### 参考文献
- [Introduction to JavaScript Runtime Environments](https://www.codecademy.com/article/introduction-to-javascript-runtime-environments)