[toc]

### description
In this kata, you will write a function that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5 (since arr[3] equals 5).

The output will be returned as an object with two properties: pos and peaks. Both of these properties should be arrays. If there is no peak in the given array, then the output should be {pos: [], peaks: []}.

Example: pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) should return {pos: [3, 7], peaks: [6, 3]} (or equivalent in other languages)

All input arrays will be valid integer arrays (although it could still be empty), so you won't need to validate the input.

The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

Also, beware of plateaus !!! [1, 2, 2, 2, 1] has a peak while [1, 2, 2, 2, 3] and [1, 2, 2, 2, 2] do not. In case of a plateau-peak, please only return the position and value of the beginning of the plateau. For example: pickPeaks([1, 2, 2, 2, 1]) returns {pos: [1], peaks: [2]} (or equivalent in other languages)

Have fun!



### 解决方案：使用双指针，一个指针用于遍历，一个用于指示位置
```javascript
function pickPeaks(arr){
  var result = {pos: [], peaks: []};
  if(arr.length > 2) {
    var pos = -1;
    for(var i=1; i<arr.length;i++){
      if(arr[i] > arr[i-1]) {
        pos = i;
      } else if(arr[i] < arr[i-1] && pos != -1) {
        result.pos.push(pos);
        result.peaks.push(arr[pos]);
        pos = -1;
      }
    }
  }
  return result;
}
```

### 自己的解决方案
```javascript
function pickPeaks(arr){
  let result = {pos:[],peaks:[]}
  if(!arr || arr.length <= 2) {
    return result
  }
  for (let i = 1, len = arr.length; i < len - 1; i++) {
    if (arr[i] > arr[i-1] && arr[i] > arr[i + 1]) {
      result.pos.push(i)
      result.peaks.push(arr[i])
    }
    if (arr[i] > arr[i-1] && arr[i] === arr[i + 1]) {
      for (let j = i + 2; j < len; j++) {
        if (arr[i] < arr[j]) {
          break
        }
        if (arr[i] > arr[j]) {
          result.pos.push(i)
          result.peaks.push(arr[i])
          break
        }
      }
    }
  }
  return result
}
```
这里效率会比较低，两层循环嵌套。