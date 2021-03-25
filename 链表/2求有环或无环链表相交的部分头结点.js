/*
 * @Author: hrm
 * @Date: 2021-03-23 21:07:34
 * @LastEditTime: 2021-03-25 21:07:11
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
// 1.判断链表是否有环，如果有，返回入环结点
// 2.两个无环单链表如何找到相交的结点
// 3.两个有环单链表如何找到相交结点
// 注意：一个链表有环，一个无环无法相交
// 实现
class Node {
    constructor(value) {
        this.next = null;
        this.value = value;
        this.rand = null;
    }
}

class LinkedList {
    // 使用hashTable实现
    // 思路：若一个链表无环，则一定能够遍历出去，尾结点一定指向null
    // 若有环，则会进入死循环,在此之前set已经把链表的所有结点遍历并存取了
    // 若碰到入环结点，此时set结构已经存在，返回信息即可
    // 否则返回null
    isAcyclicListWithSet(head) {
        if (head == null || head.next == null || head.next.next == null) {
            return null;
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
    // 利用两个指针，快指针和满指针，
    // 快指针走得快
    // 如果没有环，快指针会走到null
    // 如果有环，快慢指针一定会相遇
    // 若两指针相遇，快指针慢下来，回到头部，一次走一步
    // 快慢指针再次相遇的即位环的第一个结点
    // 注意：while(1)循环体应该先判断再移动指针，
    // 否则会出现以下问题
    // 如果链表的头部next指针指向了头部，若先移动指针，返回的结果为入环结点的下一个结点
    isAcyclicListWithNoSet(head) {
        if (head == null || head.next == null || head.next.next == null) {
            return null;
        }
        let originHead = head;
        let fast = head;
        let slow = head;
        while (fast !== null) {
            fast = fast.next == null ? null : fast.next.next;
            slow = slow.next;
            // 快慢指针相遇，慢指针位置不变，快指针移动到链表头部，速度减慢
            // 若不相遇(无环)，则必会退出while循环
            if (fast === slow) {
                fast = originHead;
                break;
            }
        }
        // 无环
        if (fast == null) {
            return null;
        }
        // 有环的情况
        // 注意：while(1)循环体应该先判断再移动指针，
        // 否则会出现以下问题
        // 如果链表的头部next指针指向了头部，若先移动指针，返回的结果为入环结点的下一个结点
        while (1) {
            if (fast === slow) {
                return fast;
            }
            fast = fast.next;
            slow = slow.next;
        }
    }
    // 拿到尾部的结点（无环链表）
    // 时间复杂度O(N)
    getFirstPublicNodeWithHashTable(head, head2) {
        // 若两个链表无环，且这两个链表相交，则相交的图像类似于Y
        // 注意：不可能画出类似于X的图像
        // 思考
        // 哈希表实现
        // 思路：首先遍历第一个链表，将所有的节点信息放入set，
        // 再次遍历链表2，每过一个结点查一次表，如果没有，继续，如果有，则必为相交的第一个结点
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
    // 不使用哈希表,得到两个无环链表的入环结点
    // 思路:若两个链表相交,则相交的最后一个结点地址一定相同
    // 否则不相交
    // 若最后一个结点的地址一样(即链表相交)，
    // 则较长的链表先走长的那一部分，之后短链表个常链表一起走，直至相加
    getFirstPublicNodeWithNoHashTable(head, head2) {
        let len1 = this.getListLength(head);
        let len2 = this.getListLength(head2);
        if (len1[1] === len2[1]) {
            let maxLen = Math.max(len1[0], len2[0]);
            let restStep = maxLen - Math.min(len1[0], len2[0])
            let inHead = maxLen == len1[0] ? head : head2;
            while (restStep > 0) {
                inHead = inHead.next;
                restStep--;
            }
            while (1) {
                if (inHead == head2) {
                    return inHead;
                }
                inHead = inHead.next;;
                head2 = head2.next;
            }
        }
        return null;

    }
    // 若无环，得到长度并返回最后一个结点
    getListLength(head) {
        if (head == null) {
            return 0;
        }
        let len = 0;
        // 无环链表
        let node = null;
        while (head !== null) {
            len += 1;
            node = head
            head = head.next;
        }
        return [len, node];
    }
    // 一.若两个链表无环，且这两个链表相交，则相交的图像一定类似于Y
    // 二.若两个链表均有环，分为三种情况
    // ①两个有环链表，不相交
    // ②两个有环链表
    // 有共享环，但是第一个相交的结点位于环外（两个链表的入环节点是同一个）
    //  1->1->1  1<-1<-1
    //         |
    //         v
    //         1
    //         | 
    //         v
    //         1->1->1 
    //         |     |
    //         |     v
    //          <-1<-1
    // ③有共享环，相交结点位于环内，且链表1与链表2的如换节点不一样
    // 1->1->1   1<-1<-1
    //       |   |
    //       |   v
    //       |   1
    //       |   | 
    //       |   v
    //       |->1->1->1 
    //          ^     |
    //          |     v
    //          1<-1<-1
    // 三.一个有环，一个无环
    // 不可能相交


}

let linkedList = new LinkedList();
let a = new Node('a');
let b = new Node('b');
let c = new Node('c');
let d = new Node('d');
let e = new Node('e');
let f = new Node('f');
a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;

let g = new Node('g');
g.next = new Node('h');
g.next.next = c
// g.next = c;
// console.log(
//     linkedList.isAcyclicListWithSet(a),
//     linkedList.isAcyclicListWithSet(g)

// );
console.log(

    linkedList.getFirstPublicNodeWithNoHashTable(a, g)
);