/*
 * @Author: your name
 * @Date: 2021-03-23 19:35:12
 * @LastEditTime: 2021-03-31 19:47:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \base\堆排序.js
 */

// 堆排序
// 优先级队列的底层为堆
// 堆：就是完全二叉树
// 大根堆：在完全二叉树中，每一棵子树的最大值就是子树的头结点
// heapInsert(i):若向二叉树中插入一个数组，根节点索引为0，其左子结点的索引为2*i + 1；右字节点的索引为2*i + 1(O(logN))
// arr[i]与arr[(i - 1) / 2](其父节点)比较值的大小，若子结点的值较小，进行交换，
// 交换后，原来的子节点继续与其结点比较值的大小，重复执行上述操作，直至变为大根堆（向上交换）
// heapiFy:arr.shift()以后，将arr[arr.length - 1]的元素移到数组头部，与其子节点的值进行比较，若子节点有一个结点的值比其大，进行交换，
// 如果均比其大，与最大值进行交换，向下交换，直至变为大根堆(O(logN))
// 子节点的父节点索引为(i-1)/2,i为当前子节点的索引
// 小根堆：

// 大根堆算法实现
// heapInsert==>向上转换
// (O(logN))
function heapInsert(arr, index) {
    while (arr[index] > arr[Math.floor((index - 1) / 2)]) {
        let parIndex = Math.floor((index - 1) / 2);
        [arr[index], arr[parIndex]] = [arr[parIndex], arr[index]];
        index = parIndex;
    }
}

// 向下转换
// 思路：数组shift以后，将数组pop的元素unshift数组中，头部元素和其两个孩子的值进行比较，
// O(logN)
function heapify(arr, index, heapSize) {
    let left = (index * 2) + 1;
    // 还有还子的时候
    while (left < heapSize) {
        // 两个孩子中，谁的值大，就把谁的索引赋值给largest
        let largest = (left + 1 < heapSize) && arr[left] < arr[left + 1] ? left + 1 : left;
        largest = arr[largest] > arr[index] ? largest : index;
        // 如果最大值就是当前值，说明已经到底部
        if (largest == index) {
            break;
        }
        [arr[index], arr[largest]] = [arr[largest], arr[index]]
        index = largest;
        left = (index * 2) + 1;
    }
}
// let arr = [7, 5, 8, 4, 3];
// arr.shift()
// arr.unshift(arr.pop())
// heapify(arr, 0, 5);
// console.log(arr);
function heapSort(arr) {
    // 变为大根堆
    // 向上转换
    // O(NlogN)
    // 依次把子树变为大根堆，直至最大的树变为大根堆
    for (let i = 0; i < arr.length; i++) { // O(N)
        heapInsert(arr, i); // O(logN)
    }
    // 优化：一次性把所有的书均变为大根堆，可降低复杂度，O(N)
    // 前提：用户一次性把数组元素全部输入
    // O(N) 
    // for (let i = arr.length; i >= 0; i--) {
    //     heapify(arr, i, arr.length)
    // }

    let heapSize = arr.length;
    [arr[0], arr[heapSize - 1]] = [arr[heapSize - 1], arr[0]];
    heapSize -= 1;
    while (heapSize > 0) { // O(N)
        heapify(arr, 0, heapSize); //O(logN)
        [arr[0], arr[heapSize - 1]] = [arr[heapSize - 1], arr[0]]; //O(1)
        heapSize -= 1;
    }
    return arr;
}
// let arr = [0, 2, 3, 4, 7, 9, 10, -1, 3, 3, 6]
// console.log(heapSort(arr));

// 堆排序扩展：已知一个几乎有序的数组，如果把数组排好顺序的话，每个元素移动的距离不超过k(函数参数)，并且k对于数组来说相对较小，
// 请选择一个合适的排序算法
// 思路：申请一个大小为k+1的小根堆（这样第k+1个元素如果是着k+1中最小的，移到最前面只需k步），每次将第一个元素弹出（索引为0且为最小值）
// 将k+i（i=2 3 4）的元素push进去，此时堆仍然为小根堆，重复操作