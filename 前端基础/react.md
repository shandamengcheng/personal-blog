1. diff => 不可中断，fiber后可中断diff
2. 类组件与函数组件
  - 代码没有fc简洁
  - 所有相关逻辑大量堆积在生命周期方法里面，结构不清晰
  - 逻辑复用比较困难 => render props + hoc => 都需要重新组织组件的结构
  - this难以理解
  - class不能很好的压缩，并且会使热重载出现不稳定的情况

3. state更新 => hooks上的queue
4. 调度


Vue编译优化
- 模版结构固定，灵活度低，但是易于分析
- JSX继承自js, 灵活度高，但不便于分析