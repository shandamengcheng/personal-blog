### Search Insert Position

> Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with<font color="orange"> O(log n) </font>runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4

#### 题目理解
题目里明确了使用复杂度为O(log n)的方式进行求解。由下面几个条件：
- sorted 数组
- search target
可以想到使用二分查找算法。具体实现如下：

#### 代码
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var searchHalfNums = function(nums, target) {
    if (nums.length <= 1) {
        return nums[0] > target ? 0 : 1
    }
     const half = Math.floor(nums.length / 2)
     if (target > nums[half]) {
            return half + searchHalfNums(nums.slice(half), target)
        } else {
            return searchHalfNums(nums.slice(0, half), target)
        } 
}

var searchInsert = function(nums, target) {
    const pos = nums.indexOf(target)
    if (pos > -1) {
        return pos
    } else {
       return searchHalfNums(nums,target)
    }
};
```
> 最终的结果是：

> Runtime: 80 ms, faster than 65.93% of JavaScript online submissions for Search Insert Position.

> Memory Usage: 41.9 MB, less than 83.93% of JavaScript online submissions for Search Insert Position.

_________________________________________
<hr/>
<br />
**但是，上面的代码还能优化**。不管target是否在nums中，都可以通过二分查找来判断，不用单独先通过indexOf来判断。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var searchHalfNums = function(nums, target) {
    if (nums.length <= 1) {
      // 只要在这里加个等号就可以判断target在nums中的情况
        return nums[0] >= target ? 0 : 1
    }
     const half = Math.floor(nums.length / 2)
     if (target > nums[half]) {
            return half + searchHalfNums(nums.slice(half), target)
        } else {
            return searchHalfNums(nums.slice(0, half), target)
        } 
}

var searchInsert = function(nums, target) {
       return searchHalfNums(nums,target)
};
```

> Runtime: 64 ms, faster than 91.35% of JavaScript online submissions for Search Insert Position.

> Memory Usage: 41.8 MB, less than 90.73% of JavaScript online submissions for Search Insert Position.

#### 其他解法
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    let m;
    while (l < r) {
        m = Math.floor((r + l) / 2)
        if (nums[m] === target) return m;
        if (nums[m] > target) {
            r = m
        }
        // m + 1 可能是target的位置，所以这里可以 + 1
        if (nums[m] < target) {
            l = m + 1
        }
    }
    return nums[l] >= target ? l : l + 1
};
```

> Runtime: 78 ms
> Memory Usage: 42.3 MB

<hr />


```javascript
function searchInsert(nums, target) {
    return binarySearch(nums, target, 0, nums.length - 1);
};


function binarySearch(array, target, start, end) {
    if (start > end) return start;
    
    const midPoint = Math.floor((start + end)/2);
    
	// found target
    if (array[midPoint] === target) return midPoint;
    
	// search the left side
    if (array[midPoint] > target) return binarySearch(array, target, start, midPoint - 1);
    // search the right side
    if (array[midPoint] < target) return binarySearch(array, target, midPoint + 1, end);
}
```

> Runtime: 75 ms, faster than 74.31% of JavaScript online submissions for Search Insert Position.

> Memory Usage: 42.3 MB, less than 37.60% of JavaScript online submissions for Search Insert Position.
