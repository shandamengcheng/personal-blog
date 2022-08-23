### Remove Element

> Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The relative order of the elements may be changed.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

##### 解读
这一题和之前的移除重复重复的思路差不多。

#### 解决方案
1. 耗时较长
```javascript
var removeElement = function(nums, val) {
    let j = 0;
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] !== val) {
            nums[j] = nums[i]
            j++;
        }
    }
    return j
};
```
> 125 ms	42.2 MB
效率相对来说比较低

2. 相对较快 - 直接使用splice方法处理
> Runtime: 72 ms, faster than 81.19% of JavaScript online submissions for Remove Element.
> Memory Usage: 42 MB, less than 60.47% of JavaScript online submissions for Remove Element.
```javascript
var removeElement = function(nums, val) {
    for (let i = 0; i < nums.length; ) {
        if (nums[i] !== val) {
            i++;
        } else {
            nums.splice(i, 1)
        }
    }
    return nums.length
};
```

```javascript
var removeElement = function(nums, val) {
    while (nums.indexOf(val) >= 0) {
        nums.splice(nums.indexOf(val),1)
    }
    return nums.length
};
```