// 给定两个长度都为N的数组weights和values,
// weights[i]和values[i]分别代表i号物品的重量和价值,
// 给定一个正数bag,表示背包的最大容量,求在不超过背包容量的情况下所能得到的最大价值

// v[index]=>当前货物的价值
// w[index]=>当前货物的重量
// alreadyW=>当前已经装入背包的重量
function getMaxValue(w, v, index, alreadyW, bag) {
    // 重量超了
    if (alreadyW > bag) {
        return -1;
    }
    // 重量没超,物品装完了
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
// console.log(getMaxValue(W(arr), V(arr), 0,0,bag(number)));

// 剩余空间的尝试
function rest(w, v, index, rest) {
    // 背包满了
    if (rest <= 0) {
        return 0;
    }
    // 背包没装满，物品装完了
    if (index == w.length) {
        return 0;
    }
    // 背包没装满，物品没装完
    // 当前物品不放入背包后续的情况
    let p1 = rest(w, v, index + 1, rest);
    let p2 = Number.MAX_SAFE_INTEGER
    // 当前物品放入背包后续的情况(前提是背包能装下)
    if (rest - w[index] >= 0) {
        p2 = v[index] + rest(w, v, index + 1, rest - w[index]);
    }
    return Math.max(p2, p1);
}