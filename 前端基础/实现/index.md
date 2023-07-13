// 实现Emitter / pub-sub
function Emitter() {
  const all = new Map();
  return {
    all,
    on(type, handler) {
      const handlers = all.get(type);
      if (!handlers) {
        all.set(type, [handler])
      } else {
        handlers.push(handler)
      }
    },
    // handler可选的
    off(type, handler) {
      const handlers = all.get(type);
      if (!handlers) {
        return;
      }
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      } else {
        all.set(type, [])
      }
    },
    // val可选的
    emit(type, val) {
      let handlers = all.get(type);
      if (!handlers) {
        return
      }
      handlers.slice().map(handler => handler(val))
    }
  }
}
// https://github.com/developit/mitt/blob/main/src/index.ts
// https://stackoverflow.com/questions/1822350/what-is-the-javascript-operator-and-how-do-you-use-it


// 实现并发请求 => es7实现
const asyncPool = async (poolLimit, iterable, iteratorFn) => {
  const ret = [];
  const execute = new Set()
  for (const item of iterable) {
    const p = Promise.resolve().then(() => iteratorFn(item, iterable))
    ret.push(p);
    execute.add(p);
    const clean = () => execute.delete(p);
    p.then(clean).catch(clean);
    if (execute.size >= poolLimit) {
      await Promise.race(execute);
    }
  }
  return Promise.all(ret);
}

// 实现并发请求 => 结合es9 for await of 来实现
async function* asyncPools(poolLimit, iterator, iteratorFn) {
  const executing = new Set();
  for (const item of iterator) {
    const promise = Promise.resolve().then(() => iteratorFn(item, iterator));
    executing.add(promise);
    const clean = () => executing.delete(promise);
    promise.then(clean).catch(clean);
    if (executing.length >= poolLimit) {
      yield await Promise.race(executing);
    }
  }
  while (executing.length) {
    yield await Promise.race(executing)
  }
}

// 第二种方式
async function* asyncPool(poolLimit, iterator, iteratorFn) {
  const executing = new Set();
  async function consume() {
    const [promise, value] = await Promise.race(executing);
    executing.delete(promise);
    return value
  }
  for (const item of iterator) {
    const promise = (async () => await iteratorFn(item, iterator))().then(value => [promise, value])
    executing.add(promise);
    if (executing.length >= poolLimit) {
      yield await consume()
    }
  }
  while (executing.length) {
    yield await consume()
  }
}

// 使用
const timeout = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));
for await (const ms of asyncPool(2, [1000, 5000, 3000, 2000], timeout)) {
  console.log(ms);
}

// 实现Promise.all方法
Promise.all = (iterator) => {
  return new Promise((resolve, reject) => {
    if (!iterator || !iterator.length) {
      return resolve([]);
    }
    const result = [];
    let count = 0;
    for (let i = 0; i < iterator.length; i++) {
      Promise.resolve(iterator[i]).then(res => {
        result[i] = res;
        if (++count === iterator.length) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
}

// Promise.race
Promise.race = (iterator) => {
  return new Promise((resolve, reject) => {
    for (const item of iterator) {
      Promise.resolve(item).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    }
  })
}

// debounce => 每次wait时间内触发都会重新等待wait时间
function debounce(func, wait, immediate) {
  let context, args, timeout, result, previous;

  var later = function() {
    const passed = Date.now() - previous;
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args)
      }
      if (!timeout) 
      args = context = null;
    }
  }

  var debounced = function() {
    context = this;
    args = arguments;
    previous = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) {
        result = func.apply(context, args);
      }
    }
    return result;
  }

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = args = context = null
  }

  return debounced
}


// throttle => 给定时间内只触发一次
function throttle(func, wait) {
  let timeout, context, args, result;
  let previous = 0;

  var later = function() {
    previous = 0;
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  }

  var throttled = function() {
    let now = Date.now();
    context = this;
    args = arguments;
    if (!previous) {
      previous = now;
    }
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      result = func.apply(context, args);
      previous = now;
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
    return result;
  }

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null
  }
  return throttled;
}


// 数组扁平化
// 1. 递归
const flat = (arr) => {
  let res = [];
  arr.map(item => {
    if (Array.isArray(item)) {
      res.push(...flat(item))
    } else {
      res.push(item)
    }
  })
  return res;
}
// 2. Array.flat()方法
// 3. 如果数组的Item类型相同且固定，可以通过String(arr).split(',').map(...)来处理

// 浅拷贝
// 1. ...展开运算符
// 2. Object.assign()
// 3. 遍历一层处理

// 深拷贝
// 1. JSON.stringify() => 
// 2. structureClone()
// lodash or underscore


// 实现 sum(1)(2,3)(4,5,6)...()
const sum = (...args) => {
  const result = args.reduce((sum, num) => sum + num, 0);
  return (...args) => {
    if (args.length === 0) {
      return result;
    }
    return sum(result, ...args)
  }
}

// 选择排序  => 选择最小的，交换
// O(N ^ 2), 不稳定排序 （nums为[4,4,3,1] => 顺序会发生变化）
function selectSort(nums) {
  let n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    let k = i;
    for (let j = i + 1; j < n; j++) {
      if (nums[k] > nums[j]) {
        k = j;
      }
    }
    [nums[i], nums[k]] = [nums[k], nums[i]]
  }
}

