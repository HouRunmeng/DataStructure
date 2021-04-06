/*
 * @Author: your name
 * @Date: 2021-04-01 18:00:29
 * @LastEditTime: 2021-04-01 19:22:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \baseUp\哈希表和哈希函数\2实现.js
 */
// 哈希表的大小一般为质数（这些空间有些空间可能没有数据）


// [0, 1, 2, 3, 4, 5, 6]
//  |  |  |     |  
//  d  d  d     d
//     |
//     d
// 此时size为7
// effectiveLength为9（5 + 4）

// 哈希表扩容的次数logN
// 每次扩容的代价N
// 数据量从0--N
// 扩容的总代价：O(N) * log(logN)
// 单个数据扩容的代价:O(logN)

// 数据增删改的效率逼近O(1)
// size一般取质数，数学上认为用质数会使得哈希表很均匀
class HashTable {
    constructor() {
        // 哈希表的数据是用链表存取的
        // size为长度(非链表长度)
        this.size = 7;
        // 有效长度，即存取的数据的总个数
        this.effectiveLength = 0;
        this.data = [];
    }
}