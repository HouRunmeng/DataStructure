/*
 * @Author: your name
 * @Date: 2021-03-23 20:23:27
 * @LastEditTime: 2021-03-23 21:05:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \哈希表，有序表\简单介绍.js
 */

// js中叫做map和set
// 增删改查数据都是常数时间O(1)，和数据量无关，但是常数时间比较大
// 按值传递：
// 例如在java中，int按照值传递，即使两个数值相同的数地址不同，仍返回true
// 但是Interger按照引用传递，即使值相同，因为地址不同，返回false
// 引用传递
// 按值传递的哈希表的大小取决于基础类型的大小，引用传递仅仅是一个地址的拷贝


// 实现顺序表的数据结构：红黑树，avl树，跳表，sb树
// 存储方式与哈希表类似，都是可以按照自己定义的比较器进行存储
// 比哈希表完成的功能多
// 但是增删改查,last,first,ceil,floor的复杂度为(O(lobN))