# Render Prop 模式

> Render Prop模式是在多个组件中复用相同逻辑的方式之一。

> A render prop is a prop on a component, which value is a function that returns a JSX element. The component itself does not render anything besides the render prop. Instead, the component simply calls the render prop, instead of implementing its own rendering logic.

> Components can be made very reusable, by using a render or children prop.

```react
<Title render={() => <h1>I am a render prop!</h1>} />

const Title = props => props.render();
```


> https://www.patterns.dev/posts/render-props-pattern/