## CSS中的值和单位

### CSS中的单位
1. 绝对单位

常见的如in(英寸)、厘米、毫米、四分之一毫米(q)、点(pt)、像素(px)

2. 相对单位

- em 
  - 1em等同于元素的font-size的大小
  - 如果元素的font-size使用em进行设置，那么em是相对于父元素的font-size的。
- ex 元素字体中的x的高度
- ch 元素字体中"0"的进距（进距表示一个字符的开始到下一个字符的开始之间的距离。）
- rem 相对于根元素的font-size的大小。
- vw 浏览器视口宽度的1%
- vh 浏览器视口高度的1%
- vmin vh与vw中较小的那个
- vmax vh与vw中较大的那个

3. 分辨率单位 => 用于在媒体查询中表示输出设备的像素密度，即分辨率。
- dpi  点每英寸
- dpcm 点每厘米
- dppx 点每px
**详情参见:** https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
### CSS中的值
1. 百分数 %
- 元素内外边距的百分值： 相对于父元素的宽度。
- 百分数宽度：相对于父元素的宽度
- 百分数高度：相对于**父元素的高度**，如果父元素的高度不确定，则默认为auto
- 百分数的font-size：相对于父元素的font-size

2. 计算值 calc()
- ***计算的结果一定要是带有长度单位***
- 如果是+, -运算，那么在运算符的两侧一定要有空隔。主要是为了与表示正负的正负号区别。
- *的一侧一定是一个<number>类型，确保计算结果为长度单位。
- /的右边必须是<number>类型，且不能为0

3. 属性值 attr()
- 通过attr(元素属性名)可以获取元素的属性值 
> 实例： https://codepen.io/shandamengcheng/pen/yLgvGEq
4. 颜色
- 具名颜色，如red, blue等
- 十六进制， 如#123133
- RGB && RGBa 
  - RGB的值可以是0% ~ 100%， 或0 ~ 255， 但是**不能混用**。且超出范围会"就近截断"。
  - a表示不透明度，取值范围为0~1，0表示完全透明，1表示完全不透明。
- HSL && HSLa
  - 色相：角度值0~360
  - 饱和度：0%（无饱和度）~100%（完全饱和）
  - 明度：0%（全暗）~100%（全明）
- CSS表示透明的关键字 transparent 等同于 rgba(0,0,0,0)
- currentColor关键字

  CSS3中指出，可以在所有接收颜色的属性处使用currentColor。currentColor的值等同于当前元素经过计算(computed)后的color的值。如果给color设置currentColor，则等同于color: inherit;
5. 角度
- deg 角度，一圈有360度
- grad 百分度 一圈有400百分度
- rad 弧度 一圈有2π弧度
- turn 圈数
6. 时间
- s, ms,
- Hz: 表示每秒发生的次数。  kHz
7. 位置
- left, top, bottom, right, center等。
8. 自定义属性
- CSS中支持了自定义属性值，通过设置自定义属性，可以实现属性值的高效复用。后面会详细介绍。
9.  无单位的值
- 在CSS中一些属性可以接受无单位的值，比如line-height, font-weight。一个无单位的0只能用于长度值和百分比，不能用于角度和时间相关的值。