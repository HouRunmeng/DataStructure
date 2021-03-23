/*
 * @Author: your name
 * @Date: 2021-03-23 19:32:12
 * @LastEditTime: 2021-03-23 19:33:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\1选择排序+二分扩展.js
 */

// 选择排序是最简单但是最没用的排序算法，也有优化空间
// 基本思想：每次从头到尾遍历元素，选择值最小的元素和之前的元素互换位置


function selectionSort(arr) {

    // let tempArr = [];
    // for (let i = 0; i < arr.length; i++) {
    //   tempArr.push(i);
    // }

    // i为lengt-1是因为j=i + 1;防止数组越界
    for (let i = 0; i < arr.length - 1; i++) {
        // index保存最小值的索引
        let index = i;
        for (let j = i + 1; j < arr.length; j++) {
            index = arr[j] < arr[index] ? j : index;
        }
        // 交换值，es6
        [arr[i], arr[index]] = [arr[index], arr[i]];

        // tempArr保存交换后原数组的索引
        // [tempArr[i], tempArr[index]] = [tempArr[index], tempArr[i]]

    }
    // return [arr, tempArr];
    return arr
}

// console.log(
//   selectionSort([5, 3, 5, 2, 1])
// );
// 复杂度分析
// 时间：O(n^2) 
// 空间：O(1)
// 注：空间复杂度指的是i必须额外分配的空间，本题中的原数组不是额外分配得到空间
// 平均时间复杂度O(n^2)
// 不稳定
// 即两个相等的数，第一个8在前，第二个8在后，排完序后，第一个8位于第二个8的后面，相对位置发生改变
// 例如[5,3,5,2,1]



// 对于已经有序的数组，给定一个值，找出该值<=数组中元素的左右边的位置
// 二分查找
function getRes(arr, value) {
    let L = 0;
    let R = arr.length - 1;
    // index用来记录最右边的序号
    let index = -1;
    while (L <= R) {
        let mid = Math.floor((L + R) / 2);
        if (value >= arr[mid]) {
            index = mid;
            L = mid + 1;
        } else {
            R = mid - 1;
        }
    }
    return index;
}
console.log(getRes([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5], 3));