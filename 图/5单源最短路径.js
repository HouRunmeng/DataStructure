/*
 * @Author: your name
 * @Date: 2021-03-30 09:44:56
 * @LastEditTime: 2021-03-30 12:35:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\图\5单源最短路径.js
 */


// 单源最短路径问题
const getGraph = require('./1图的转换及其表示方法')
let matrix = [
    [0, 1, 4, 10, 0],
    [0, 0, 0, 0, 50],
    [0, 0, 0, 0, 20],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0]
]
let graph = getGraph(matrix);

// 迪杰斯特拉算法
// 有向无向均可,但是权值不能为负数
function dijkstra(start) {
    // map的存储形式
    // node==>distanceMap，表示start结点到node的最短距离
    // 若distanceMap中没有某个结点，则start与node之间不可达
    let distanceMap = new Map();
    distanceMap.set(start, 0);
    // set存储已经计算好距离的点，以后不能再修改其距离
    let set = new Set();
    let minNode = getMinDistanceUnselectedNode(distanceMap, set);
    while (minNode != null) {
        let distance = distanceMap.get(minNode);
        let edges = distance.edges
        for (let i = 0; i < edges.length; i++) {
            let to = distance.edges.to;
            if (!distanceMap.has(to)) {
                distanceMap.set(to, distance + edges[i].value)
            } else {
                distanceMap.set(edges[i].to, Math.min(distanceMap.get(to)), distance + edges[i].value)
            }
        }
        set.add(minNode);
        minNode = getMinDistanceUnselectedNode(distanceMap, set);
    }
}

function getMinDistanceUnselectedNode(map, set) {
    let minNode = null;
    let minDistance = Number.MAX_VALUE;
    for (let node of map) {
        // let node =
    }
}