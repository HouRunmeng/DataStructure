/*
 * @Author: your name
 * @Date: 2021-03-23 19:34:58
 * @LastEditTime: 2021-03-23 19:34:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\6快速排序.js
 */


// 快速排序
// 最好O(nlogn)
// 最坏O(n*n)
// 优化之后,可以使其收敛到O(nlogn)
// 参考文件28荷兰国旗
// 优化后的算法
function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]]
}

function quickProcess(arr, L, R) {
    if (L < R) {
        // 随机选取数组中的某一个树和数组最后一个元素交换位置,避免最坏的情况
        // 最坏情况:基准值左边均小于基准值,排序后,新的基准值左边均小于新的基准值
        swap(arr, L + Math.floor(Math.random() * (R - L + 1)), R);
        let p = partition(arr, L, R);
        // partition返回等于区的左边界和右边界,等于去不用再排序
        quickProcess(arr, L, p[0] - 1);
        quickProcess(arr, p[1] + 1, R)
    }
}

function partition(arr, L, R) {
    // arr[R]为基准值
    let less = L - 1;
    let more = R;
    while (L < more) {
        if (arr[L] < arr[R]) {
            swap(arr, ++less, L++);
        } else if (arr[L] > arr[R]) {
            swap(arr, --more, L);
        } else {
            L++;
        }
    }
    swap(arr, more, R);
    return [less + 1, more];
}

// let arr = [7, 8, 10, 5, 3, 7, 9, 8, 4, 6, 7, 7, 7];
// quickProcess(arr, 0, arr.length - 1);
// console.log(arr);

// 自己实现
function quickSort1(arr, L, R) {
    if (L < R) {
        let left = L - 1;
        let right = R;
        let T = arr[right];
        let index = L;
        while (index < right) {
            if (arr[index] < T) {
                left++;
                [arr[left], arr[index]] = [arr[index], arr[left]];
                index++;
            } else if (arr[index] > T) {
                right--;
                [arr[right], arr[index]] = [arr[index], arr[right]];
            } else {
                index++;
            }
        }
        [arr[R], arr[right]] = [arr[right], arr[R]];
        quickSort1(arr, L, left);
        quickSort1(arr, right + 1, R)
    }
}


// let arr = [7, 8, 10, 5, 3, 7, 9, 8, 4, 6]
// console.log(quickSort1(arr, 0, 9));
// console.log(arr);


// 快速排序简单实现（空间复杂度高）网上摘录
function quickSort2(array) {
    if (array.length <= 1) {
        return array
    }
    let centerValue = array[0]
    array.shift()
    let leftArray = []
    let rightArray = []
    let tempArrayLength = array.length
    for (let i = 0; i < tempArrayLength; i++) {
        if (array[i] <= centerValue) {
            leftArray.push(array[i])
        } else {
            rightArray.push(array[i])
        }
    }
    let leftArraySortResult = quickSort(leftArray)
    let rightArraySortResult = quickSort(rightArray)
    return leftArraySortResult.concat(centerValue, rightArraySortResult)
}