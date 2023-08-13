## Object.fromEntries
> 将可遍历的对象转化为普通对象。

```javascript
// 转换Map
const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }

// 转换数组
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"],
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }

const students = [
  {
    name: 'jona',
    age: 20
  },
  {
    name: 'celia',
    age: 22
  }
]
const studentMap = Object,fromEntries(
  students.map(info => [info.name, info.age])
)
```