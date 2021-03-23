/*
 * @Author: your name
 * @Date: 2020-12-06 20:04:25
 * @LastEditTime: 2021-03-23 19:33:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \7leetcode\3插入排序.js
 */
// 插入排序基本思路
// 先使前1个有序
// 再使前2个有序
// 再使前3个有序
// 再使前...个有序
// 再使前n个有序

// 选择排序和初始的数组状态有关系

function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            }
        }
    }
    return arr;
}
console.log(
    insertSort([6, 1, 9, 3, 5, -1])
);


function insertSort2(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i + 1; j >= 0 && arr[j] < arr[j - 1]; j--) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        }
    }
    return arr;
}



// 复杂度
// 最坏时间复杂度O(n^2)
// 空间复杂度O(1)