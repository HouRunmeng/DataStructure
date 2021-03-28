/*
 * @Author: your name
 * @Date: 2021-03-28 18:01:05
 * @LastEditTime: 2021-03-28 20:10:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\图\2图的遍历.js
 */
// 结点的表示
class Node {
    constructor(value) {
        this.value = value;
        // 点的入度
        this.in = 0;
        // 点的出度
        this.out = 0;
        // 以当前结点为出发点，与之相邻的结点的集合
        this.nexts = [];
        // 以当前的点为出发点，其出度的边的集合
        this.edges = []
    }
}

// 边的表示
class Edge {
    constructor(value, from, to) {
        this.value = value;
        this.from = from;
        this.to = to;
    }
}

// 图
// 点和边的集合
class Graph {
    constructor() {
        this.nodes = new Map();
        this.edges = new Set();
    }
}

let matrix = [
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

// 注：邻接矩阵，有几行，注册几个结点
// 有几个元素值不为0，创建几条边
function adjacencyMatrixToGraph(matrix) {
    let graph = new Graph();
    for (let i = 0; i < matrix.length; i++) {
        if (!graph.nodes.has(i)) {
            graph.nodes.set(i, new Node(i));
        }
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
                if (!graph.nodes.has(j)) {
                    graph.nodes.set(j, new Node(j));
                }
                let weight = matrix[i][j];
                let endNode = graph.nodes.get(j);
                let startNode = graph.nodes.get(i);
                startNode.out++;
                endNode.in++;
                let edge = new Edge(weight, startNode, endNode);
                startNode.nexts.push(endNode);
                startNode.edges.push(edge);
                graph.edges.add(edge);
            }
        }
    }
    return graph;
}
exports.adjacencyMatrixToGraph = adjacencyMatrixToGraph;

let graph = adjacencyMatrixToGraph(matrix);
// 宽度优先遍历，队列
function WFT(node) {
    if (node == null) {
        return null;
    }
    // set用来保存已经访问的结点
    // ∵图的结构使得两点之间均可达
    let set = new Set();
    set.add(node);
    let queue = [];
    queue.push(node);
    // 保存结果
    let res = [];
    while (queue.length !== 0) {
        let cur = queue.shift();
        res.push(cur.value)
        for (let i = 0; i < cur.nexts.length; i++) {
            if (!set.has(cur.nexts[i])) {
                queue.push(cur.nexts[i]);
                set.add(cur.nexts[i]);
            }
        }
    }
    return res;
}
// console.log(
// WFT(graph.nodes.get(0))
// );

// 深度优先遍历,栈
function DFT(node) {

    if (node == null) {
        return null;
    }
    // set用于记录哪些结点进入过栈
    let set = new Set();
    let res = [];
    let stack = [];
    stack.push(node);
    set.add(node);
    res.push(node.value);
    while (stack.length !== 0) {
        let cur = stack.pop();
        for (let i = 0; i < cur.nexts.length; i++) {
            if (!set.has(cur.nexts[i])) {
                set.add(cur.nexts[i]);
                stack.push(cur);
                stack.push(cur.nexts[i])
                res.push(cur.nexts[i].value);
                break;
            }
        }
    }
    return res;
}

// console.log(
// DFT(graph.nodes.get(0))
// );