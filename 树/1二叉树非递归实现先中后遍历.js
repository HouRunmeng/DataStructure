/*
 * @Author: hrm
 * @Date: 2021-03-26 10:52:18
 * @LastEditTime: 2021-03-27 13:03:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\二叉树\二叉树非递归实现遍历.js
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


class BT {
    // 先序遍历，非递归
    static preorderTraversal(head) {
        // 思路：准备一个栈，
        // 先将头部压入栈，弹出，打印value
        // 若弹出节点有右结点，压入；否则，压入左节点
        // 直至栈空
        if (head == null) {
            return;
        }
        let stack = [];
        stack.push(head);
        let res = [];
        while (stack.length !== 0) {
            let cur = stack.pop();
            res.push(cur.value);
            if (cur.right !== null) {
                stack.push(cur.right);
            }
            if (cur.left !== null) {
                stack.push(cur.left)
            }
        }
        return res;
    }

    // 中序遍历，非递归
    static middleOrderTraversal(head) {
        // 思路：
        // ①不停将左孩子压入栈，如没有左孩子，进入步骤②
        // ②输出弹出节点的值，压入从栈中弹出结点的右孩子，重复阶段①
        if (head == null) {
            return;
        }
        let stack = [];
        let res = [];
        let cur = head;
        while (stack.length !== 0 || cur !== null) {
            if (cur !== null) {
                stack.push(cur);
                cur = cur.left
            } else {
                cur = stack.pop();
                res.push(cur.value);
                cur = cur.right;
            }
        }
        return res;
    }
    // 后序遍历，非递归
    // 与非递归先序遍历相反，先押入左孩子，再压入右孩子
    // 得到的结果反转
    // 得到后序遍历
    static postorderTraversal(head) {
        if (head == null) {
            return;
        }
        let stack = [];
        stack.push(head);
        let res = [];
        while (stack.length !== 0) {
            let cur = stack.pop();
            res.push(cur.value);
            if (cur.left !== null) {
                stack.push(cur.left)
            }
            if (cur.right !== null) {
                stack.push(cur.right);
            }
        }
        return res.reverse();
    }
    // 宽度优先遍历，队列实现
    static widthFirstTraversal(head) {
        if (head == null) {
            return null;
        }
        let queue = [];
        let res = [];
        queue.push(head);
        while (queue.length !== 0) {
            let cur = queue.shift();
            res.push(cur.value);
            if (cur.left !== null) {
                queue.push(cur.left)
            }
            if (cur.right !== null) {
                queue.push(cur.right);
            }
        }
        return res
    }




    static getPrintRes(head) {
        console.log('二叉树');
        this.printTree(head, 0, "H", 17);
    }
    // 四个参数表示头节点,当前结点的高度, 当前结点的状态(H为头节点,v为右子节点,^为左子节点)
    // len表示结点的总长度(包括身份符号和值)
    static printTree(head, height, status, len) {
        if (head == null) {
            return;
        }
        this.printTree(head.right, height + 1, 'v', len);

        let value = `${status}${head.value}${status}`;
        let valueLen = value.length;
        let lenL = Math.floor((len - valueLen) / 2);
        let lenR = len - lenL - valueLen;
        value = `${this.getSpace(lenL)}${value}${this.getSpace(lenR)}`;
        // 高度越高,空格越多
        console.log(this.getSpace(height * len) + value);

        this.printTree(head.left, height + 1, '^', len);
    }
    static getSpace(len) {
        let space = ' ';
        for (let i = 0; i < len; i++) {
            space += ' ';
        }
        return space
    }
}

let a = new Node('a')
let b = new Node('b')
let c = new Node('c')
let d = new Node('d')
let e = new Node('e')
a.left = b
b.left = c;
a.right = d;
d.right = e;
// BT.getPrintRes(a)
console.log(BT.widthFirstTraversal(a));