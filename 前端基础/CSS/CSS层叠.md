# CSS层叠和继承
## 为什么需要层叠机制
  CSS的本质是声明样式规则，当在一个元素上应用多个样式时，可能会发生样式规则的冲突。层叠就是解决冲突的一系列规则。
## 层叠机制
> **层叠的本质是给不同的规则设置不同的重要程度以确定规则使用的优先级。**
### 解决样式冲突的依赖条件
- 样式表的来源
  - 创作人员样式表
  - 用户样式表
  - 用户代理
- 选择器优先级
  - 对应四个级别， 即a、b、c、d:
  - 内联样式级别最高，a为1
  - b为ID选择器的数目
  - c为类选择器 && 伪类选择器 && 属性选择器的数量
  - d为元素选择器 && 伪元素选择器的数量
  - 通配符、组合器(+, ~, >等)以及否定伪类:not()(**但是，在:not()内部声明的样式可以**)对优先级没有影响
  - 通配符(*)的优先级为0,0,0,0。继承不存在优先级。因此，通配符设置的样式的优先级大于元素继承的样式的优先级。
- 源码顺序
  - 当来源、优先级相同时，源码中位置靠后的规则被应用。
### !important规则
  在CSS中，可以通过在声明后面分号前加上!important来表示声明的重要性。!important对样式的优先级没有影响，但是会与普通的声明区分开来。其实，所有使用!important的声明都会放在一起，然后优先级关系就在这个范围内解决。同样，非重要（非!important）的声明也会放在一起，其中的冲突也是使用优先级关系解决。
```
p {
  font-size: 1.5em !important;
  color: red !important;
}
```
**注意：允许使用!important来覆盖规则**
#### !important的使用原则（一个总是，一个仅仅，两个绝不）
- 在使用!important之前，总是寻找使用优先级的方式
- 仅在用于覆盖外部CSS(来自外部库，如Bootstrap或normalize.css)的页面特定的CSS中使用!important
- 在编写插件或混搭程序时，绝不使用!important
- 绝不在网站范围内使用!important

#### 相对于使用!important,考虑：
1. 更好地利用CSS级联
2. 使用更具体的规则。通过在要选择的元素前指示一个或多个元素，规则将变得更加具体并获得更高的优先级：
```
<div id="test">
  <span>Text</span>
</div>
```

```
div#test span { color: green; }
div span { color: blue; }
span { color: red; }
```
通过上面的规则，文本颜色会变成绿色，因为第一个规则是更具体的。
3. 当没有更多选择器可以指定的话，可以通过重复简单的选择器来增加优先级
```
#myId#myId span { color: yellow; }
.myClass.myClass span { color: orange; }
```

#### !important的使用情况
1. 覆盖行内样式
使用行内样式和!important被认为是非常不好的做法，但有时候需要使用!important来覆盖行内样式，尤其是当使用一些第三方库的时候，库的作者可能会设置行内样式，此时如果我们需要覆盖的话，选择使用!important。
2. 覆盖高优先级
```
#someElement p {
  color: blue;
}

p.awesome {
  color: red;
}
```
如果想要文本颜色为red，这个时候由于样式二的优先级低于第一个，通过设置!important可以实现awesome中的样式覆盖someElement中的。
#### 如何覆盖!important
假设说当前有一个样式:
```
td { height: 100px !important; }
```
1. 添加另一个带有!important的规则，并为选择器赋予更高的优先级或者在现有的选择器后面添加具有相同选择器的CSS规则。
```
table td    { height: 50px !important; }
.myTable td { height: 50px !important; }
#myTable td { height: 50px !important; }

td { height: 50px !important; }
```
2. 最好重写原始规则，以避免!important的使用
```
[id="someElement"] p {
  color: blue;
}

p.awesome {
  color: red;
}
```
使用属性选择器而不是ID选择器，当需要进行覆盖时，可以避免使用!important。
### CSS层叠机制的完整过程：
1. 找到匹配相应元素的所有规则
2. 根据来源和重要性确定其优先关系：
   - Transition声明
   - 用户代理（浏览器默认样式）!important声明
   - 用户样式!important声明
   - 作者样式!important声明
   - Animation声明
   - 作者样式声明
   - 用户样式声明
   - 用户代理声明
3. 当来源相同时，根据样式规则的优先级大小判断应用的样式
4. 源码顺序。当来源，重要性，优先级相同时，以位置靠后的声明为准。
   - 导入样式表中的声明是按顺序排列的，就好像它们的样式表已经代替了@import规则一样
   - 原始文档中链接的样式表中的声明按照链接顺序进行连接。
   - 样式属性的声明是根据样式属性所在元素的文档顺序进行排列的，并且这些所有的声明都放置在任何样式表之后。
  > 样式属性指定元素的内联样式。 上面第三条的意思是：对于有内联样式的元素来说，内联样式根据所在的元素在文档中的顺序进行排列，内联样式的声明是放在所有样式表的后面的。（因为从距离上来说，内联样式距离元素更“近”，然后内联元素之间再根据优先级等进行层叠）。

## 继承

如果一个属性没有层叠值的话，该属性可能会继承某个祖先的值。
常见的可继承属性：
- 文本相关的属性: color, font, font-family, font-size, font-weight, font-varient, font-style, line-height, letter-spacing, text-align, text-indent, texxt-transform, white-space以及word-spacing
- 列表相关的属性: list-style, list-style-type, list-style-position以及list-style-image
- 表格的边框属性: border-spacing, border-collapse
**注意： 正如上文所提到的，继承的属性的优先级不存在，而通配符( * )设置的样式声明的优先级为0, 因此继承来的样式的优先级*小于*通配符设置的样式。**

#### 参考文献
1. 《CSS权威指南》
2. 《精通CSS 高级Web标准解决方案》
3. https://www.w3.org/TR/css-cascade-3/#cascading-origins
4. MDN https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
5. MDN https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#specificity_2
6. 《深入解析CSS》