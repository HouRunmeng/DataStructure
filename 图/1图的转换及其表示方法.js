// 图的表示方法：
// 邻接表，邻接矩阵

// 面试或者笔试
// 作者可声明一个函数，将表示图的邻接表或者邻接矩阵表示为自己擅长的图的结构
// 例如
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


// 给定某个数据结构，将其转换为自身擅长的api
// 第一种数据结构
// [priority, start, end]
// 分别表示边的权重, 出发结点, 到达结点
let arr = [
    [6, 1, 4],
    [4, 1, 2],
    [7, 2, 3],
    [1, 2, 4],
    [8, 1, 3]
]

function conversion(arr) {
    let graph = new Graph();
    for (let i = 0; i < arr.length; i++) {
        let priority = arr[i][0];
        let start = arr[i][1];
        let end = arr[i][2];
        if (!(graph.nodes.has(start))) {
            graph.nodes.set(start, new Node(start));
        }
        if (!(graph.nodes.has(end))) {
            graph.nodes.set(end, new Node(end));
        }
        let startNode = graph.nodes.get(start);
        let endNode = graph.nodes.get(end);
        let edge = new Edge(priority, startNode, endNode);
        startNode.nexts.push(endNode)
        startNode.out++;
        endNode.in++;
        startNode.edges.push(edge);
        graph.edges.add(edge);
    }
    return graph;
}

// console.log(conversion(arr));
// 邻接矩阵
// 为方便，结点从0开始
// 有一个邻接矩阵如下
// /          \
// | 0 4 8 6  |
// | 0 0 7 1  |
// | 0 0 0 0  |
// | 0 0 0 0  |
// \          / 
// 表示含义如下
// 第一行：第0个结点到第0个结点的距离为无穷
// 第一行：第0个结点到第1个结点的距离为4
// 第一行：第0个结点到第2个结点的距离为8
// 第一行：第0个结点到第3个结点的距离为6
// 以此类推
let matrix = [
    [0, 1, 1, 1],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [0, 0, 1, 0]
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


// 邻接表转换为图
// ①1->2->3->null
// ②2->4->5->null
// ③3->4->null
// ④4->5->null
// ⑤5->null
// 如上所示
// 第一行表示结点1指向2和3
// 第二行表示结点2指向4和5
// 依次类推
// 第五行表示结点5没有出度
// 若边有权重，则给给结点添加priority(权重)属性
// 
// 我们仍将邻接矩阵的图转化为邻接表
class SNode {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
        this.next = null;
    }
}
let one = new SNode(1, 0);
one.next = new SNode(2, 4);
one.next.next = new SNode(4, 6);
one.next.next.next = new SNode(3, 8);

let two = new SNode(2, 0);
two.next = new SNode(3, 7);
two.next.next = new SNode(4, 1);

let three = new SNode(3);
let four = new SNode(4);

let data = [one, two, three, four];


function adjacencyTableToGraph(data) {
    let graph = new Graph();
    for (let i = 0; i < data.length; i++) {
        let start = data[i];
        if (!graph.nodes.has(i + 1)) {
            graph.nodes.set(i + 1, new Node(start.value));
        }
        data[i] = data[i].next;
        while (data[i] !== null) {
            let value = data[i].value
            if (!graph.nodes.has(value)) {
                graph.nodes.set(value, new Node(value))
            }
            let startNode = graph.nodes.get(start.value);
            let endNode = graph.nodes.get(value);
            let weight = data[i].priority;
            let edge = new Edge(weight, startNode, endNode);
            startNode.nexts.push(endNode);
            startNode.out++;
            endNode.in++;
            startNode.edges.push(edge);
            graph.edges.add(edge);
            data[i] = data[i].next;
        }
    }
    return graph;
}

console.log(
    // adjacencyMatrixToGraph(matrix)
);

console.log(
    // adjacencyMatrixToGraph(matrix).nodes.get(3)
);

module.exports = adjacencyMatrixToGraph