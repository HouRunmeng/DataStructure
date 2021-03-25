/*
 * @Author: hrm
 * @Date: 2021-03-23 21:07:34
 * @LastEditTime: 2021-03-25 11:09:33
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


// 2.将链表划分为小于T的在左边，等于T的在中间，大于T的在右边（类似荷兰国旗问题）
// 思路：笔试：将链表的元素放入数组，对数组排序，重新放入链表
// 面试：准备六个指针
// 小于4两个（首尾指针）
// 等于四
// 遍历链表，最后小于区的尾指针连等于区的头指针，等于区的尾指针连大于区的头指针
// 注意：很多边界条件需要考虑到


// 题3
// 两个单链表相交的一系列问题
// 给定两个有环也可能五环的单链表，头节点head1,head2,
// 请实现一个函数，要求其功能为
// 如果两个链表相交，返回相交的第一个结点，否则返回null
// 如果两个链表长度之和为n,要求达到：T(O(n)),k(O(1))
// 注意：和结点的值没有任何关系
// 此处的相交指：两个链表从某个节点至其尾部均是共有的
// 思考：若想使一个链表打个弯继续往后指，能不能实现？
// 若结点只有一个指针，不能继续往后指，会形成回路，不可能在出来
// 若想完成以上情况，则打弯的那个节点至少俩个指针
// 若结点无环，则尾接结点一定指向null
// 若有环，则会进入循环
// 题3可分解为多个小题
// ①判断连边是否有环
// 实现
class Node {
    constructor(value) {
        this.next = null;
        this.value = value;
        this.rand = null;
    }
}

class LinkedList {
    // 思路：若一个链表无环，则一定能够遍历出去，尾结点一定指向null
    // 若有环，则会进入死循环
    // 若有环路，返回第一个环路的第一个结点
    // 否则返回null
    isAcyclicListWithSet(head) {
        if (head == null) {
            return true;
        }
        let set = new Set();
        while (head !== null) {
            if (set.has(head)) {
                return head
            }
            set.add(head);
            // 指针后移
            head = head.next;
        }
        return null
    }
    isAcyclicListWithNoSet(head) {
        // 利用两个指针，快指针和满指针，
        // 快指针走得快
        // 如果没有环，快指针会走到null
        // 如果有环，快慢指针一定会相遇
        // 若两指针相遇，快指针慢下来，回到头部，一次走一步
        // 快慢指针再次相遇的即位环的第一个结点
        // 保存头节点信息
        let originHead = head;
        let fast = head;
        let slow = head;
        while (fast !== null) {
            fast = fast.next.next;
            slow = slow.next;
            // 快慢指针相遇，慢指针位置不变，快指针移动到链表头部，速度减慢
            // 若不相遇(无环)，则必会退出while循环
            if (fast === slow) {
                fast = originHead;
                break;
            }
        }
        // 有环的情况
        while (1) {
            fast = fast.next;
            slow = slow.next;
            if (fast === slow) {
                return fast
            }
        }
        // 无环的情况
        return null;
    }
    getFirstPublicNodeWithHashTable(head, head2) {
        // 若两个链表无环，且这两个链表相交，则相交的图像类似于Y
        // 注意：不可能画出类似于X的图像
        // 思考
        // 哈希表实现,且均没有环
        // 思路：首先遍历第一个链表，将所有的节点信息放入set，再次遍历链表2，
        // 每过一个结点查一次表，如果没有，继续，如果有，则必为相交的第一个结点
        let node = this.isAcyclicListWithSet(head)
        let node2 = this.isAcyclicListWithSet(head2)
        if (node == null && node2 == null) {
            let set = new Set();
            while (head != null) {
                set.add(head);
                head = head.next;
            }
            // 得到相交的第一个结点
            while (head2 !== null) {
                if (set.has(head2)) {
                    return head2
                }
                head2 = head2.next;
            }
            return null;
        }
    }
    getFirstPublicNodeWithNoHashTable(head, head2) {
        // 如果两个没有环的链表相交，则其相交的最后一个结点的内存地址一定一样
        // 若不一样，则一定不相交
        // 若最后一个结点的地址一样，则较长的链表先走长的那一部分，之后短链表个常链表一起走，直至相加
        let node = this.isAcyclicListWithSet(head)
        let node2 = this.isAcyclicListWithSet(head2)
        if (node == null && node2 == null) {
            // false表示无环
            let listLen = this.getListLength(head, false);
            let listLen2 = this.getListLength(head2, false);
            if (listLen[1] === 0 && listLen2[1]) {

            }
        }

    }
    // 若无环，得到长度并返回最后一个结点
    // 若有环，仅返回长度
    getListLength(head, boolean) {
        if (head == null) {
            return 0;
        }
        let len = 0;
        // 有环链表
        if (boolean == true) {
            let set = new Set();
            while (head !== null) {
                set.add(head);
                len += 1;
                head = head.next;
                if (set.has(head)) {
                    return len;
                }
            }
        } else {
            // 无环链表
            let node = null;
            while (head !== null) {
                len += 1;
                node = head
                head = head.next;
            }
            return [len, node];
        }

    }
}

let linkedList = new LinkedList();