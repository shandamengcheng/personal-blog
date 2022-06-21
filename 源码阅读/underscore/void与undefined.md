在阅读代码的时候发现return一个undefined时，不是直接return undefined，而是return void 0
```javascript
    return obj == null ? void 0 : obj[key];

```

这里先讲一下void运算符。
> void运算符会对给定的表达式进行求值

void运算符一般只用于获取undefined值，一般的形式为void(0)（等同于void 0）

使用场景：
1. 立即执行函数表达式

在使用立即执行函数表达式时，在前面加一个void， 可以让JS引擎识别function关键字为函数表达式而不是函数声明
```javascript
void function iife() {
    var bar = function () {};
    var baz = function () {};
    var foo = function () {
        bar();
        baz();
     };
    var biz = function () {};

    foo();
    biz();
}();
```

2. 在Javascript URIs

当用户点击一个以javascript:开头的URI时，会执行URI中的代码，然后用返回的值替换页面的内容，除非返回undefined. void操作符可以用来返回一个undefined.
```javascript
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情，如果去掉 void()，
  点击之后整个页面会被替换成一个字符 0。
</a>
<p> chrome 中即使<a href="javascript:0;">也没变化，firefox 中会变成一个字符串 0 </p>
<a href="javascript:void(document.body.style.backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>

```


3. 在箭头函数中避免泄漏

在使用箭头函数时，允许函数在不使用括号直接返回值。如果右侧本来调用的是一个没有返回值的函数，那么当它的返回值发生变化时，会导致非预期的副作用。因此，安全起见，如果一个函数的返回值不会被用到，那么可以使用void运算符，来确保返回值是固定的undefined, 即使API发生变化，也不会影响箭头函数的行为。
```javascript
button.onclick = () => doSomething()

// good way
button.onclick = () => void doSomething()
```

在网上查了一下，有两种原因：
1. 字符量更少，可以编码更快（但是，也差不了几个字符）
2. 在非严格模式下，undefined可以作为合法的变量名，这就可能导致全局的undefined的意思发生改变。因此，通过void 0的形式可以获得原始undefined类型