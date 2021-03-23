/*
 * @Author: your name
 * @Date: 2020-12-07 11:16:45
 * @LastEditTime: 2021-03-23 19:36:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \7leetcode\5归并排序(未实现).js
 */

// 归并排序，
// 步骤
// 1.左边部分排序，
// 2.右边部分排序
// 3.合并

function mergeSort(arr, L, R) {
    if (L == R) {
        return;
    }
    let M = L + ((R - L) >> 1);
    mergeSort(arr, L, M);
    mergeSort(arr, M + 1, R);
    merge(arr, L, M, R);
}

// L为最左边
// M为中间
// R为最右边
function merge(arr, L, M, R) {
    let index = 0;
    let tempArr = [];
    // ptr1为左边部分的开始
    let ptr1 = L;
    // ptr2为右边部分的开始
    let ptr2 = M + 1;
    while (ptr1 <= M && ptr2 <= R) {
        tempArr[index++] = arr[ptr1] <= arr[ptr2] ? arr[ptr1++] : arr[ptr2++];
    }
    while (ptr1 <= M) {
        tempArr[index++] = arr[ptr1++];
    }
    while (ptr2 <= R) {
        tempArr[index++] = arr[ptr2++];
    }
    for (let i = 0; i < tempArr.length; i++) {
        arr[L + i] = tempArr[i];
    }
}
// let arr = [9, 10, 7, 8, 3, 2, 9, 1];
// mergeSort(arr, 0, arr.length - 1);
// console.log(arr);

// 归并排序扩展
// 小和问题和逆序对问题
// 小和问题
// 在一个数组中，在当前元素的左边，比当前元素值小的进行累加，求累加和
// [1,3,4,2,5]
// 3左边小的有1
// 4左边小的有1 3
// 2         1
// 5         1 2 3 4 
// 1 + 1 + 3 + 1 + 1 + 2 + 3 + 4 = 16 
// 思路：1右边有四个数比他大，产生四个1
// 3右边有两个数比他大,产生两个3
function smallSum(arr, L, R) {
    if (L == R) {
        return 0;
    }
    let M = L + ((R - L) >> 1);
    return smallSum(arr, L, M) + smallSum(arr, M + 1, R) + merge1(arr, L, M, R)
}

// L为最左边
// M为中间
// R为最右边
function merge1(arr, L, M, R) {
    let index = 0;
    let tempArr = [];
    let sum = 0;
    // ptr1为左边部分的开始
    let ptr1 = L;
    // ptr2为右边部分的开始
    let ptr2 = M + 1;
    while (ptr1 <= M && ptr2 <= R) {
        sum += arr[ptr1] < arr[ptr2] ? (R - ptr2 + 1) * arr[ptr1] : 0;
        tempArr[index++] = arr[ptr1] < arr[ptr2] ? arr[ptr1++] : arr[ptr2++];
    }
    while (ptr1 <= M) {
        tempArr[index++] = arr[ptr1++];
    }
    while (ptr2 <= R) {
        tempArr[index++] = arr[ptr2++];
    }
    for (let i = 0; i < tempArr.length; i++) {
        arr[L + i] = tempArr[i];
    }
    return sum;
}
// console.log(smallSum([1, 3, 4, 2, 5], 0, 4));

// 逆序对问题，在一个数组中，左边的数如果比右边的数大，则这两个数构成一个逆序对，返回逆序对的数量
function castleWalls(arr, L, R) {
    if (L == R) {
        return 0;
    }
    let M = L + ((R - L) >> 1);
    return castleWalls(arr, L, M) + castleWalls(arr, M + 1, R) + merge2(arr, L, M, R);
}

function merge2(arr, L, M, R) {
    let index = 0;
    let tempArr = [];
    let sum = 0;
    let ptr1 = L;
    let ptr2 = M + 1;
    while (ptr1 <= M && ptr2 <= R) {
        sum += arr[ptr1] > arr[ptr2] ? (R - ptr2 + 1) * 1 : 0;
        tempArr[index++] = arr[ptr1] < arr[ptr2] ? arr[ptr1++] : arr[ptr2++];
    }
    while (ptr1 <= M) {
        tempArr[index++] = arr[ptr1++];
    }
    while (ptr2 <= R) {
        tempArr[index++] = arr[ptr2++];
    }
    return sum;
}
// console.log(castleWalls([1, 3, 4, 2, 5], 0, 4));

// 非递归形式
// 依次使P = 2,4,8,16
// 使相邻的2个，4个，8个...进行合并