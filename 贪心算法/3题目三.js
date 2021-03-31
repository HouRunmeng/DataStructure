/*
 * @Author: your name
 * @Date: 2021-03-31 18:34:36
 * @LastEditTime: 2021-03-31 19:37:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\贪心算法\3题目三.js
 */

// 给定一定的资金w
// 现有一系列项目,项目需要一些费用,假定项目均能成功完成,且均会优收益
// {
// 花费
// cost: number,
// 收益
// profit: number,
// }
// 现规定K(一共可以做的项目个数),项目之间只能串行进行
// 使用贪心策略,求做完k个项目,能够获得的最大利润

// 贪心策略:小根堆,按照花费的大小由小到大排序,表示被锁住的项目,初始为满
// 大根堆:按照利润的大小存放,存放释放的项目,初始为空
// 思路:小根堆按照花费由小到大排列
// 每次选择不超过启动资金的项目压入大根堆,大根堆按照利润由大到小排序,
let programmers = [{
    cost: 3,
    profit: 1
}, {
    cost: 7,
    profit: 1
}, {
    cost: 1,
    profit: 7
}, {
    cost: 6,
    profit: 9
}, {
    cost: 100,
    profit: 400
}];

function getMaxValue(programmers, count, startFund) {
    let maxProfix = startFund;
    let smallHeap = [];
    let bigHeap = [];
    // forEach不会改变原数组
    programmers.forEach(item => {
        console.log(item);
        smallHeap.push(item)
    })
    smallHeap.sort((a, b) => b.cost - a.cost);
    for (let i = 0; i < count; i++) {
        while (smallHeap[smallHeap.length - 1].cost <= maxProfix && smallHeap.length !== 0) {
            bigHeap.push(smallHeap.pop());
        }
        bigHeap.sort((a, b) => a.profit - b.profit);
        // 启动资金过高,大根堆本来为空,while循环也没有添加项目
        // {1,2}{3,4}{10000,20000}
        if (bigHeap.length == 0) {
            return maxProfix;
        }
        maxProfix += bigHeap.pop().profit;
    }
    return maxProfix
}

console.log(getMaxValue(programmers, 3, 2));

// 获取数据流的中位数