// 冒泡排序
// 最坏O(n^2), 数组有序O(n)
// 稳定排序，相等元素不交换
function bubbleSort(nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    for (j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
      }
    }
  }
}
// 优化，如果某一次冒泡循环没有移动任何一个元素，说明已经是有序的了
function bubbleSort2(nums) {
  for (let i = nums.length -1; i >= 0; i--) {
    let flag = false;
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j+1]) {
        flag = true;
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
      }
    }
    if (!flag) {
      break;
    }
  }
}

// 插入排序 => 插入之前的有序数组中
// O(n^2), 稳定
function inserationSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let base = nums[i];
    j = i - 1;
    while (j >= 0 && nums[j] > base) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = base;
  }
}

// 快排
// O(nlogn), 空间O(n)
// 非稳定


// toBinary
function toBinary(string) {
  const codeUnits = Unit16Array.from({
    length: string.length
  },
  (element, index) => string.charCodeAt(index));
  const charCodes = new Uint8Array(codeUnits.buffer);
  let resut = '';
  charCodes.forEach(char => {
    result += String.fromCharCode(char);
  })
  return result;
}


### 实现compose函数
```javascript
let middleware = []
middleware.push((next) => {
    console.log(1)
    next()
    console.log(1.1)
})
middleware.push((next) => {
    console.log(2)
    next()
    console.log(2.1)
})
middleware.push((next) => {
    console.log(3)
    next()
    console.log(3.1)
})
let fn = compose(middleware)
fn()
/*
1
2
3
3.1
2.1
1.1
*/
// 实现compose函数
function compose(middlewares) {
  return () => {
    let index = 0;
    let middleware = middlewares[index];
    let nextMiddleware = () => {
      if (index === middlewares.length - 1) {
        return
      } else {
        index++;
        middleware = middlewares[index];
        middleware(nextMiddleware)
      }
    }
    middleware(nextMiddleware)
  }
}
```
<hr />

```javascript
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
function compose(...fns) {
  if (!fns.length) {
    return args => args;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce((a,b) => (...args) => a(b(...args)))
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
```

### 实现new
```javascript
const new = function(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('fn need to be a function')
    return
  }
    const obj = Object.create(fn.prototype);
    const res = fn.apply(obj, args);
    return (typeof res === 'object' && res !== null || typeof res === 'function') ? res : obj;
}
```

### 多维数组拍平
```javascript
  const flatFn = (array) => {
    return arr.reduce((res, item) => res.concat(Array.isArray(item) ? flatFn(item) : item), [])
  }
```

### 实现缓存函数
```javascript
  const memoize = (func) => {
    if (typeof func !== 'function') {
      throw new TypeError('Expected a function')
    }
    const memoized = function(...args) {
      const key = args.toString();
      const cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    }
    memoized.cache = new Map();
    return memoized;
  }
```

### base64 to File
```javascript
  function dataURLToFile(dataurl, mime, filename) => {
    let str = atob(dataurl);
    let n = str.length;
    let u8arr = new Unit8Array(n);
    while (n--) {
      u8arr[n] = dataurl.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime
    })
  }
```

## 排序专题
### 冒泡排序
```javascript
  function bubble(nums) {
    const length = nums.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (nums[j] > nums[j+1]) {
          [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
        }
      }
    }
  }
```

### 插入排序
```javascript
  function insert(nums) {
    let length = nums.length;
    let previous, current;
    for (let i = 1; i < length; i++) {
      previous = i - 1;
      current = nums[i];
      while (previous >= 0 && nums[previous] > current) {
        nums[previous + 1] = nums[previous];
        previous--;
      }
      nums[previous + 1] = current;
    }
  }
```

### 选择排序
```javascript
  function select(nums) {
    for (let i = 0; i < nums.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] < nums[minIndex]) {
        minIndex = j;
        }
      }
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
    }
  }
```

### 归并排序 => 不停的划分数组，然后分别排序后再合并排序
```javascript
  function mergeSort(nums) {
    if (nums.length < 2) {
      return nums;
    }
    let length = nums.length;
    const middle = Math.floor(length / 2);
    return merge(mergeSort(nums.slice(0, middle)),mergeSort(nums.slice(middle)))
  }

  function merge(left, right) {
    let res = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        res.push(left.shift())
      } else {
        res.push(right.shift())
      }
    }

    while (left.length) {
      res.push(left.shift())
    }

    while (right.length) {
      res.push(right.shift())
    }
    return res
  }
```

### 快排
```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
    let len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(nums, left = 0, right = nums.length - 1) {
  const pivot = nums[right];
  let pivotIndex = left;
  for (let i = left; i <= right; i++) {
    if (nums[i] < pivot) {
      swap(nums, i, pivotIndex);
      pivotIndex++;
    }
  }
  swap(nums, pivotIndex, right)
  return pivotIndex
}
function swap(nums,i = 0,j = 0) {
  [nums[i], nums[j]] = [nums[j], nums[i]]
}
quickSort([1,3,51,2,-1,24,64]) 
```