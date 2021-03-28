/*
 * @Author: your name
 * @Date: 2021-03-27 13:01:58
 * @LastEditTime: 2021-03-27 17:09:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\二叉树\3二叉树递归.js
 */

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
}




// 二叉树递归套路总结
// 1)假设以X节点为头,假设可以向X左树和X右树要任何信息
// 2)在上一步的假设下,讨论以X为头节点的树,得到答案的可能性（ 最重要)
// 可能性的常见分类：与当前结点有关，与当前结点无关
// 3)列出所有可能性后,确定到底需要向左树和右树要什么样的信息
// 4)把左树信息和右树信息求全集,就是任何一棵子树都需要返回的信息S
// 5)递归函数都返回S,每一棵子树都这么要求
// 6)写代码,在代码中考虑如何把左树的信息和右树信息整合出整棵树的信息