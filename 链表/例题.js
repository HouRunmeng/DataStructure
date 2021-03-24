/*
 * @Author: your name
 * @Date: 2021-03-23 21:07:34
 * @LastEditTime: 2021-03-24 19:53:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\链表\简单介绍.js
 */

// 对于笔试，链表不太在乎空间复杂度，一切为了时间复杂度
// 面试：时间复杂度依然放在第一位，但是一定要找到最省空间的方法

// 重要技巧：额外数据结构，（哈希表）
// 快慢指针：设置两个指针，快指针一次走两步，慢指针一次走一步


// 例题：
// 1.
// 快慢指针例题：判断一个单链表是否回文
// 例如：1->2->3->2->1 

// 笔试：不计空间，接替思路：先遍历一次链表，申请一个栈结构（后进先出）
// 遍历时将所有的数据压入栈，在从头遍历，依次比较pop和链表当前的值是否相等

// 面试：快慢指针，设置两个指针，快指针一次走两步，慢指针一次走一步，当快指针到达头部时，满指针到达中间
// 然后快指针将指针反转，R指针记录下链表的最后位置，
// 然后再次从链表的头部指针(L)和尾部指针(R)分别向右和左走，比较其值
// 1->2->3->2->1
// 1->2->3<-2<-1
// L           R
// 返回之前需要将数据结构恢复


// 2.将链表划分为小于T的在左边，等于T的在中间，大于T的在右边
// 思路：笔试：将链表的元素放入数组，对数组排序，重新放入链表
// 面试：准备六个指针
// 小于4两个（首尾指针）
// 等于四
// 遍历链表，最后小于区的尾指针连等于区的头指针，等于区的尾指针连大于区的头指针
// 注意：很多边界条件需要考虑到

// 实现
class Node {
    constructor(value) {
        this.next = null;
        this.value = value;
        this.rand = null;
    }
}

class LinkedList {
    // 
    // 给定链表的头节点，每个结点有两个指针，一个next指针，一个是随机指针，深度拷贝该链表的结构
    // 实现1，
    // 额外空间map
    //    |--|
    //    v  | 
    // 1->2->3->4->null
    //    |     ^
    //    |-----|
    // 思路：例：map.set(1, 1');
    // map的键为原结点，值为拷贝结点
    // 具体实现见下
    copyLinkedListWithMap(head) {
        if (head == null) {
            return;
        }
        let map = new Map()
        let originHead = head;
        while (head !== null) {
            map.set(head, new Node(head.value));
            head = head.next;
        }
        head = originHead;
        while (head !== null) {
            // map.get(head)===>head'
            map.get(head).next = map.get(head.next);
            map.get(head).rand = map.get(head.rand);
            head = head.next;
        }
        return map.get(originHead);
    }
    // 不带额外空间
    // 实现思路
    // 将拷贝的结点（新生成的结点）放在原结点的next之后
    // 1->2->3->4->null
    // 1->->1'->2->->2'->3->3'->4->4'->null
    // 每次指针移动两次，
    // 最后将原链表复原
    copyLinkedListWithNoMap(head) {
        if (head == null) {
            return null;
        }
        // 保存头结点信息
        let originHead = head;
        // 生成新链表
        while (head !== null) {
            let originalHeadNext = head.next;
            let node = new Node(head.value.toString() + '假');
            head.next = node;
            node.next = originalHeadNext;
            head = originalHeadNext;
        }
        // 在原链表中给新结点添加rand属性
        let left = originHead;
        let right = originHead.next;
        while (left !== null) {
            // 解决left.rand不存在,left.rand.next报错问题
            right.rand = left.rand == null ? null : left.rand.next;
            left = left.next.next;
            // 解决右指针越界问题
            // 例如4'->null;
            // 在没有到链表的尾部时,左右指针均移动两次,到了尾部,右指针仅能移动一部,否则null.next会报错
            right = right.next !== null ? right.next.next : null;
        }
        // 恢复原链表，得到新链表 
        left = originHead;
        right = originHead.next;
        let res = right;
        // 具体思路画图演示
        while (left !== null) {
            left.next = right.next;
            right.next = left.next == null ? null : left.next.next;
            left = left.next
            right = right.next
        }
        return res;
    }
    // 笔试实现,空间复杂度较高,但是时间复杂度并没有上升
    listSortP(head) {
        let arr = [];
        let temp = head;
        while (head !== null) {
            arr.push(head.value);
            temp = temp.next;
        }
        // 排序(自定义排序算法或者利用系统的排序算法)
        arr.sort((a, b) => a - b);
        for (let i = 0; i < arr.length; i++) {
            head.value = arr[i];
            head = head.next;
        }
    }
    // 面试实现
    // target为参考值
    listSortM(head, target) {
        // 小于首尾指针
        let SH = null;
        let ST = null;
        // 等于区首尾指针
        let EH = null;
        let ET = null;
        // 大于区首尾指针
        let BH = null;
        let BT = null;
        // 
        let next = null;
        while (head !== null) {

            next = head.next;
            head.next = null;
            if (head.value < target) {
                // 头节点为空
                if (SH == null && ST == null) {
                    SH = head;
                    ST = head;
                    // 头节点不为空
                } else {
                    ST.next = head;
                    ST = head
                }
            } else if (head.value == target) {
                // 头节点为空
                if (EH == null && ET == null) {
                    EH = head;
                    ET = head;
                    // 头节点不为空
                } else {
                    ET.next = head;
                    ET = head
                }
            } else {
                // 头节点为空
                if (BH == null && BT == null) {
                    BH = head;
                    BT = head;
                    // 头节点不为空
                } else {
                    BT.next = head;
                    BT = head
                }
            }
            head = next;
        }
        // 链表重连
        // 小于区域不为空
        if (ST !== null) {
            ST.next = EH;
            ET = ET == null ? ST : ET;
        }
        if (ET !== null) {
            ET.next = BH;
        }
        return SH !== null ? SH : (SH !== null ? EH : BH);
    }
}

let linkedList = new LinkedList();

// // 临时链表
// let head = new Node(10);
// let a = new Node(6);
// let b = new Node(-1);
// head.next = a;
// a.next = b
// b.next = new Node(4)
// // 测试1用
// let res = linkedList.listSortM(head, 4);
// console.log(res);

// 建立含有rand的链表
let head = new Node(1)
let a = new Node(2)
let b = new Node(3)
let c = new Node(4)
head.next = a;
a.next = b;
b.next = c;
b.rand = a;
c.rand = a;
// linkedList.copyLinkedListWithMap()测试
// console.log(
//     linkedList.copyLinkedListWithMap(head)
// );
console.log(
    linkedList.copyLinkedListWithNoMap(head).next.next.rand
);