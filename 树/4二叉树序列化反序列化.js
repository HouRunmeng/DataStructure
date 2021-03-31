/*
 * @Author: your name
 * @Date: 2021-03-31 10:34:21
 * @LastEditTime: 2021-03-31 12:25:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\树\4二叉树序列化反序列化.js
 */

// 序列化与反序列化
// 将二叉树的结点信心转为字符串
// 将字符串转换为二叉树
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// null结点不能省略
// 序列化
// 先序遍历
function serialize(head, arr) {
    if (head === null) {
        arr.push(null);
        return
    }
    arr.push(head.value);
    serialize(head.left, arr);
    serialize(head.right, arr);
}

// 反序列化
// 先建根节点
// 再建左子树
// 再建右子树
// 先序方式反序列化
function deserialization(arr) {
    let value = arr.shift();
    if (value == null) {
        return null
    }
    let node = new Node(value);
    // 建立左树
    node.left = deserialization(arr);
    // 建立右树
    node.right = deserialization(arr);
    return node;
}

let a = new Node('a')
let b = new Node('b');
let c = new Node('c');
let d = new Node('d');
a.left = b;
a.right = c;
c.left = d;
// let arr = [];
// serialize(a, arr);
// console.log(arr);
// console.log(
//     deserialization(arr)
// );


// // 字符串实现
function serializeByString(head) {
    if (head === null) {
        return '#_'
    }
    let res = head.value.toString() + '_';
    res += serializeByString(head.left);
    res += serializeByString(head.right);
    return res
}

function getRes(str) {
    let strArr = str.split('_');
    strArr.pop();
    return deserializationByString(strArr);
}

function deserializationByString(arr) {
    let value = arr.shift();
    if (value === '#') {
        return null
    }
    let node = new Node(value);
    // 建立左树
    node.left = deserializationByString(arr);
    // 建立右树
    node.right = deserializationByString(arr);
    return node;
}


console.log(
    getRes(
        serializeByString(a)
    )
);



// 应用：如何判断一个二叉树是否为某一个二叉树的子树
// 做法：将两棵树分别序列化，如果母树包含另一个子树的字串，则满足条件