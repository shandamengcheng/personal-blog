## CSS中的特殊值
- inherit

当inherit作为CSS属性的值时，会让元素继承父元素的属性值。可以把该值作用于可继承CSS属性，也可以应用于非继承属性上，**实现强制性的继承**。这个关键字的一般使用情况是： 强制继承。
> IE, Firefox, Safari中不支持。

- initial

这个关键字的作用是： 设置属性的默认值。**注意，是属性的默认值，不是HTML标签的。**比如说，div的display设置为initial,那么结果是inline。因为display的默认值就是inline,不管什么类型的标签。而对于块级元素来说，display的默认值就是block。因此，**要注意区分默认值和初始值。**默认值就是浏览器默认样式中的值，而初始值不是。

也可以通过设置属性值为initial来撤销某个元素的样式。

> - 注意：要注意initial与auto的区别，有些属性的initial的值为auto,有些不是。
> - IE中不支持initial属性值关键字。

- unset

unset对于可继承属性来说，作用相当于inherit。对于不可继承属性来说，作用相当于initial。
> IE中不支持unset关键字

- all

all表示除了direction和unicode-bidi之外的所有属性。
> IE中不支持

- revert

将样式回退到其他来源中的样式表中设置的值。

1. 作者样式表  ->  用户样式表
2. 用户样式表  ->  浏览器用户代理
3. 浏览器用户代理  ->  等同于unset的效果
> IE和Opera中不支持。


效果请看： https://codepen.io/shandamengcheng/pen/yLgpmRG

**更多阅读：** https://mp.weixin.qq.com/s/NmLa_AMe6womJBb0GRK-vg