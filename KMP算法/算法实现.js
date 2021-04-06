// KMP算法解决的是母串是否包含字串得问题(注意和子序列得区别)
// 如果母串含有子串， 返回字串出现在母串得位置
// js提供的算法： indexOf() => kmp算法的优化， 优化了常数时间， 但是时间复杂度均为O(N)

// O(N^2)
// 暴力解法：从母串的0位置开始匹配，如果相同，一直向下，若途中不匹配，
// 则从母串的1位置开始匹配

// KMP算法是对暴力解法的优化，加速了暴力解法

// 概念：
// 前缀和后缀的最大匹配长度,用nexts数组记录（根据子串求），用来加速暴力匹配过程
// nexts一定满足
// nexts[0] = -1;
// nexts[1] = 0;

// 母串长度N,子串长度M,
// 得到nexts的复杂度O(M)
// 遍历的复杂度O(N)
// 因为字串的长度小于母串
// O(M) < O(N)
// 所以整个算法的复杂度为O(N)
function indexOf(parStr, subStr) {
    if (subStr.length > parStr.length || parStr == null || subStr == null || subStr.length < 1) {
        return -1
    }
    let str1 = parStr.split('');
    let str2 = subStr.split('');
    // O(M)=>M为子串的长度
    let nexts = getNexts(subStr);
    console.log(nexts);
    // x表示str1匹配到的位置
    let x = 0;
    // y表示str2匹配到的位置
    let y = 0;
    // 复杂度O(N)
    // 复杂度分析
    // 决定复杂度的有x y
    // x++;
    // y++;
    // y不变
    //              x|(N)    x-y|(N)   ==>最大能取到N(最坏情况)
    // 逻辑分支1     ^        ---
    // 逻辑分支2     ^         ^
    // 逻辑分支3    ---        y降低，x-y ^
    // x + (x - y)  最大值不超过2N
    // 为什么要找到x和x-y?
    // 因为决定复杂度的有x和y两个量
    // 按照最坏复杂度分析，要分析使复杂度上升的量，需要做差或者做除
    // 即x     x / y
    while (x < str1.length && y < str2.length) {
        if (str1[x] == str2[y]) {
            x++;
            y++;
            // nexts[y] == -1 说明 y == 0
        } else if (nexts[y] == -1) {
            x++;
        } else {
            y = nexts[y]
        }
    }
    // 跳出while的条件：要么x越界，要么y越界
    // 若是因为y越界导致跳出while循环，则说明y匹配完了，母串含有子串
    // y==str2.length说明str2匹配完了，若不满足，即为x>str1.length,即母串匹配完了也没得到结果
    // 返回出现的第一个位置
    return y == str2.length ? x - y : -1;
}

function getNexts(str) {
    if (str.length == 1) {
        return [-1];
    }
    str = str.split('');
    let nexts = [];
    nexts.length = str.length;
    nexts[0] = -1;
    nexts[1] = 0;
    // index为每一次要求最长前缀和最长后缀的位置
    let index = 2;
    // cn含义：cn位置的字符，是当前和i-1位置比较的字符
    let cn = 0;
    while (index < str.length) {
        if (str[index - 1] == str[cn]) {
            // ++cn的原因是
            nexts[index++] = ++cn;
        } else if (cn > 0) {
            cn = nexts[cn]
        } else {
            nexts[index++] = 0
        }
    }
    // 复杂度分析:设str的长度为M,
    //              index|(M)      index - cn|(M)    ==>M为最大值
    // 第一个分支:    ^             ---
    // 第二个分支:    ---            ^
    // 第三个分支:     ^            ---
    // 整个while的复杂度超不过O(M)
    return nexts;
}