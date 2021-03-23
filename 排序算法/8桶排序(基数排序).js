/*
 * @Author: your name
 * @Date: 2021-03-22 08:44:26
 * @LastEditTime: 2021-03-23 19:05:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \7leetcode\.vscode\5桶排序，基数排序.js
 */

// 桶排序（桶是容器）
// 桶排序思想下的排序都不是基于比较的排序（最重要的是基数排序）
// T:O(N)  K:O(M)
// 计数排序，适合于集合的范围在一个比较窄的范围里
// 计数排序的思路：有一个未排序的数组a，申请一个与之长度相等的数组b，
// 遍历a，若a的某个元素内容为10，就在b的索引为10的位置记为1，
// 遍历图中再次遇到10，就在b的索引为10的位置记为2，
// 最后生成结果数组

// 基数排序：要求：样本必须认为是十进制的正数
// 例如，如果将一个学生类按照某种顺序排序，就不能使用基数排序

// L表示需要排序的左边界
// R表示需要排序的有边界
// digit表示最大数的位数，例如传入2，最大位数位2，（10---99）
function radixSort(arr, L, R, digit) {
    let radix = 10;
    let bucket = [];
    let i = 0;
    let j = 0;
    for (i = 0; i < radix; i++) {
        bucket[i] = 0;
    }
    for (let d = 1; d <= digit; d++) {
        let count = [];
        for (i = 0; i < radix; i++) {
            count[i] = 0;
        }
        for (i = L; i <= R; i++) {
            j = getDigit(arr[i], d);
            count[j] += 1;
        }
        for (i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1];
        }
        for (i = R; i >= L; i--) {
            j = getDigit(arr[i], d);
            bucket[count[j] - 1] = arr[i];
            count[j]--;
        }
        for (i = L, j = 0; i <= R; i++, j++) {
            arr[i] = bucket[i]
        }
    }
}

// 得到每个位的数字
// 先除以 10^（bit - 1）次方，求整数部分
// 再模10
function getDigit(value, bit) {
    return (Math.floor(value / Math.pow(10, bit - 1))) % 10;
}

let arr = [101, 123, 32, 156]
radixSort(arr, 0, arr.length - 1, 3);
console.log(arr);