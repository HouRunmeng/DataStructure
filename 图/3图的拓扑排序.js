/*
 * @Author: your name
 * @Date: 2021-03-28 19:05:32
 * @LastEditTime: 2021-03-28 20:11:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\图\3图的拓扑排序.js
 */

// 图的拓扑排序
// 某一任务在开始之前，前一项任务必须完成
// 在图中，箭头的开端为前一项任务，箭头指向的为后完成的任务
// 设计一个函数，输出任务的执行顺序
// 无向图无拓扑排序
// 拓扑排序要求图为有向图，且无环


const getGraph = require('./1图的转换及其表示方法');
let task = [
    [0, 0, 1, 0],
    [1, 0, 1, 1],
    [0, 0, 0, 1],
    [0, 1, 0, 0]
]
let graph = getGraph(task);

// 拓扑排序
// 思路：先找到入度为零的点，然后将其出度的边在图中全部删除，
// 再找入度为0的点
function getTopologicalSorting(graph) {
    // map用来存取结点剩余的入度
    let map = new Map();
    let zeroQueue = [];
    // map实现了迭代器接口，可使用for of循环
    for (let node of graph.nodes) {
        map.set(node[1], node[1].in);
        if (node[1].in === 0) {
            zeroQueue.push(node[1])
        }
    }
    if (zeroQueue.length == 0) {
        console.log('this grapg has loop,please input parameter again');
        return;
    }
    let res = [];
    while (zeroQueue.length !== 0) {
        let cur = zeroQueue.shift();
        res.push(cur.value);
        for (let i = 0; i < cur.nexts.length; i++) {
            map.set(cur.nexts[i], map.get(cur.nexts[i]) - 1);
            if (map.get(cur.nexts[i]) == 0) {
                zeroQueue.push(cur.nexts[i])
            }
        }
    }
    return res
}
// console.log(
//     getTopologicalSorting(graph)
// );