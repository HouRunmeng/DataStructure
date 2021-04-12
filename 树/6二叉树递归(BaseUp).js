class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// Morris遍历能够解决的问题，二叉树递归一定能解
// 如何获得某二叉树中的最远路径
function getMaxDistance(root) {
    if (root == null) {
        return {
            maxDistance: 0,
            height: 0
        }
    }
    let leftData = getMaxDistance(root.left);
    let rightData = getMaxDistance(root.right);
    // 最远距离思路
    // 最远距离可能与当前节点无关，见图，
    // 最大距离可能的取值：当前结点的左子树上，当前结点的右子树上，或者当前结点左右子树上   
    let maxDistance = Math.max(Math.max(leftData.maxDistance, rightData.maxDistance),
        leftData.height + rightData.height + 1)
    // 当前结点的高度为其左右子树的最大高度 + 1；
    let height = Math.max(leftData.height, rightData.height) + 1;
    return {
        maxDistance,
        height
    }
}
let node = new Node(1);
node.left = new Node(2)
node.right = new Node(3)
node.left.left = new Node(4);
node.left.right = new Node(5);
node.right.left = new Node(6);
node.right.right = new Node(7);

// console.log(getMaxDistance(node));

// 求一颗树上最大二叉搜索子树的大小

function getMaxSearchPartTreeSize(root) {
    // 当前节点需要的子树的信息
    // ①如果是二叉搜索树，要其搜索树的结点大小，
    // ②以及左子树的最大值，右子树的最小值
    // （因为各个子树要返回一样的信息，所以将左子树和右子树的信息整合在一起）
    // ③当前节点的左子树，右子树是否为搜索二叉树的情况


    // 以当前结点为根节点的子树的情况分布

    // 与当前结点无关
    // ①当前结点的左子树是，当前节点的右子树不是
    // ②当前节点的右子树是，当前节点的左子树不是
    // ③当前接结点的左右子树均不是

    // 与当前结点有关
    // ④当前节点的左右子树均是

    // 我们分情况讨论
    // ①当前结点的左子树是搜索二叉树，当前节点的右子树不是搜索二叉树

    // ②当前节点的右子树是，当前节点的左子树不是

    // ③当前接结点的左右子树均不是

    // ④当前节点的左右子树均是
    // 如果当前节点均为二叉搜索树，当前节点的左子树的最大值必须小于当前节点的值
    // 右子树的最小值必须大于当前节点的值
    // 以当前节点为根节点的子树才能作为二叉搜索树
}

class Info3 {
    constructor(isSearchTree, nodeCount, min, max) {
        this.isSearchTree = isSearchTree;
        this.nodeCount = nodeCount;
        this.min = min;
        this.max = max;
    }
}

function getMaxSearchTree(node) {
    if (node == null) {
        return null
    }
    let leftTreeInfo = getMaxSearchTree(node.left);
    let rightTreeInfo = getMaxSearchTree(node.right);
    let min = node.value;
    let max = node.value;

    // 加工min和max
    if (leftTreeInfo !== null) {
        min = Math.min(min, leftTreeInfo.min);
        max = Math.max(max, leftTreeInfo.max);
    }
    if (rightTreeInfo !== null) {
        min = Math.min(min, rightTreeInfo.min);
        max = Math.max(max, rightTreeInfo.max);
    }
    // 加工isSearch,nodeCount
    let isSearchTree = false;
    let nodeCount = 0;
    if (leftTreeInfo !== null) {
        nodeCount = leftTreeInfo.nodeCount;
    }
    if (rightTreeInfo !== null) {
        nodeCount = Math.max(rightTreeInfo.nodeCount, nodeCount);
    }
    // 如果当前结点参与
    // 当前节点参与的条件
    // 左树整体为搜索树
    // 右子树整体为搜索树
    // 左子树的最大值小于当前节点的值
    // 右子树的最小值大于当前几点的值
    if (
        (leftTreeInfo == null ? true : leftTreeInfo.isSearchTree) &&
        (rightTreeInfo == null ? true : rightTreeInfo.isSearchTree) &&
        (leftTreeInfo == null ? true : leftTreeInfo.max < node.value) &&
        (rightTreeInfo == null ? true : rightTreeInfo.min > node.value)
    ) {
        isSearchTree = true;
        nodeCount = (leftTreeInfo == null ? 0 : leftTreeInfo.nodeCount) +
            (rightTreeInfo == null ? 0 : rightTreeInfo.nodeCount) + 1;
    }
    return new Info3(isSearchTree, nodeCount, min, max);
}
let a = new Node(6)
let b = new Node(7)
let c = new Node(10)
let d = new Node(5)
let e = new Node(8)
let f = new Node(3)
let g = new Node(12)
let h = new Node(1);
let i = new Node(14);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
g.left = h;
g.right = i;
// console.log(getMaxSearchPartTreeSize(b));

// 员工的最大快乐值
// 给定一个多叉树，每个节点存储一定的数值（快乐值）
// 假定每个结点是一个员工，先要开一个宴会，会发请柬
// 收到请柬的可以来，没收到请柬的不可以来
// 如果某个员工的老板来了（即当前结点的直属父节点来了），当前员工不能赴宴
// 若某个员工的老板没来，当前员工可以不来，也可以来
// 求最大的快乐值

// 分类，当前结点不来的情况下，得到的最大快乐值
// 当前结点来的情况下，得到的最大快乐值
// 需要得到的信息
// 其左孩子来与不来排队的最大快乐值
// 其右孩子来与不来排队的最大快乐值


class Employee {
    constructor(v) {
        // 当前员工的最大快乐值
        this.v = v;
        // 下级员工
        this.nexts = []
    }
}

function getMaxHappy(root) {
    // 将空间点跳过，直接来到基层员工
    if (root.nexts.length == 0) {
        return {
            yes: root.v,
            no: 0
        }
    }
    // root有下级
    let no = 0;
    let yes = root.v;
    for (let index in root.nexts) {
        let cur = getMaxHappy(root.nexts[index]);
        yes += cur.no;
        no += Math.max(cur.no, cur.yes);
    }
    return {
        yes,
        no
    }
}

let root = new Employee(7)
root.nexts.push(new Employee(3))
root.nexts.push(new Employee(1))
root.nexts.push(new Employee(1))
root.nexts[0].nexts.push(new Employee(9))
root.nexts[1].nexts.push(new Employee(50))
root.nexts[2].nexts.push(new Employee(6))
console.log(getMaxHappy(root));