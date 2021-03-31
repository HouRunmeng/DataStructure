/*
 * @Author: your name
 * @Date: 2021-03-30 11:22:12
 * @LastEditTime: 2021-03-30 22:15:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\树\1前缀树.js
 */
// 前缀树又称单词查找树，字典树，Trie树，是一种树形结构，
// 典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。
// 它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。
// 哈希表也可以实现记录单词出现的次数的功能
// 前缀树比哈希表的优势：可以查找一某些子字符串开头的字符串出现的次数

// 前缀树又称单词查找树，字典树，Trie树，是一种树形结构
// 用于存储大量的字符串， 它的优点是： 利用字符串的公共前缀来节约存储空间
// Trie树主要是利用词的公共前缀缩小查词范围、 通过状态间的映射关系避免了字符的遍历， 从而达到高效检索的目的

// 前缀树的结点定义
class TrieNode {
    constructor() {
        // 该值保存经过该点的某个字符的数量
        this.pass = 0;
        // 该值保存以某个字符结尾的字符的数量
        this.end = 0;
        let nexts = [];
        nexts.length = 26;
        // 从该节点可能指向其他26个英文字母，初始化长度为26(写着也可自定义)
        // 初始化26，假定只有26个英文小写字母
        // 如果某处索引的取值为0，则说明该点未保存任何数据
        this.nexts = nexts.fill(null);
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    // 插入单词
    // O(字符串的长度)
    insert(str) {
        if (str.length === 0) {
            return;
        }
        let node = this.root;
        str = str.split('');
        node.pass++;
        let index = 0;
        for (let i = 0; i < str.length; i++) {
            // a的ASCII码值为97
            // 其本质为结点不保存字符，字符保存在路径上（线上），最终表现为pass和end的值
            index = str[i].charCodeAt(0) - 97;
            if (node.nexts[index] === null) {
                node.nexts[index] = new TrieNode();
            }
            node = node.nexts[index];
            node.pass++;
        }
        node.end++;
    }
    // 判断某个字符出现了几次
    // O(k)
    // k<=字符串的长度
    search(str) {
        if (str.length == 0) {
            return 0;
        }
        let node = this.root;
        str = str.split('');
        let index = 0;
        for (let i = 0; i < str.length; i++) {
            // a的ASCII码值为97
            // 其本质为结点不保存字符，字符保存在路径上（线上），最终表现为pass和end的值
            index = str[i].charCodeAt(0) - 97;
            if (node.nexts[index] === null) {
                return 0;
            }
            node = node.nexts[index];
        }
        // 返回该字符串出现的次数
        return node.end;
    }
    // 查找以某些字符开头的字符串出现了几次
    prefixNumber(partStr) {
        if (partStr.length == 0) {
            return 0;
        }
        let node = this.root;
        partStr = partStr.split('');
        let index = 0;
        for (let i = 0; i < partStr.length; i++) {
            // a的ASCII码值为97
            // 其本质为结点不保存字符，字符保存在路径上（线上），最终表现为pass和end的值
            index = partStr[i].charCodeAt(0) - 97;
            if (node.nexts[index] === null) {
                return 0;
            }
            node = node.nexts[index];
        }
        return node.pass;
    }
    // 删除单词
    // 思路：沿途pass--
    // 到达尾部end--
    delete(str) {
        // 删除的前提是之前添加过
        if (this.search(str) !== 0) {
            let node = this.root;
            node.pass--;
            str = str.split('');
            let index = 0;
            // 注意：在删除的途中，若pass的值减为0，直接将其子元素设置为0，空引用，其后空间直接被释放
            for (let i = 0; i < str.length; i++) {
                index = str[i].charCodeAt(0) - 97;
                if (--(node.nexts[index].pass) === 0) {
                    node.nexts[index] = null;
                    return;
                }
                node = node.nexts[index];
            }
            node.end--;
            return true;
        }
    }
    // c++
    // c++的空间必须手动释放
    // 所以，某个节点的pass减为0后，需遍历其后的所有结点，将其空间释放
    // 否则会内存泄露
    // deleteCplus(str) {
    //     // 删除的前提是之前添加过
    //     if (this.search(str) !== 0) {
    //         let node = this.root;
    //         node.pass--;
    //         str = str.split('');
    //         let index = 0;
    //         let a = null;
    //         let deleteIndex = -1;
    //         let set = new Set();
    //         for (let i = 0; i < str.length; i++) {
    //             index = str[i].charCodeAt(0) - 97;
    //             if (--(node.nexts[index].pass) === 0) {
    //                 a = a == null ? node : a;
    //                 deleteIndex = deleteIndex === -1 ? index : deleteIndex;
    //                 set.add(node.nexts[index]);
    //             }
    //             node = node.nexts[index];
    //         }
    //         node.end--;
    //         a.nexts[deleteIndex] = null;
    //     }
    // }
}
let a = new Trie();
a.insert('abc');
a.insert('abc');
a.insert('abed')
console.log(a.search('abc'));
a.deleteCplus('abc');
console.log(a.search('abc'));



// 后缀树，针对于一个字符串设定的，替代:后缀数组
// 前缀树，针对字符数组设定