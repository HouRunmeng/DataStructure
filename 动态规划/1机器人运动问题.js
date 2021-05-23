// N格子
// start机器人开始的位置
// end机器人到达的位置
// K机器人一定要走的步数

// 返回方案的数量
// 参数：N最终的格子
// cur当前所在的点
// rest还剩几步
// 终点位置
function walk(N, cur, rest, P) {
    // 如果没有剩余步数了，当前的cur位置就是最后的位置
    // 如果最后的位置停在P上，那么之前做的移动是有效的
    // 如果最后的位置没在P上，那么之前做的移动是无效的
    if (rest == 0) {
        return cur == P ? 1 : 0;
    }
    // 如果还有rest步要走，而当前的cur位置在1位置上，那么当前这步只能从1走向2
    // 后续的过程就是，来到2位置上，还剩rest-1步要走
    if (cur == 1) {
        return walk(N, 2, rest - 1, P);
    }
    // 如果还有rest步要走，而当前的cur位置在N位置上，那么当前这步只能从N走向N-1
    // 后续的过程就是，来到N-1位置上，还剩rest-1步要走
    if (cur == N) {
        return walk(N, N - 1, rest - 1, P);
    }
    // 如果还有rest步要走，而当前的cur位置在中间位置上，那么当前这步可以走向左，也可以走向右
    // 走向左之后，后续的过程就是，来到cur-1位置上，还剩rest-1步要走
    // 走向右之后，后续的过程就是，来到cur+1位置上，还剩rest-1步要走
    // 走向左、走向右是截然不同的方法，所以总方法数要都算上
    return walk(N, cur + 1, rest - 1, P) + walk(N, cur - 1, rest - 1, P);
}

function main(N, M, K, P) {
    // 参数无效直接返回0
    if (N < 2 || K < 1 || M < 1 || M > N || P < 1 || P > N) {
        return 0;
    }
    // 总共N个位置，从M点出发，还剩K步，返回最终能达到P的方法数
    return walk(N, M, K, P);
}

// console.log(main(5, 2, 4, 4));

// 以上方法会进行多余的计算
// 改进：使用hashMap或者数字记录已经计算过的位置，有的话直接返回，没有的话先记录再返回
// map相当于缓存的作用
function walk2(N, cur, rest, P, map) {
    let key = `${cur}_${rest}`;
    if (map.has(key)) {
        return map.get(key)
    }
    let res = 0;
    if (rest == 0) {
        res = cur == P ? 1 : 0;
        map.set(key, res);
        return res;
    }
    if (cur == 1) {
        res = walk2(N, 2, rest - 1, P, map);
        map.set(key, res);
        return res;
    }
    if (cur == N) {
        res = walk2(N, N - 1, rest - 1, P, map);
        map.set(key, res);
        return res;
    }
    res = walk2(N, cur + 1, rest - 1, P, map) + walk2(N, cur - 1, rest - 1, P, map);
    map.set(key, res);
    return res;
}

function main2(N, M, K, P) {
    // 参数无效直接返回0
    if (N < 2 || K < 1 || M < 1 || M > N || P < 1 || P > N) {
        return 0;
    }
    let map = new Map();
    // 总共N个位置，从M点出发，还剩K步，返回最终能达到P的方法数
    return walk2(N, M, K, P, map);
}
// console.log(main2(5, 2, 4, 4));

// 用数组改进
// arr相当于缓存的作用
function walk3(N, cur, rest, P, arr) {
    if (arr[cur][rest] !== -1) {
        return arr[cur][rest];
    }
    let res = 0;
    if (rest == 0) {
        res = cur == P ? 1 : 0;
        arr[cur][rest] = res;
        return res;
    }
    if (cur == 1) {
        res = walk3(N, 2, rest - 1, P, arr);
        arr[cur][rest] = res;
        return res;
    }
    if (cur == N) {
        res = walk3(N, N - 1, rest - 1, P, arr);
        arr[cur][rest] = res;
        return res;
    }
    res = walk3(N, cur + 1, rest - 1, P, arr) + walk3(N, cur - 1, rest - 1, P, arr);
    arr[cur][rest] = res;
    console.log(arr);
    return res;
}
// 总共N个位置，从M点出发，还剩K步，返回最终能达到P的方法数
function main3(N, M, K, P) {
    // 参数无效直接返回0
    if (N < 2 || K < 1 || M < 1 || M > N || P < 1 || P > N) {
        return 0;
    }
    let arr = [];
    for (let i = 0; i < N + 1; i++) {
        for (let j = 0; j <= K; j++) {
            if (arr[i] == undefined) {
                arr[i] = [];
            }
            arr[i][j] = -1;
        }
    }
    console.log(arr);
    // 总共N个位置，从M点出发，还剩K步，返回最终能达到P的方法数
    return walk3(N, M, K, P, arr);
}

console.log(main3(5, 2, 4, 4));


// 动态规划
// 第一行的值仅依赖右下角
// 最后一行的值仅依赖左上角
// 普通格子依赖左上角和右下角
function walkDP(N, cur, rest, end, arr) {
    // 参数无效直接返回0
    if (N < 2 || rest < 1 || cur < 1 || cur > N || end < 1 || end > N) {
        return 0;
    }
    for (let i = 1; i < N + 1; i++) {

    }
}