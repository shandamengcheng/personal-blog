# CSS面试题目

### 为什么出现CSS
HTML的设计初衷是作为一种标记语言，为文本赋予基本的结构和意义，比如标题，段落等。然而，人类是视觉发达的生物，随着互联网的普及和发展，HTML逐渐增加了对展示效果的支持。比如，使用粗体标签创建粗体的文字效果，table标签从用来展示数据变成页面布局的手段。这些导致HTML逐渐偏离了为内容赋予结构和意义的初衷。**CSS的出现把这些跟HTML混在一起的表现性给提取了出来，使其自成体系，达到<font color="orange">结构与表现分离</font>的目的**.

### CSS的优点
- 大部分网站，可提升可访问性和加载速度 => CSS文件可以压缩成很小，且规则可以复用
- 开发人员和设计人员来说
  - 一种专门用于控制视觉样式和布局的语言
  - 在同一网站中更易于重用的样式
  - 通过关注点分离得到良好的代码结构

### CSS层叠机制
CSS，全名层叠样式表。在复杂的样式表中可能存在两条或多条规则应用到同一个元素的情况。浏览器通过<font color="orange">层叠</font>的机制进行冲突处理。层叠机制的原理是：为规则赋予不同的重要程度。
CSS的层递机制如下：
- 找到匹配特定元素的所有样式规则
- 根据显示权重排序元素所有规则声明。以!important标记的规则比没有标记的权重高。
- 根据来源排序所有规则声明。声明有三个来源：作者样式，用户样式以及用户代理。优先级关系为：作者样式 > 用户样式 > 用户代理。但是要注意，用户样式的!important规则的权重高于作者样式表中的!important规则声明。
  - 权重由高到低为：
    - transition声明
    - 标注为!important的用户代理
    - 标注为!important的用户样式
    - 标注为!important的作者样式
    - animation声明
    - 作者样式
    - 用户样式
    - 浏览器（或用户代理）的默认样式
- 根据特殊性（或，特指度）进行排序。特殊性高的声明具有较高的权重。
- 根据声明的前后顺序应用。

#### CSS层叠机制之特殊性
为了量化规则的特殊性，每种选择符都对应一个数值。一条规则的特殊性就表示为：<font color="orange">其每个选择符的累加数值。但是这里的累加不是十进制的累加，而是基于位置累加，以保证10个类选择符（或大于10的任意个）累加的特殊性不会大于等于1个ID选择符的特殊性。</font>
如果某条规则中的选择符的数量没有达到10个，简单起见，也可以用十进制来表示。
<hr />
<br />

任何选择符的特殊性都对应于如下四个级别，即a,b,c,d
- 行内样式，a为1
- b等于ID选择符的数量
- c等于类选择符、伪类选择符及属性选择符的数量
- d等于元素选择符和伪元素选择符的数量

> 参考： https://specifishity.com/

#### 来源
> https://www.w3.org/TR/css-cascade-4/#cascade-origin-transition

**注意**
- 通用选择符（*）的特殊性为0
- 继承的样式没有任何特殊性，连0都说不上。因此，通用选择符设置的样式会覆盖继承的样式。

### CSS中应用样式到HTML的方式
- link标签 => 外部样式表
  - 外部样式表可以在多个页面中复用。
  - 属性：
    - rel: relation的简称，一般是stylesheet, 有的浏览器还支持候选样式表（alternate stylesheet） => 需要用户自己进行切换。
    - type： 值始终是text/css，说明加载的数据类型
    - href: 样式的URL
    - media: 一个或多个媒体描述符，指明媒体的类型，多个媒体描述符通过逗号分开。
    - title: 用来做样式表的区分。
  > 一个文档可以关联多个样式表。最初显示时，只会使用rel为stylesheet的link标签链接的样式表。如果多个rel为stylesheet的样式表使用了不同的title, 只会应用一个样式表，根据浏览器的实现有所不同。如果不加title，那就是永久样式表，始终用于显示文档。
- style元素 => 文档样式表 或 嵌入样式表
  - 始终以<style type="text/css>开头
