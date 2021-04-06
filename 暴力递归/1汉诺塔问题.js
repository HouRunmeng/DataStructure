/*
 * @Author: your name
 * @Date: 2021-04-01 16:18:43
 * @LastEditTime: 2021-04-01 16:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\暴力递归\1汉诺塔问题.js
 */

// 汉诺塔步骤
// 将上层n-1个圆盘借助右边移动到中间
// 将第n个圆盘移动到右边
// 将n-1个圆盘借助左边移到右边

function leftToRight(n) {
    if (n == 1) {
        console.log(`move 1 from left to right`);
        return;
    }
    leftTomid(n - 1);
    console.log(`move ${n} from left to right`);
    midToRight(n - 1);
}

function rightToleft(n) {
    if (n == 1) {
        console.log(`move 1 from right to left`);
        return;
    }
    rightToMid(n - 1);
    console.log(`move ${n} from right to left`);
    midToleft(n - 1);
}

function leftTomid(n) {
    if (n == 1) {
        console.log(`move 1 from left to mid`);
        return;
    }
    leftToRight(n - 1);
    console.log(`move ${n} from left to mid`);
    rightToMid(n - 1);
}

function midToleft(n) {
    if (n == 1) {
        console.log(`move 1 from mid to left`);
        return;
    }
    midToRight(n - 1);
    console.log(`move ${n} from mid to left`);
    rightToleft(n - 1);
}

function midToRight(n) {
    if (n == 1) {
        console.log(`move 1 from mid to right`);
        return;
    }
    midToleft(n - 1);
    console.log(`move ${n} from mid to right`);
    leftToRight(n - 1)
}

function rightToMid(n) {
    if (n == 1) {
        console.log(`move 1 from right to mid`);
        return;
    }
    rightToleft(n - 1);
    console.log(`move ${n} from right to mid`);
    leftTomid(n - 1);
}
// leftToRight(11)

// 优化：
// 忽略左中右，仅有from,to,other
// 圆盘目标是from-->to
function func(n, from, to, other) {
    if (n == 1) {
        console.log(`move 1 from ${from} to ${to}`);
    } else {
        func(n - 1, from, other, to);
        console.log(`move ${n} from ${from} to ${to}`);
        func(n - 1, other, to, from);
    }
}

func(11, 'left', 'right', 'mid')