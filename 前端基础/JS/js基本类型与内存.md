## JS基本类型

1. Number
js中number类型代表整数和浮点数两种。
还有一些特殊的整数：Infinity, -Infinity, NaN.
> 做任何数学运算都是“安全”的。脚本不会出错而停止运行，最坏的情况只是返回一个NaN

- 双精度64位二进制浮点数格式。
> 双精度，单精度：https://www.zhihu.com/question/26022206

在js中最大能表示正数在2 ^ (-1027)（Number.MIN_VALUE）到2 ^ 1024(Number.MAX_VALUE)，负数在-(2 ^ (-1027)) and -(2 ^ 1024)之间的数字。但是只能安全的存储-(2 ^ 53 - 1)(Number.MIN_SAFE_VALUE)到2 ^ 53 - 1 (Number.MAX_SAFE_VALUE)的值。如果超过了这个范围，js不能再安全的表示整数，它们会由双精度浮点近似值表示。可以通过Number.isSafeInteger()来判断是不是在安全值范围内。

- 几个规则
  - Positive values greater than Number.MAX_VALUE are converted to +Infinity.
  - Positive values smaller than Number.MIN_VALUE are converted to +0.
  - Negative values smaller than -Number.MAX_VALUE are converted to -Infinity.
  - Negative values greater than -Number.MIN_VALUE are converted to -0.

2. BigInt
超出了Numebr.MAX_SAFE_VALUE，Numebr.MAX_SAFE_VALUE的范围，就可以通过BigInt来表示。
> 注意事项：不能将BigInt类型和其他类型混合进行运算，否则会报错。

#### 判断一个数字是不是NaN的方法
- Object.is()
- typeof a === 'number' && a !== a
- isNaN
- Number.isNaN()
> isNaN会先把value转number. Number.isNaN不会。
> isNaN() method returns true if a value is Not-a-Number. Number.isNaN() returns true if a number is Not-a-Number.

> Number.isNaN('aaa')   // false
> isNaN('aaa')  // true

3. string
- 单引号
- 双引号
- ``反引号

4. 布尔值boolean

5. undefined

6. null

7. symbol
用于创建唯一的key
- 使用场景
  - 唯一的属性key => 不会产生冲突。可以使用Symbol.iterator来实现迭代器
  - 用来表示一些常量 => 这个感觉有些牵强，场景不是太多
```javascript
const COLOR_RED    = Symbol('Red');
const COLOR_ORANGE = Symbol('Orange');
const COLOR_YELLOW = Symbol('Yellow');
const COLOR_GREEN  = Symbol('Green');
const COLOR_BLUE   = Symbol('Blue');
const COLOR_VIOLET = Symbol('Violet');

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_ORANGE:
            return COLOR_BLUE;
        case COLOR_YELLOW:
            return COLOR_VIOLET;
        case COLOR_GREEN:
            return COLOR_RED;
        case COLOR_BLUE:
            return COLOR_ORANGE;
        case COLOR_VIOLET:
            return COLOR_YELLOW;
        default:
            throw new Exception('Unknown color: '+color);
    }
}
```
- 注意点：不能强制转换symbol到string，比如'a' + Symbol(12), 只能通过显式的转换String(Symbol(112))
- 可以把Symbol作为属性key的操作
  - Reflect.ownKeys()
  - 通过[]读取的对象属性
  - Object.assign()
- 会忽略Symbol作为属性key的操作
  - Object.keys()
  - Object.getOwnPropertyNames()
  - for-in循环

> https://exploringjs.com/es6/ch_symbols.html#sec_overview-symbols

1. object