// 给定一数组，代表数值不同的纸牌排成一条线，玩家AB一次拿走每张牌，
// 规定A先拿，每个玩家只能从最左或者最右拿，返回最后获胜者的分数

// 先手函数
function first(arr, L, R) {
    // 只剩一张牌
    if (L == R) {
        return arr[L]
    }
    // 不只一张牌，则在当前左右两边的牌选取最大的
    return Math.max(arr[L] + last(arr, L + 1, R), arr[R] + last(arr, L, R - 1))

}

// 后手函数

function last(arr, L, R) {
    if (L == R) {
        // 只剩一张，因为是后手，最后一张被先手拿到了
        return 0
    }
    // 剩余不只一张牌，先手后让后手选择最小值
    // 即先手会让后手拿到最差的决定
    return Math.min(first(arr, L + 1, R), first(arr, L, R - 1))
}