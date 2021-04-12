/*
 * @Author: your name
 * @Date: 2021-04-01 16:52:03
 * @LastEditTime: 2021-04-01 16:54:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\暴力递归\3打印字符串全排列.js
 */

// 打印字符串的全排列
// n!

function getRes(data) {
    // res为保存结果集
    let res = [];
    process(data.split(''), '', res);
    return res;
}

function process(data, path, res) {
    if (data.length == 0) {
        res.push(path);
        return;
    }
    for (let i = 0; i < data.length; i++) {
        let partPath = path + data[i];
        // 深拷贝
        let arr = new Array(...data);
        // 当前字符已经选择，后面不再使用
        arr.splice(i, 1);
        process(arr, partPath, res);
    }
}
// console.log(getRes('123'));
// 打印字符串的全排列，要求不出现重复排列

function getResOnly(str) {
    let res = [];
    processOnly(str.split(''), '', res);
    return res
}

function processOnly(strArr, path, res) {
    if (strArr.length == 0) {
        res.push(path);
        return;
    }
    let set = new Set();
    for (let i = 0; i < strArr.length; i++) {
        if (!set.has(strArr[i])) {
            set.add(strArr[i]);
            let partPath = path + strArr[i];
            // 深拷贝
            let arr = new Array(...strArr);
            // 当前字符已经选择，后面不再使用
            arr.splice(i, 1);
            processOnly(arr, partPath, res);
        }
    }
}
// console.log(
// getResOnly('111')
// );

// 方法2
function getRes2(str) {
    let res = [];
    process2(str.split(''), 0, res);
    return res
}

function process2(str, index, res) {
    if (index == str.length) {
        res.push(str.join(''));
    }
    for (let i = index; i < str.length; i++) {
        [str[i], str[index]] = [str[index], str[i]];
        process2(str, index + 1, res);
        // 恢复现场，方便下次交换元素进行递归
        [str[i], str[index]] = [str[index], str[i]];
    }


}

// 方法2去重
console.log(getRes2('123'));