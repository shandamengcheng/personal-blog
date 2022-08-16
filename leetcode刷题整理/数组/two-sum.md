### 题目：
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

> Example 1:

  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

> Example 2:

  Input: nums = [3,2,4], target = 6
  Output: [1,2]
> Example 3:

  Input: nums = [3,3], target = 6
  Output: [0,1]
 

> Constraints:

  2 <= nums.length <= 104
  -109 <= nums[i] <= 109
  -109 <= target <= 109
  Only one valid answer exists.
 

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

### 解法：
#### 自己的解法：
```javascript
var twoSum = function(nums, target) {
    let newNums = nums.concat()
    let len = newNums.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i+1; j < len; j++) {
            if (newNums[i] + newNums[j] === target) {
                return [i,j]
            } 
        }
    }
    return []
};
```

> 这种方式是常见的O(n^2)式的解法，只能说中规中矩。

>Runtime: 111 ms, faster than 62.31% of JavaScript online submissions for Two Sum.
> Memory Usage: 42.7 MB, less than 53.96% of JavaScript online submissions for Two Sum.

#### 别人的解法
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = new Map();
    
    for(let i = 0; i < nums.length; i ++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        } else {
            map.set(nums[i], i);
        }
    }
	return [];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	let hash = {};
	
	for(let i = 0; i < nums.length; i++) {
		const n = nums[i];
		if(hash[target - n] !== undefined) {
			return [hash[target - n], i];
		}
		hash[n] = i;
	}
	return [];
}
```

> Runtime: 98 ms, faster than 74.41% of JavaScript online submissions for Two Sum.
> Memory Usage: 43 MB, less than 36.20% of JavaScript online submissions for Two Sum.

分别使用了JS中原生的Object和Map能力。<font color="orange">**但是相对来说，是使用空间换时间**</font>