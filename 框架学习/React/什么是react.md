# 什么是React

根据官网及维基百科的定义，React或React.js是一个免费的，且开源的Javascript库。它基于UI组件来构建用户界面，它将页面划分为单独的组件来简化页面开发。

2012 年，当 Facebook 广告使用简单的 HTML 代码变得更加复杂时，创建了 React。从那时起，它于 2013 年开源并被软件开发人员使用。由Meta公司和由个人开发者及一些公司组成的社区共同维护。

React可以用做是开发单页应用，移动应用或使用像Next.js框架的服务端渲染应用的基础。然而，React只关注状态管理和状态到DOM的渲染，因此，创建React应用程序通常需要使用其他的库来进行路由导航以及某些客户端的功能。

总结一句话：**React是一个开源的，声明式的，组件化的，一次学习，跨平台编写的用于构建用户界面的Javascript库**。

- 声明式：(state => UI, 中间细节不用关心)
  - 使创建交互式应用更加简单。
  - 为应用程序中的每个状态设计简单的视图，当数据变化时，React会高效地更新和渲染合适的组件
  - 声明式视图使代码变得更加可预测的，且更加容易来调试。

- 组件化的
  - 构建管理自己状态的封装的组件，然后组合它们来构建更复杂的UI
  - 组件逻辑是通过JS而非模版进行编写的，这样可以轻松地通过应用程序传递大量的数据，并且保持状态与DOM分离。

- 一次学习，跨平台编写
  - 无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。
  - React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。
