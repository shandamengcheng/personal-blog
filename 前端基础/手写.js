// call 实现
Function.prototype.mycall = function (context) {
  if (typeof context !== 'function') {
    throw Error('type error')
  }
  context = context || window
  let args = [...arguments].slice(1)
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

// flat
function flaten(arr) {
  return arr.reduce((result, val) => {
    if (Array.isArray(val)) {
      result.push(...flaten(val))
      return result
    }
    result.push(val)
    return result
  },[])
}

// flat es6
function flatten(arr) {
  while (arr.some(Array.isArray)) {
      arr = [].concat(...arr);
  }
  return arr;
}

// 浅拷贝
  // Object.assign()
  // array: slice, concat method
function shallowCopy(obj) {
  if (!obj || typeof obj !== 'object' || typeof obj !== 'function') {
    return
  }

  const result = Arrau.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(val)) {
      result[key] = obj[key]
    }
  }
  return result
}

// 深拷贝
  // JSON.parse(JSON.stringify()) => undefined, Function, symbol值会被忽略
  var deepClone = (target, map = new WeakMap()) => {
    
  }


// 防抖
function debounce(func, wait, immediate) {
  let timeout = null
  const debounced = function() {
    let context = this;
    let args = [...arguments]

    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    let result

    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        fn.apply(context, args)
      }
    } else {
       timeout = setTimeout(() => {
        fn.apply(context, args)
       }, wait)
    }
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }
}

