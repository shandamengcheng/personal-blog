### 描述

You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

 

Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
Example 3:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

### 思路 && 注意点
第一个想到的就是直接转换成整数再加一，然后转成数组。
但是，这里要注意超大数的相加。因此，要遍历数组，实现单个数值的相加。

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let pos = 0;
    for (let i = 0, len = digits.length; i < len; i++) {
        let value = +digits[len - 1 - i]
        value ++;
        pos = Math.floor(value / 10)
        digits[len - 1 - i] = value % 10
        if (pos === 0) {
            break
        }
    }
    if (pos !== 0) {
        digits.unshift(pos)
    }
    return digits
};
```

> Runtime: 56 ms, faster than 98.27% of JavaScript online submissions for Plus One.

> Memory Usage: 41.5 MB, less than 97.94% of JavaScript online submissions for Plus One.