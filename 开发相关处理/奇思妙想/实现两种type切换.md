# 实现state的type切换的实现

### 背景：
此时，一个组件内部的state取值为"response" | 'header', 但是在组件内部，我们需要根据state的值来切换不同的组件，这时候就需要用到type切换了。

### 实现思路：
- 第一种实现
```javascript
function App() {
    const [type, setType] = useState<"respones" | "header">('response');
    return (
        <div>
            <button onClick={() => setType('response')}>response</button>
            <button onClick={() => setType('header')}>header</button>
            {type === 'response' ? <Response /> : <Header />}
        </div>
    )
}
```
- 第二种实现
```javascript
function App() {
    const [type, setType] = useState<"respones" | "header">('response');
    
    const handleTypeChange = (e) => {
        setType(e.currentTarget.dataset.key);
    }
    
    return (
        <div>
            {[{
                name: 'response',
            }, {
                name: 'header',
            }].map((item) => {
                return <button key={item.name} data-key={item.name} onClick={handleTypeChange}>{item.name}</button>
            })}
            {type === 'response' ? <Response /> : <Header />}
        </div>
    )
}
```

### 总结：
- 上面的两种方式都可以实现我们的目的。但是第二种方式的实现更加的灵活，因为我们可以通过循环的方式来实现，而不是写死的两个button。

- 且第一种方式的实现，如果我们需要添加一个新的type，那么我们就需要在组件内部添加一个新的button，这样就会导致组件的可维护性降低。

- 此外，第一种方式的函数组件的渲染次数会比第二种方式的函数组件的渲染次数多，因为第一种方式的函数组件在每次渲染时，都会重新创建一个新的函数，
而第二种方式的函数组件在每次渲染时，都会使用同一个函数。