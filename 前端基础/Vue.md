new In Vue3

1. 基于Proxy的全新响应式设计
  - 浏览器兼容问题
  - Object.definProperty 主要是监听对象上属性的变化，而不是对象本身。对于数组而言，该方法也能进行监听，比如直接对数组项的修改，但是对于一些操作方法，shift,unshift不太能很好的监听处理。所以对数组实现了方法的拦截。
2. Composition API => hooks的使用
3. ts支持
4. Fragment => 默认可以不用添加一个ROOT标签
5. Suspense组件
6. teleport => 类似于react中的protal


Vuex的流程：
state: 数据的存储，store中的唯一数据源
getter: 通过计算，返回相应state的计算值
mutations: 唯一修改state的地方，但是不能处理异步操作
actions: 处理异步操作，只能提交mutations（通过commit()）