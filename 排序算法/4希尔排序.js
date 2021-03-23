/*
 * @Author: your name
 * @Date: 2021-03-23 19:32:12
 * @LastEditTime: 2021-03-23 19:34:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \base\4希尔排序.js
 */
// 希尔排序（改进的插入排序）
// 基本思路
// 设置gap
// 按照一定间隔选择元素，将选中的元素使用插入排序
// 之后缩小间隔，重新排序
// 最后间隔为1重新排序

// 间隔比较大的时候，交换的次数比较少，
// 间隔比较小的时候，移动的距离比较短
// 因为希尔排序是跳着排，所以不稳定

// 间隔的选择
// 希尔原稿：他建议的初始距离为n/2, 
// 例：n=100,间隔增量序列为50，25，12，6，3，1

// Hibbard算法
// 增量的算法为(2^k) - 1
// 这种增量最坏的复杂度为O(n^1.5),
// 平均复杂度为O(n ^ 1.25)(平均复杂度未被证明)

// Sedgewick增量序列
// 94^i - 9*2^i + 12
// 或者4^i - 32^i + 1
// 这种增量最坏的复杂度为O(n^4/3),
// 平均复杂度为O(n^7/6)(平均复杂度未被证明)

// Knuth序列
// h = 1
// h = 3 * h + 1

function shellSort(arr) {
    // 不同的增量序
    // 1.希尔原稿
    // let gap = Math.floor(arr.length / 2);
    // while (gap >= 1) {
    //   for (let i = gap; i < arr.length; i++) {
    //     // j>gap - 1防止arr[j - gap]数组越界
    //     for (let j = i; j > gap - 1; j -= gap) {
    //       if (arr[j] < arr[j - gap]) {
    //         [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]]
    //       }
    //     }
    //   }
    //   gap = Math.floor(gap / 2);
    // }

    // Knuth
    let h = 1;
    while (h < arr.length / 3) {
        h = 3 * h + 1;
    }
    let gap = h;
    while (gap >= 1) {
        for (let i = gap; i < arr.length; i++) {
            // j>gap - 1防止arr[j - gap]数组越界
            for (let j = i; j > gap - 1; j -= gap) {
                if (arr[j] < arr[j - gap]) {
                    [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]]
                }
            }
        }
        gap = Math.floor((gap - 1) / 3);
    }
    return arr;
}
let arr = [9, 6, 11, 3, 5, 12, 8, 7, 10, 15, 14, 4, 1, 13, 2, -1, -10]

console.log(
    shellSort(arr)
);

console.log(arr);