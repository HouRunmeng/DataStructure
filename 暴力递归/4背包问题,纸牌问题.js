// 给定两个长度都为N的数组weights和values,
// weights[i]和values[i]分别代表i号物品的重量和价值,
// 给定一个正数bag,表示背包的最大容量,求在不超过背包容量的情况下所能得到的最大价值

function getMaxValue(w, v, index, alreadyW, bag) {
    if (alreadyW > bag) {
        return -1;
    }
    // 重量没超,且背包刚好满
    if (index == w.length) {
        return 0;
    }
    // 重量没超，背包没满
    // 当前物品不装入背包，后续的情况
    let p1 = getMaxValue(w, v, index + 1, alreadyW, bag);
    // 当前物品装入背包，后续的情况
    let p2next = getMaxValue(w, v, index + 1, alreadyW + w[index], bag);
    let p2 = -1;
    // p2next为-1说明当前物品装入背包后，物品装不下了
    if (p2next != -1) {
        p2 = v[index] + p2next;
    }
    return Math.max(p1, p2);
}