# Hooks Pattern

#### Class Component
- this的理解不到位容易带来bug
- wrapper hell => 较难理解数据在应用程序中是怎么流动的，从而导致很难发现为什么非预期行为的发生的原因
- 复杂性：随着添加更多的逻辑在类组件中，组件的大小增长的很快。组件内的逻辑会变得混杂且结构凌乱的。生命周期方法也可能会导致一些代码的重复。


#### Hooks优势
- 复用
- 社区有许多可复用的hooks
- 可以把组件的逻辑分成更清晰的小块
![](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1641930050/patterns.dev/classicalvshooks2.001.png)
- 增加可测试性，灵活性和可读性
- 代码量更少
- 简化复杂组件
- 复用stateful logic
- 共享非可视化逻辑

#### Hooks注意点
- 要遵循它的规则
- 由于比较灵活，需要大量练习才能正确使用
- 注意不要错误使用


|  React Hooks  |	Classes  |
| ---  | --- |
|  It helps avoid multiple hierarchies and make code clearer	|  Generally, when you use HOC or renderProps, you have to restructure your App with multiple hierarchies when you try to see it in DevTools  |
|  It provides uniformity across React components.	|  Classes confuse both humans and machines due to the need to understand binding and the context in which functions are called.  |
