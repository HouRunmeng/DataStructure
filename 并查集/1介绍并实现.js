// 并查集
// 用于集合的合并（最小生成树的k算法）
// 重要操作：
// ①isSameSet(node1, node2);判断两个点所在的集合是否为一个集合；
// ②union(node1. node2);合并两个结点所在的集合（合并集合）
// 以上两种方法可以使用set实现，但是复杂度较高，并不高效
// 并查集实现以上两种方法时间复杂度均为O(1)(难点)

// 原理：首先初始化结点，每个结点属于一个集合
// 每个节点有一个指针up，指向和自己同一个集合的结点
// 初始化时，每个结点的up指针均指向自己
// isSameSet();判断某两个节点是否位于一个集合，即这两个个结点一路up，直到找到头节点，若这两个结点的头节点一样，则这两个结点位于一个集合，否则，不是
// union();合并两个集合:将小集合的头节点指向大集合的头节点（此过程仍需寻找头节点，可以将此操作定义为一个方法）

// 合并两个集合时，何以知道两个集合的大小？只需申请一个哈希表，key为集合的头节点，value为集合的结点数量吗，即集合的大小
// 合并集合后，需要小集合的记录从map中清除，只保留每个集合头节点以及该集合的大小

// 此方法在实现时，使用哈希表代替了链表结构，写着也可以自己定义链表结构而不是用哈希表
class Node {
    constructor(value) {
        this.value = value;
    }
}

class UnionFindSet {
    constructor(nodes) {
        this.parMap = new Map();
        this.eleMap = new Map();
        this.sizeMap = new Map();
        for (let i = 0; i < nodes.length; i++) {
            this.parMap.set(nodes[i], nodes[i]);
            this.sizeMap.set(nodes[i], 1);
            this.eleMap.set(nodes[i].value, nodes[i])
        }
    }
    // findHead(node) {
    //     if (node !== null) {
    //         // 记录网上的沿途的点
    //         while (node !== this.parMap.get(node)) {
    //             node = this.parMap.get(node);
    //         }
    //         return node
    //     }
    //     return null;
    // }
    // findHead优化
    // 如果在遍历图中，整个链表长这样
    // 1->2->3->4
    //    ^  ^  ^
    //    |  |  |
    //    10  5  7
    // 则可进行优化，将1直接指向4，
    // 2直接指向4
    // ...

    findHead(node) {
        if (node !== null) {
            // 记录往上的沿途的点
            let stack = [];
            while (node !== this.parMap.get(node)) {
                stack.push(node)
                node = this.parMap.get(node);
            }
            while (stack.length !== 0) {
                // 可以使链表扁平化
                this.parMap.set(stack.pop(), node);
            }
            return node
        }
        return null;
    }
    isSameSet(value1, value2) {
        if (this.eleMap.has(value1) && this.eleMap.has(value2)) {
            return this.findHead(this.eleMap.get(value1)) === this.findHead(this.eleMap.get(value2));
        }
        console.log('该点不存在于传入的集合');
        return false;
    }
    union(value1, value2) {
        // 两个结点均注册过并且不是同一个集合
        if ((this.eleMap.has(value1) && this.eleMap.has(value2)) && !this.isSameSet(value1, value2)) {
            console.log('asa');
            let par1 = this.parMap.get(this.eleMap.get(value1));
            let par2 = this.parMap.get(this.eleMap.get(value2));
            // 头节点不一致，即头节点不位于一个集合，进行合并
            if (par1 !== par2) {
                // 拿到集合较大的头节点
                let big = this.sizeMap.get(par1) <= this.sizeMap.get(par2) ? par2 : par1;
                // 较小集合的头结点
                let small = big == par2 ? par1 : par2;
                // 小集合的头结点指向大集合的头节点
                // 小集合挂大集合可减少寻找数量
                this.parMap.set(small, big);
                this.sizeMap.set(big, this.sizeMap.get(par1) + this.sizeMap.get(par2));
                this.sizeMap.delete(small);
            }
        }
    }
}

// 若N个结点（样本数量）
// 若isSameSet和union调用的次数越多，时间复杂度越低（趋近O(1)）

let a = new Node(1);
let b = new Node(2)
let arr = [a, b];
let test = new UnionFindSet(arr);
test.union(a.value, b.value);

console.log(test);