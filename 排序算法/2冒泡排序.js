/*
 * @Author: your name
 * @Date: 2020-12-06 19:23:30
 * @LastEditTime: 2021-01-17 18:03:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \7leetcode\2冒泡排序.js
 */
// // 冒泡排序基本思路：每次相邻两个元素进行比较，较大的值往上冒(交换值)
// // 每冒一次泡会找出当前的最大值，
// // 例如：第一次冒泡，找出的最大值放在数组的末尾，
// // 第二次冒泡，找出此最大值放在数组的倒数第二位
function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// console.log(
//   bubbleSort([1, 9, 3, 3, -1, -2, -10, 10])
// );
// // 空间复杂度O(1)
// // 时间复杂度O(n^2)