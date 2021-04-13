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

console.log(main(5, 2, 4, 4));

// 以上方法会进行多余的计算
// 改进：