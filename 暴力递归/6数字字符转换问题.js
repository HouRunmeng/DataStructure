// 规定1和A对应，2和B对应，....26对应Z
// 注：01，02无效
// 现有一个字符串'111'==>可以转换为AAA,KA或者AK
// 给定只有数字组成的字符串，返回有多少种转换结果

function getRes(str, i) {
    if (i == str.length) {
        return 1;
    }
    if (str[i] == '0') {
        return 0;
    }
    if (str[i] == '1') {
        // 自己作为单独的部分，后续有多少种方法
        let ways = getRes(str, i + 1);
        if (i + 1 < str.length) {
            // 在后续不越界的情况下，当前数字和后续作为一个整体
            // 注：1必然可以和后续的数字组合，最小10，最大19均在0-26范围
            ways += getRes(str, i + 2);
        }
        return ways;
    }
    if (str[i] == '2') {
        // 自己作为单独的部分，后续有多少种方法
        let ways = getRes(str, i + 1);
        // 在后续不越界的情况下，当前数字和后续作为一个整体
        // 注：1必然可以和后续的数字组合，最小20，最大29
        if (i + 1 < str.length && (str.charCodeAt(i + 1) >= 48) && (str.charCodeAt(i + 1) <= 54)) {
            ways += getRes(str, i + 2);
        }
        return ways;
    }
    // str[i]为3~9
    return getRes(str, i + 1)
}
console.log(getRes('21', 0));