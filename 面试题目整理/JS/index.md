# JS面试题整理

### 判断JS的类型
- typeof 
> 返回 number, boolean, string, undefined, symbol, bigint, object, function

- obj instanceof Obj
> 判断Obj.prototype是否在obj的原型链上

- Object.prototype.toString.call()
> 会返回具体的类型

- constructor
>null, undefined不能使用

- Obj.prototype.isPrototypeOf(obj)
> Obj的prototype是否在obj的原型链上

<br />

<hr />
> Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）


### typeof null返回object

In the first implementation of JavaScript, JavaScript values were represented as a type tag and a value. The type tag for objects was 0. null was represented as the NULL pointer (0x00 in most platforms). Consequently, null had 0 as type tag, hence the typeof return value "object". (reference)

A fix was proposed for ECMAScript (via an opt-in), but was rejected. It would have resulted in typeof null === "null"

> https://stackoverflow.com/questions/18808226/why-is-typeof-null-object

### void 0的作用
> https://stackoverflow.com/questions/1291942/what-does-javascriptvoid0-mean
> https://stackoverflow.com/questions/7755088/what-does-href-expression-a-href-javascript-a-do

### 对象与基本类型进行比较
- 如果对象有Symbol.toPrimitive方法，不管是==中的隐式类型转换，还是通过Number(), String()转换，返回的都是toPrimitive返回的基本类型值。
- 如果Symbol.toPrimitive返回的不是基本类型值，三个操作都会报错
```javascript
let obj = {
  [Symbol.toPrimitive]() {
    return []
  },
  toString() {
    return '222'
  },
  valueOf() {
    return 666
  }
}
Number(obj)
> VM1323:1 Uncaught TypeError: Cannot convert object to primitive value
>    at Number (<anonymous>)
>    at <anonymous>:1:1
>(anonymous) @ VM1323:1

String(obj)
>VM1333:1 Uncaught TypeError: Cannot convert object to primitive value
>   at String (<anonymous>)
>    at <anonymous>:1:1
>(anonymous) @ VM1333:1

obj == 666
>VM1364:1 Uncaught TypeError: Cannot convert object to primitive value
>    at <anonymous>:1:5
```
- 如果没有Symbol.toPrimitive方法，==隐式类型转换是先返回valueOf的值，Number()会返回valueOf()的返回值，String()会返回toString()的返回值。
```javascript
let obj = {
  toString() {
    return '222'
  },
  valueOf() {
    return 666
  }
}
String(obj)
> '222'
Number(obj)
> 666
obj == '222'
> false
obj == 666
> true
```
- 加减乘除，大小比较操作，转换顺序为: toPrimitive -> valueOf -> toString


### currentTarget, target 事件
- currentTarget是事件绑定的DOM对象
- target是目标元素
- 在事件处理程序内部，this 对象始终等于 currentTarget 的值，而 target 只包含事件的实际目标

> eventPhase 属性可用于确定事件流当前所处的阶段。如果事件处理程序在捕获阶段被调用，则
eventPhase 等于 1；如果事件处理程序在目标上被调用，则 eventPhase 等于 2；如果事件处理程序在冒泡阶段被调用，则 eventPhase 等于 3。不过要注意的是，虽然“到达目标”是在冒泡阶段发生的，但其 eventPhase 仍然等于 2


### 事件委托
“过多事件处理程序”的解决方案是使用事件委托。事件委托利用事件冒泡，可以只使用一个事件
处理程序来管理一种类型的事件

#### 优点
- document 对象随时可用，任何时候都可以给它添加事件处理程序（不用等待 DOMContentLoaded
或 load 事件）。这意味着只要页面渲染出可点击的元素，就可以无延迟地起作用
- 节省花在设置页面事件处理程序上的时间。只指定一个事件处理程序既可以节省 DOM 引用，也
可以节省时间
-  减少整个页面所需的内存，提升整体性能

> 最适合使用事件委托的事件包括：click、mousedown、mouseup、keydown 和 keypress。
mouseover 和 mouseout 事件冒泡，但很难适当处理，且经常需要计算元素位置（因为 mouseout 会
在光标从一个元素移动到它的一个后代节点以及移出元素之外时触发）

### 3.toString()为什么会报错
包装类型都可以这样操作。但是对于数字，.会被JS引擎优先解释为小数点。
两种方式：
- (3).toString()
- 3..toString()