### description

Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
This image will illustrate things more clearly:

[![v5svOf.png](https://s1.ax1x.com/2022/09/01/v5svOf.png)](https://imgse.com/i/v5svOf)

### 解决方案

```javascript
snail = function(array) {
  let result = []
  while (array.length > 0) {
    result.push(...array.shift())
    // 这里要判断一下是否为空
    if (array.length > 0) {
      for (var i = 0; i < array.length; i++) {
          result.push(array[i].pop())
      }
      result.push(...(array.pop()|| []).reverse())
        for (var i = array.length -1; i >= 0; i--) {
            result.push(array[i].shift())
      }
    }
  }
  return result
}
```