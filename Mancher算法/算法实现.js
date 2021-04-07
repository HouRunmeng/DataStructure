// 获取最大回文子串
// O(N^2)
// 暴力解法:以每个字符为中心,分别向左向右移动指针,比较左右指针所指向的元素
// 必须对输入的字符串进行修正,否则暴力解法有一定失误
// 例如:暴力解法得不到偶数的子串
// 1122处理后得到
// #1#1#2#2#

// 概念
// 回文半径，由中点向一侧遍历，拿到回文子串的半径
// 回文直径
// 最右回文右边界R,永远记录回文子串最右边的位置
// 中心点C,使得R扩充的中心点

// 注:只要R更新，C一定要更新
// 记录每一个位置为中心的情况下，阔出来的回文半径记录在数组里

// 
function getMancherStr(str) {
    let res = '#';
    res += str.split('').join('#');
    return res + '#';
}

function maxLcpsLength(str) {
    if (str == null || str.length == 0) {
        return 0;
    }
    str = getMancherStr(str);
    // 存储每个点的回文半径
    let arr = [];
    arr.length = str.length;
    let C = -1;
    // 此处的R代表扩充边界的下一个位置，与左神讲解有一点不同
    let R = -1;
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i != str.length; i++) {
        // 2c-i即为对称点i*
        // 若i位于R外，i的回文区域至少为1（当前字符本身）
        // 若i位于R内，i的回文区域至少为(i*的回问区域)和(R到i之间的距离)较小的那一个
        // 这么写是为了初次C = -1,2C小于0导致数组越界
        arr[i] = R > i ? Math.min((2 * C - i) >= 0 ? arr[2 * C - i] : Number.MIN_SAFE_INTEGER, R - i) : 1;
        // 原始写法
        // arr[i] = R > i ? Math.min(arr[2 * C - i], R - i) : 1;
        while (i + arr[i] < str.length && i - arr[i] > -1) {
            if (str[i + arr[i]] == str[i - arr[i]]) {
                arr[i]++;
            } else {
                break;
            }
        }
        // 更新R
        if (i + arr[i] > str.length) {
            R = i + arr[i];
            C = i;
        }
        max = Math.max(max, arr[i])
    }
    return max - 1
}

console.log(
    maxLcpsLength('abcdefcabac')
);