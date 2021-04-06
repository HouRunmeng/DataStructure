/*
 * @Author: your name
 * @Date: 2021-04-01 16:40:54
 * @LastEditTime: 2021-04-01 16:51:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\暴力递归\2打印一个字符串的全部子序列,包括空字符串.js
 */

// 子序列：不改变字符的相对次序，但是可以任意选择一个字符要或者不要
// 'abc'
// a b c ac ac bc abc ''（空字符串）
let res = [];

function getRes(str, index, path, res) {
    if (index == str.length) {
        res.push(path)
    } else {
        // 当前字符不要的情况下
        getRes(str, index + 1, path, res);
        // 当前字符要的情况下
        getRes(str, index + 1, path + str[index].toString(), res)
    }
}

getRes('123', 0, '', res)
console.log(res);