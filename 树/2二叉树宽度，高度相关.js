/*
 * @Author: your name
 * @Date: 2021-03-26 21:21:25
 * @LastEditTime: 2021-03-27 14:41:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\二叉树\二叉树宽度相关.js
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


class BT {
    // 设置队列，遍历当前结点，将其左右节点均压入队列
    // map记录的格式：node=>height
    static getMaxWidth(head) {
        if (head == null) {
            return 0;
        }
        let map = new Map();
        map.set(head, 1);
        let queue = [];
        queue.push(head);

        let clevel = 1;
        let cNodes = 0;
        let max = 0;
        while (queue.length !== 0) {
            let cur = queue.shift();
            let level = map.get(cur);
            if (clevel == level) {
                cNodes++;
            } else {
                if (cNodes > max) {
                    max = cNodes;
                }
                // 本层结点统计完毕，跳到下一层
                clevel++;
                cNodes = 1;
            }
            if (cur.left !== null) {
                queue.push(cur.left);
                map.set(cur.left, map.get(cur) + 1);
            }
            if (cur.right !== null) {
                queue.push(cur.right);
                map.set(cur.right, map.get(cur) + 1);
            }
        }
        // 出whuile之后，最后一层的结点数未统计，重新统计
        max = Math.max(max, cNodes);
        return max
    }
    // 得到二叉树高度
    // 头节点高度为1
    static getHeight(head) {
        if (head == null) {
            return 0;
        }
        // map存储的格式：node==>height
        let map = new Map();
        map.set(head, 1);
        let queue = [];
        queue.push(head);
        let height = 1;
        while (queue.length !== 0) {
            let cur = queue.shift();
            if (cur.left !== null) {
                queue.push(cur.left);
                map.set(cur.left, map.get(cur) + 1);
            }
            if (cur.right !== null) {
                queue.push(cur.right);
                map.set(cur.right, map.get(cur) + 1);
            }
            // 更新高度
            if (cur.left !== null || cur.right !== null) {
                height = cur.left !== null ? map.get(cur.left) : map.get(cur.right);
            }
        }
        return height;
    }
    // 递归得到高度
    static getHeightRecursion(head) {
        if (head == null) {
            return 0
        }
        let leftHeight = this.getHeightRecursion(head.left);
        let rightHeight = this.getHeightRecursion(head.right);
        let height = Math.max(leftHeight, rightHeight) + 1;
        return height;
    }
}

let a = new Node(10)
a.left = new Node(9);
a.right = new Node(10);
a.left.left = new Node(9);
console.log(
    BT.getHeightRecursion(a)
);