/*
 * @Author: hrm
 * @Date: 2021-03-31 12:28:46
 * @LastEditTime: 2021-03-31 19:32:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\贪心算法\1活动安排问题.js
 */
let meets = [{
    start: 6,
    end: 10
}, {
    start: 7,
    end: 8
}, {
    start: 8,
    end: 9
}, {
    start: 8,
    end: 12
}]
// 会议安排问题最优策略：end越小越优先安排
function getRes(meets) {
    meets = meets.sort((a, b) => a.end - b.end);
    // let count = 0;
    // let startTime = meets[0].end;
    // count++;
    // for (let i = 0; i < meets.length; i++) {
    //     if (meets[i].start >= startTime) {
    //         startTime += meets[i].end - meets[i].start;
    //         count++;
    //     }
    // }
    // return count
    let count = 0;
    let timePoint = 0;
    for (let i = 0; i < meets.length; i++) {
        if (timePoint <= meets[i].start) {
            count++;
            timePoint = meets[i].end;
        }
    }
    return count;
}
console.log(
    getRes(meets)
);


// 字典序问题

// 字典序规定：两个字符串长度一样时，将字符串按照数字比
// 例如：'abc' < 'abd'
// 先比第一位，均为a
// 再比第二位，均为b
// 再比第三位，'c'<'d'（可以理解为26进制的数）从a开始

// 字符串长度不一样
// 'ab'   'b'
// 短的长度将其长度扩大为与长的长度一样
// 'ab' 'b0'
// 'ab' < 'b0'

// 本题例子
// 给定一个字符串数组[ab, ks, bc]
// 得到的字典序最小为ab bc ks

// 本题的贪心策略有：(1)将字符串长度扩大一致，按照字典序由小到大拼接，得到最终字符串(局部最优得不到整体最优)

// 贪心策略(2)
// 'str1str2'<='str1str2'，则str1在前
// 否则str2在前

// 贪心策略(1)例：[b, ba] ==>[b0, ba]==>bba
// 实际上bab字典序最小(bab < bba)

// 贪心策略需证明
// 若a.b <= b.a 
// 且b.c <= a.c 
// 则a.c <= c.a



// 贪心策略解题技巧:
// 1实现一个不依靠贪心算法的解法,可以使用暴力法
// 2脑部贪心策略的各种方案
// 3用暴力解法去验证每一个贪心策略,用实验的方式验证贪心策略能够得到整体最优
// 4不用纠结贪心策略的证明

// 贪心策略经常使用的技巧
// 1根据某标准建立一个比较器来排序
// 2根据某标准建立一个比较器来组成堆



// 贪心算法使用的堆和排序比较多