- @import指令
  - @import指令要在其他CSS规则前面。
  - @import指令导入的每个样式都会使用，不能指定候选样式表
  - 可以指定媒体类型： @import url(sheet.css) screen,print
  - 遵守规范的用户代理会忽略放在样式规则后面的@import指令。
- 行内样式
  - 元素的style属性设置，且style的值只能是一系列的规则声明。
  - 通常不建议使用，CSS的一些优点就不能使用了。

#### 性能
选择以什么方式把CSS加载到页面，决定了浏览器显示页面的速度。现代浏览器页面渲染完成至少需要： HTML和 全部的CSS。
- 减少http请求
- 压缩和缓存内容
- 不让浏览器渲染阻塞js

### 选择符
- 元素选择符
- ID选择符
- 类选择符
- 伪类选择符
- 元素选择符
- 伪元素选择符
  - ::first-letter, ::first-line => 只能应用于块级元素
  - ::before, ::after
- 后代选择符
- 子代选择符
- 相邻兄弟选择符 => 同一个父元素内
- 一般兄弟选择符 => 同一个父元素内
- 群组选择符 eg: div, p {....}
- 通用选择符
> 一个ID能且只能使用一次。虽然浏览器不一定总会检查HTML中的ID是否唯一，但是通过DOM API比如getElementById获取元素时，只会返回第一个元素。querySelectorAll会返回所有的，querySelector只会返回第一个
> ID选择符不能串起来使用。比如 <id id="a,b"></div>这样是错误的

### CSS隐藏元素的方法
- display: none => 重排
- visibility: hidden; => 重绘
- opacity: 0
- rgba
- transform: scale(0) or transform: translate(-999px,0px)
- clip-path, eg: clip-path: circle(0)
- HTML hidden属性
- position: absolute 设置-999px
- height: 0 + overflow: hidden

### 盒模型
conent + padding + border + margin
> 上下方位的内外边距如果是百分比，则基于包含块的宽度来进行计算。
> 行内盒子的高度不受垂直方向上的内边距，边框，外边距的影响。给行盒子设置宽，高也不会起作用。

### 包含块
完全根据元素的position属性来进行判断。
- position是static, relative 或sticky，包含块由最近的祖先**块元素**（比如，inlint-block, block, list-item元素）的内容区的边界组成，也可以会建立格式化上下文（比如，一个table container, flex container, grid container, 或者是 the block container 自身）


- 如果 position 属性为 absolute ，包含块就是由它的最近的 position 的值不是 static （也就是值为fixed, absolute, relative 或 sticky）的祖先元素
  - 祖先是块级元素，容纳块是祖先元素的内边距区的边缘组成
  - 祖先是行内元素，容纳块是祖先元素的内容边界。
  - 没有祖辈元素，容纳块是初始容纳块


- 如果 position 属性是 fixed，在连续媒体的情况下 (continuous media) 包含块是 viewport ,在分页媒体 (paged media) 下的情况下包含块是分页区域 (page area)。


- 如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近祖先元素的内边距区的边缘组成的：
  - transform 或 perspective 的值不是 none
  - will-change 的值是 transform 或 perspective
  - filter 的值不是 none
  - contain 的值是 paint (例如: contain: paint;)
- 根元素 (<html>) 所在的包含块是一个被称为初始包含块的矩形。他的尺寸是视口 viewport (for continuous media) 或分页媒体 page media (for paged media).

> https://www.w3.org/TR/css-position-3/#def-cb
> https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#see_also

#### 根据包含块计算百分值
- 要计算 height top 及 bottom 中的百分值，是通过包含块的 height 的值。如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 auto。
- 要计算 height top 及 bottom 中的百分值，是通过包含块的 height 的值。如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 auto。

### 外边距折叠  => 块盒子
> https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing#see_also
对于块级标签。垂直方向上的两个外边距相遇会发生折叠行为。

### 行内元素与边距
应用到行内非置换元素的内边距对行高没有任何影响。置换元素的内边距对行高有影响，会填充到四边。