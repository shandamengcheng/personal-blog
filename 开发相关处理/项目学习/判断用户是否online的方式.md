# 判断用户是否online的方式

## 1. 使用`navigation.onLine`属性
```js
if (navigator.onLine) {
  // 用户在线
} else {
  // 用户离线
}
```
目前基本所有的浏览器都支持online/offline状态了，我们也可以通过监听`online`和`offline`事件来判断用户是否在线。

## 2. 根据ws的连接状态来判断
```js
const ws = new WebSocket('wss://example.com');
if (ws.readyState === WebSocket.OPEN) {
  console.log('WebSocket connection is open');
} else {
  console.log('WebSocket connection is closed');
}
ws.addEventListener('open', () => {
  console.log('WebSocket connection is open');
});
ws.addEventListener('close', () => {
  console.log('WebSocket connection is closed');
});
ws.addEventListener('error', () => {
  console.log('WebSocket error occurred');
});
```

## 3. 使用轮询的方式
```js
const ping = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/ping', true);
  xhr.send();
  xhr.onload = () => {
    console.log('online');
  };
  xhr.onerror = () => {
    console.log('offline');
  };
};
setInterval(ping, 1000);
```
