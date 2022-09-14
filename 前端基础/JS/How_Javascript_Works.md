## How Javascript Works - Runtime, JS Engine, Web APIs && Event Loop

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

  有的文章这个类型写的是Node Runtime Environment，这个有点特指Node了。现在也有一些新的类Node的Runtime Environment，比如Deno, 势头强劲的Bun。所以，我觉得这里可以用服务端运行时环境可以包含这几个。它们共同点是提供了一些“后端”常用的API, 类似文件处理，内存处理，IO操作等。

> 当然，随着Javascript语言的发展，可以在很多领域使用JS，我们这里只针对互联网开发做说明和区别。

### JS Engine
> JS引擎详细说起来的话，需要另写一篇文章，这里先抽象说明结构，把重点放在Event Loop这个主题上。

JS引擎主要包含了两个部分：内存堆(Memory Heap) 和 调用栈(Call Stack)。
- Memory Heap - 这里是内存申请的地方。
- Call Stack - 这里是代码执行时栈桢所在的位置。

### Event Loop
Event Loop是所有Javascript宿主环境都有的一种内置机制。Event Loop用来循环处理程序多个代码块的执行，每次都会涉及到对JS引擎的调用。
> HTML规范中表述： Each agent has an associated event loop, which is unique to that agent.


#### Call Stack

在计算机科学中，Call Stack是一个堆栈结构，用于存储计算机中active态的子例程(subroutines)的信息。子例程是一个已被调用但尚未执行完成的子程序，<font color="orange">在子例程执行完成后需要将控制权交还给调用点</font>。子例程的这种结构可以嵌套到任何级别，所以是stack结构而不是queue结构。因此，Call Stack的最主要的作用就是：<font color="orange">追踪每个active态的子例程在执行结束后应该返回控制的点</font>。它是一种解释器的机制。
<br />
回到JS这边，Call Stack也称作***Execution Stack或 Execution Context Stack***，是JS解释器的一种机制，<font color="orange">用来追踪调用的多个函数(哪个函数现在正在运行以及在当前函数中调用了哪些函数等)在脚本的位置</font>。

- 当一个函数被调用时，解释器把它添加到call stack，然后开始执行该函数。
- 任何在该函数中被调用的函数都将被添加到call stack中，并在调用到达的时候调用执行。
- 在当前函数结束执行后，解释器会把它从栈中取出来，然后从该函数的调用点处恢复执行。
- 如果栈占用比分配给它更多的空间，会导致"stack overflow"错误。

> 当一个函数被调用的时候，一个stack frame(栈桢)会被创建并压入call stack中。但是一些文章以及ECMA规范里的表述为：当一个函数被执行时，会创建一个Execution Context并压入Execution Context Stack中。有人说这是同一个东西的不同称呼，就像Call Stack一样。
https://stackoverflow.com/questions/55819337/are-stack-frame-and-execution-context-the-same-thing-in-javascript

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
在此错误信息里，有相关的堆栈追踪，会展示出发生错误的函数调用。在这个例子中，错误发生在b函数中，该函数由a函数调用（一次循环）。
在我们的浏览器中，最大call stack的范围大概在10000到50000个调用之间。
我们可以通过下面的代码进行简单测试：
```javascript
    function computeMaxCallStackSize() {
        try {
            return 1 + computeMaxCallStackSize();
        } catch (e) {
            // Call stack overflow
            return 1;
        }
    }
```
执行结果：
> Chrome: 11360

> Safari: 45623

<hr />
<br />

**注意**
> 当Native Stack(宿主环境的stack)被使用时，“max stack size”取决于每个独立调用函数的栈桢大小。

下面以Chrome为例：
[![v7ZxgI.png](https://s1.ax1x.com/2022/09/05/v7ZxgI.png)](https://imgse.com/i/v7ZxgI)
我们会发现，随着函数的操作越多，max stack size越小。

> 总结来说，Call Stack用于追踪代码中的函数调用。它遵循LIFO原则，意味着它总是先处理在栈顶的函数调用。
> Javascript只有一个call stack，这也是为什么它一次只能做一件事的原因。

#### Heap
当我们定义函数或变量时，Javascript堆是存储对象的地方。但是它对于我们的Event Loop主题没有相关影响，因此会放在其他文章中进行解读Javascript的内存申请是怎么工作的。

#### Web APIs
严格来说，Web APIs和Heap一样，不属于Event Loop这个定义所包含的范围，但是整个event loop的工作流中，离不开这两个部分，因此都统一在Event Loop结构下进行说明。

<hr />
我们知道，javascript一次只能处理一件事。然而，这只是针对于JS自身而言的，我们的JS运行在其宿主环境内，也就是我们最上面提到的Runtime Environment。那么，这时候宿主环境可以提供一种在JS引擎执行代码的同时执行其他代码的机制。在我们的浏览器中，浏览器提供一些APIs, 这API可以在JS代码中进行功能调用，然后由宿主环境（agent）而不是JS引擎去执行这些API。这样的话，就不会造成Call Stack的阻塞。

<br />
<br />

另一方面来说，Web APIs提供了JS语言所不具备的能力，让我们可以在JS代码中处理类似，本地内存管理，操作DOM，发送AJAX请求等等。


#### Callback Queue

有了Web APIs之后，我们可以以不用阻塞Call Stack的方式在JS解释器之外同时处理其他事情。但是，这有个问题，外部的这些操作完成之后我们的JS代码该怎么处理这些结果，比如处理一个网络请求的返回？
<br />

这就是回调(callback)返回作用的时间。通过它们，Web API允许我们在API调用完成后运行代码。

> 什么是回调函数？

> 回调函数是作为一个参数传递给另一个函数的函数。回调函数通常是在代码执行结束之后执行。
> 比如： setTimeout(function callbackFunc() {console.log('callback')}), 这里的callbackFunc是一个回调函数




### 参考文献
- [Introduction to JavaScript Runtime Environments](https://www.codecademy.com/article/introduction-to-javascript-runtime-environments)
- [Call Stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
- [The maximum call stack size](https://2ality.com/2014/04/call-stack-size.html)