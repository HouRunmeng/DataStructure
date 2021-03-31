/*
 * @Author: your name
 * @Date: 2021-03-27 13:01:58
 * @LastEditTime: 2021-03-31 10:33:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\二叉树\3二叉树递归.js
 */
// 二叉树的递归
// 树型DP的题均可用二叉树递归解决
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BT {
    // 题1
    // 判断二叉树是否为搜索二叉树
    // 注意：此题为递归实现
    // 非递归实现思路：非递归中序遍历，如果输出的结果有序递增，则为搜索二叉树，此处略
    // 搜索二叉树满足的条件：
    // ①当前节点的左子树是搜索二叉树
    // ②当前结点的右子树树搜索二叉树
    // ③当前结点的左子树的最大值小于当前结点右子树的最小值
    static isSearchBT(head) {
        if (head == null) {
            return null;
        }
        // 拿到左子树和右子树的信息
        let leftData = this.isSearchBT(head.left);
        let rightData = this.isSearchBT(head.right);
        // 以当前结点为根结点，拿到此棵树的最大值，最小值，向上层父节点汇报信息
        let min = head.value;
        let max = head.value;
        if (leftData !== null) {
            min = Math.min(min, leftData.min)
            max = Math.max(max, leftData.max);
        }
        if (rightData !== null) {
            min = Math.min(min, rightData.min);
            max = Math.max(max, rightData.max)
        }
        // 不妨假定以当前结点为根节点的树不是二叉搜索树
        let isSearchBT = false;
        // 以当前结点为根节点的树是二叉搜索树的条件
        // 1.左子树是二叉搜索树
        // 2.右子树是二叉搜索树
        // 3.左子树的最大值小于当前结点的值
        // 右子树的最小值大于当前节点的值
        if ((leftData == null ? true : ((leftData.max < head.value) && leftData.isSearchBT)) &&
            (rightData == null ? true : ((rightData.min > head.value) && rightData.isSearchBT))) {
            // 条件符合
            // 以当前结点为根节点的树是搜索二叉树
            isSearchBT = true;
        }
        // 向父节点返回信息
        return {
            min,
            max,
            isSearchBT
        }
    }


    // 题2
    // 判断二叉树是否为满二叉树
    // 注：满二叉树定义
    // 非递归实现：
    // 统计二叉树的高度
    // 如果是满二叉树，则必有N = (2^h) - 1
    // 其中，N是二叉树的结点总数,h是二叉树的高度
    // 统计二叉树高度的算法，详见我的二叉树宽度，高度相关博客
    // 此处为递归实现，非递归实现略

    // 满二叉树满足的条件，左子树是满二叉树，右子树是满二叉树
    // 子节点需要给父节点汇报的信息
    // 当前结点的高度
    // 以当前节点为根节点的树的结点数目
    // （得到两个信息，利用N = (2^h) - 1即可）
    static isCompleteBT(head) {
        if (head == null) {
            return {
                height: 0,
                nodes: 0
            }
        }
        let leftData = this.isCompleteBT(head.left);
        let rightData = this.isCompleteBT(head.right);
        // 以当前结点为根节点的结点数量
        let nodes = rightData.nodes + leftData.nodes + 1;
        let height = Math.max(leftData.height, rightData.height) + 1;
        return {
            height,
            nodes
        }
    }
    // 主函数调用
    // let info = this.isCompleteBT(head);
    // let height = info.height;
    // let nodes = info.nodes;
    // return nodes === (1 << height) - 1;


    // 题3
    // 判断二叉树是否为平衡二叉树
    // 平衡二叉树，每一棵子树，左子树和右子树的高度不会超过1

    // 需要得到条件
    // ①左子树的高度
    // ②右子树的高度
    // ③左子树是否为平衡二叉树
    // ④右子树是否为平衡二叉树

    // 平衡树满足的条件：
    // 左子树为平衡树
    // 右子树为平衡树
    // 左右子树的高度差不会大于1
    static isBalancedBT(head) {
        if (head == null) {
            return {
                isBalancedBT: true,
                height: 0
            }
        }
        let leftData = this.isBalancedBT(head.left);
        let rightData = this.isBalancedBT(head.right);
        let height = Math.max(leftData.height, rightData.height) + 1;
        let isBalancedBT = false;
        if (leftData.isBalancedBT && rightData.isBalancedBT && (Math.abs(leftData.height - rightData.height) <= 1)) {
            isBalancedBT = true;
        }
        return {
            height,
            isBalancedBT
        }
    }


    // 题4
    // 给定一个树上的两个结点
    // 返回这两个结点的最近公共祖先
    // Info结构见下文
    static getLatestAncestor(head, node1, node2) {
        if (head === null) {
            return new Info(false, false, null);
        }
        if (node1 === node2) {
            return new Info(true, true, node1);
        }
        let leftData = this.getLatestAncestor(head.left, node1, node2);
        let rightData = this.getLatestAncestor(head.right, node1, node2);
        // 左树发现了最低公共祖先
        if (leftData.latestAncestor !== null) {
            return new Info(true, true, leftData.latestAncestor);
        }
        // 右树发现了公共祖先
        if (rightData.latestAncestor !== null) {
            return new Info(true, true, rightData.latestAncestor);
        }
        // 左右树均无发现最低公共祖先,但是左右子树发现了两个结点
        // 找到了两个结点，说明当前节点即为两个结点的最近公共祖先
        if (leftData.isFind1 && rightData.isFind2) {
            return new Info(true, true, head)
        }
        if (leftData.isFind2 && rightData.isFind1) {
            return new Info(true, true, head);
        }
        // 左右两树都没有发现最低公共祖先，而且最低公共祖先不在当前结点交汇
        // 以下代码解决的情况：
        // 左右两树只包含find1,或者左右两树只包含find2,或者两个结点均没有找到
        // 注意：左右子树只发现了一个结点，如果当前结点为未被发现的第二个结点，当前节点也是最低公共祖先 
        let isFind1 = head == node1
        let isFind2 = head == node2;
        if (leftData.isFind1 || rightData.isFind1) {
            if (isFind2) {
                return new Info(true, true, head)
            } else {
                return new Info(true, false, null)
            }
        }

        if (leftData.isFind2 || rightData.isFind2) {
            if (isFind1) {
                return new Info(true, true, head)
            } else {
                return new Info(false, true, null)
            }
        }
        // 以上情况均不满足
        return new Info(isFind1, isFind2, null)
    }
    // 题5
    // 如何判断某个数是否为完全二叉树
    // 宽度优先遍历
    // 需要满足的条件
    // 遍历的任何节点不能只有右孩子没有左孩子
    // 一旦遇到还子不双全的结点，接下来的结点必须是叶结点
    static isCompleteBT(head) {
        if (head === null) {
            return true;
        }
        let queue = [];
        let isMeet = false;
        let left = null;
        let right = null;
        queue.push(head);
        while (queue.length !== 0) {
            let cur = queue.shift();
            left = cur.left;
            right = cur.right;
            // 左孩子为空但是右孩子不为空
            // 或者已经遇见过结点不全的结点，那么之后的结点必须是叶子结点，均不能有左右孩子
            if ((left === null && right !== null) || (isMeet && (left !== null || right !== null))) {
                return false;
            }
            if (left !== null) {
                queue.push(cur.left)
            }
            if (right !== null) {
                queue.push(cur.right)
            }
            if (left == null || right == null) {
                // 遇到了左右孩子不全的结点
                isMeet = true
            }
        }
    }
}

class Info {
    constructor(isFind1, isFind2, latestAncestor) {
        this.isFind1 = isFind1;
        this.isFind2 = isFind2;
        this.latestAncestor = latestAncestor;
    }
}




// 二叉树递归套路总结
// 1)假设以X节点为头,假设可以向X左树和X右树要任何信息
// 2)在上一步的假设下,讨论以X为头节点的树,得到答案的可能性（ 最重要)
// 可能性的常见分类：与当前结点有关，与当前结点无关
// 3)列出所有可能性后,确定到底需要向左树和右树要什么样的信息
// 4)把左树信息和右树信息求全集,就是任何一棵子树都需要返回的信息S
// 5)递归函数都返回S,每一棵子树都这么要求
// 6)写代码,在代码中考虑如何把左树的信息和右树信息整合出整棵树的信息


let a = new Node('a');
let b = new Node('b');
let c = new Node('c');
let d = new Node('d');
let e = new Node('e');
let f = new Node('f');
a.left = b;
a.right = c;
c.left = d;
c.right = f;
let g = new Node('g');
d.right = e;

console.log(BT.getLatestAncestor(a, a, g));