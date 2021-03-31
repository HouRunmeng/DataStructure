/*
 * @Author: your name
 * @Date: 2021-03-28 20:14:53
 * @LastEditTime: 2021-03-30 09:56:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\图\4最小生成树.js
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
    [0, 2, 0, 1, 0, 0, 0, 0, 0],
    [2, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 2, 2, 0, 0, 0, 0],
    [1, 0, 2, 0, 0, 7, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 7, 0, 0, 2, 1, 0],
    [0, 0, 0, 0, 3, 2, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 0]
]
// 判断是否对称矩阵,无向图
function isSymmetricMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix[i].length; j++) {
            if (matrix[i][j] !== matrix[j][i])
                return false;
        }
    }
    return true;
}

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

// 前期工作
// Kruskal算法专用(MySet)
class MySet extends Set {
    constructor(graph) {
        super();
        this.map = new Map();
        // 结点归档，每一个结点属于一个集合
        // 初始化
        for (let node of graph.nodes) {
            let nodeSet = [];
            nodeSet.push(node[1]);
            this.map.set(node[0], nodeSet);
        }
    }
    // 判断两个结点是否使一个集合
    isSameSet(from, to) {
        return this.map.get(from.value) === this.map.get(to.value);
    }
    // 合并fomr和to所在的集合
    // 注：不是两个节点进行合并
    union(from, to) {
        let fromSet = this.map.get(from.value);
        let toSet = this.map.get(to.value);
        // 合并集合
        for (let i = 0; i < toSet.length; i++) {
            fromSet.push(toSet[i]);
        }
        // toSet和fromSet集合已合并，但是需要遍历fromSet集合中的元素，
        // 使元素的值对应的均为fromSet
        // 此处时间复杂度较大
        // 集合最终会越来越大，合并依次耗费的时间越长
        // 最终map对应的结构为
        // 1=>整个集合
        // 2=>整个集合
        // n=>整个集合
        for (let i = 0; i < fromSet.length; i++) {
            this.map.set(fromSet[i].value, fromSet);
        }
    }
}

let graph = adjacencyMatrixToGraph(matrix);
// 最小生成树
// 由图最后得到一棵树，使该树的所有边权重最低

// 算法1
// Kruskal算法
// 要求：无向图
// 思路：将边全部去掉，依次选取权重最小的边，加入到点中，直至形成树
// 算法实现：每个点属于一个集合，若某边入选，则将该边所连接的点的集合合并
// 返回边集

function Kruskal(graph) {
    if (graph == null) {
        return null
    }
    let mySet = new MySet(graph);
    // 边集
    let res = [];
    // 最小生成树的权重
    let sumWieght = 0;
    // js链式调用，将set类型转换为权重数组，按边的权重由小到大排列
    let priorityQueue = Array.from(graph.edges).sort((a, b) => a.value - b.value);
    while (priorityQueue.length !== 0) {
        let curEdge = priorityQueue.shift();
        if (!mySet.isSameSet(curEdge.from, curEdge.to)) {
            res.push(curEdge);
            sumWieght += curEdge.value;
            mySet.union(curEdge.from, curEdge.to);
        }
    }
    return [res, sumWieght];
}
console.log(
    Kruskal(graph)
);


// 算法2（实现较简单）
// Prim算法
// ①先选定某个点，从该点的边中选择权重最小的边
// ②将该边对应的结点加入集合，将被加入的结点的边加入权重数组，重复步骤①
function Prim(node) {
    if (node == null) {
        return;
    }
    // 结果，存储边集
    let res = [];
    let sumWieght = 0
    // 优先级队列，按照边的权重排序
    let priorityQueue = [];
    // set用来存储已经连起来的点
    let set = new Set();
    set.add(node);
    for (let i = 0; i < node.edges.length; i++) {
        priorityQueue.push(node.edges[i]);
    }
    priorityQueue.sort((a, b) => a.value - b.value);
    while (priorityQueue.length !== 0) {
        let curEdge = priorityQueue.shift();
        if (!set.has(curEdge.to)) {
            set.add(curEdge.to);
            res.push(curEdge);
            sumWieght += curEdge.value
            for (let i = 0; i < curEdge.to.edges.length; i++) {
                priorityQueue.push(curEdge.to.edges[i]);
            }
        }
        priorityQueue.sort((a, b) => a.value - b.value);
    }
    return [res, sumWieght];
}

console.log(Prim(graph.nodes.get(0)));