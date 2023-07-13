## 事件
1. 事件流 => 三个阶段 
> 捕获 -> 处于目标阶段 -> 冒泡阶段
> dcoument -> html -> body -> ... -> body -> html -> document

### 添加事件的几种方式
1. html标签上onclick=""
2. addEventListener() => 给同一个事件添加多个处理函数，会依次调用执行
3. dom.onclick => 同一事件的多个相同处理函数会被覆盖
4. IE: attachEvent, detachEvent: 两个参数：事件名称和事件处理函数 => 冒泡阶段

### 事件对象 event
主要包含的字段：currentTarget, target, eventPhase(事件流的阶段), preventDefault(), stopPropagation(), type(事件类型)
<hr />
在事件处理程序内部，this对象始终等于currentTarget。 currentTarget表示事件处理程序挂载的节点。target表示事件实际触发的节点。

### 监听DOM变化的事件 => Mutation Observers

### 事件委托
还可以结合html自定义属性来使用，效果更佳。
<hr />
最适合使用事件委托的事件包括：click、mousedown、mouseup、keydown 和 keypress。
mouseover 和 mouseout 事件冒泡，但很难适当处理，且经常需要计算元素位置（因为 mouseout 会在光标从一个元素移动到它的一个后代节点以及移出元素之外时触发）。

## 内存泄漏
1. 无用的事件处理程序 => 不过现在的浏览器垃圾回收会处理掉非可达的对象（即使这些对象存在循环引用）
   1. 删除带有事件处理程序的元素
   2. 页面卸载

## this的指向
*函数调用时确定this的指向*