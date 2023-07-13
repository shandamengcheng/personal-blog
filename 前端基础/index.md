1. js创建对象的几种方式
- 对象字面量 {}
- new Object()
- 构造函数
- Object.create() => 参数一定要为obj或null, 如果为null, 生成对象的__proto__为undefined
- ES6 中的 Class

2. new的过程
- 创建一个空对象
- 对象的__proto__指向构造函数的prototype
- 作为构造函数的执行上下文中的this执行构造函数
- 如果执行返回对象，返回对象，否则返回上面的新对象

3. 实现new
```javascript
const myNew = (constructor, ...args) => {
  const obj = Object.create(constructor.prototype);
  let result = constructor.applt(obj, args);
  if (typeof result === 'object' && result !== null) {
    return result;
  } 
  return obj;
}
```