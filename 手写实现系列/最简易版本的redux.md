## 实现一个最简单的Redux

#### 实现Redux的createStore函数

```javascript
function createStore(reducer, preloadedState) {
    let state = preloadedState
    // 用来记录state的订阅者
    const listeners = []

    function getState() {
        return state
    }

    function subscribe(listener) {
        listeners.push(listener)
        return function unsubscribe() {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    // 初始化数据，根据传入的initial生成最初的state
    dispatch({action: '@@redux/INIT'})

    return { dispatch, getStore, subscribe }
}
```