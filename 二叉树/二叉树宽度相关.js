/*
 * @Author: your name
 * @Date: 2021-03-26 21:21:25
 * @LastEditTime: 2021-03-26 21:27:55
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
    static getMaxWidth(head) {
        if (head == null) {
            return 0;
        }
        let map = new Map();
        map.set(head, 0);
        let queue = [];
        queue.push(head);
        let levelMaxWidth = 0;
        while (queue.length !== 0) {
            let cur = queue.shift();
            if (cur.left !== null) {
                queue.push(cur.left);
                map.set(cur.left, map.get(cur));

            }
            if
        }
    }
}

let b = new Node('b');
let a = new Node('a');
let c = new Node('c');
let d = new Node('d');
let e = new Node('e');
a.left = b;
b.left = c;
a.right = d;
d.right = e;