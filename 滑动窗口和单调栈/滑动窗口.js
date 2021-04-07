// 获取滑动窗口的最大值（LR）
// 使用双端队列实现（存储的是索引）
// 且双端队列存储的索引在元素组中由左向右严格递减
// 实现思路：若R向右滑动，判断当前R所指向的元素是否大于双端队列尾部的元素，若不是
// 双端队列尾部的元素一次弹出，直到当前值小于弹出值，进行push，
// 注意：等于也不行，因为是严格递减的，若双端队列的元素等于当前元素值，仍要弹出
// L向右滑动，则判断移除的索引是否为滑动窗口第一个元素，若是删除滑动窗口的第一个元素，否则不进行操作

// 双端队列的含义:若已经形成了窗口，在R不动得情况下在L向右移的过程中，哪些元素会依次成为窗口的最大值

// 复杂度O(N)
// 但是单个点的复杂度未必是O(1)
// 7654321 8
// 在8之前的数均进入了双端队列，到达8之后，前面的数据均被舍弃，处理数字8的复杂度必然大于O(1),(O(N))

// 有环双端队列的题

// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
function maxSlidingWindow(nums, k) {
  if (nums.length < k || nums == null || k < 1 || nums.length == 0) {
    return [];
  }
  // 不放值,放索引
  let twoTerminalQueue = [];
  // 共有nums.length - k + 1个数
  let res = [];
  for (let i = 0; i < nums.length; i++) {

    // 窗口R右移进行的操作
    while (twoTerminalQueue.length !== 0 && nums[i] > nums[twoTerminalQueue[twoTerminalQueue.length - 1]]) {
      twoTerminalQueue.pop()
    }
    twoTerminalQueue.push(i);
    // i-k是过期的位置,即模拟L右移
    if (twoTerminalQueue[0] === i - k) {
      twoTerminalQueue.shift();
    }
    // i>= k - 1 说明之后窗口就形成了(因为此处的i从0开始)
    // 若索引由1开始,则i-k>=0说明窗口已经形成
    if (i >= k - 1) {
      res.push(nums[twoTerminalQueue[0]])
    }
  }
  return res;
}

console.log(
  maxSlidingWindow([7, 2, 4], 2)
);