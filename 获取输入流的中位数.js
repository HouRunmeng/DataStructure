// 获取输入流的中位数
// 大根堆，小根堆
// 大根堆：堆顶永远放当前堆的最大值
// 小根堆：堆顶永远放当前堆的最小值
// 放入数据，若大根堆为空，放入大根堆
// 若大根堆有数，如果输入的数小于等于大根堆的堆顶，放入大根堆，否则放入小根堆

// 每加入一个数，都要检查大根堆与小根堆的数的数量之差会不会超过2
// 如果差大于二，大根堆(小根堆)的堆顶弹出，进入小(大)根堆

// 调整堆O(logN),调整堆包括加入堆和弹出堆
// 检查差值O(1)
// 得到中位数O(1)
// 总数一共有奇数个（中位数为较大的堆的堆顶）

class Median {
    constructor() {
        this.minHeap = [];
        this.maxHeap = [];
    }
    modifyTwoHeap() {
        // 大根堆较小
        if (this.maxHeap.length == this.minHeap.length + 2) {
            this.minHeap.push(this.maxHeap.shift());

        }
        if (this.minHeap.length == this.maxHeap.length + 2) {
            this.maxHeap.push(this.minHeap.shift());
        }
        // 由小到大
        // 堆顶元素为索引为0的元素
        this.minHeap.sort((a, b) => a - b);
        // 由大到小
        this.maxHeap.sort((a, b) => b - a);
    }
    addNumber(value) {
        if (this.maxHeap.length == 0 || value <= this.maxHeap[0]) {
            this.maxHeap.push(value);
            this.maxHeap.sort((a, b) => b - a);
        } else {
            this.minHeap.push(value);
            this.minHeap.sort((a, b) => a - b);
        }
        // 调整堆
        this.modifyTwoHeap();
    }
    getMedian() {
        let maxSize = this.maxHeap.length;
        let minSize = this.minHeap.length;
        if (maxSize + minSize == 0) {
            return null;
        }
        // 共有偶数个数
        // (maxSize + minSize) & 1 == 0
        if ((maxSize + minSize) % 2 == 0) {
            return (this.maxHeap[0] + this.minHeap[0]) / 2;
        }
        // 奇数
        return maxSize > minSize ? this.maxHeap[0] : this.minHeap[0];
    }
}

let median = new Median();
median.addNumber(12)
median.addNumber(10)
median.addNumber(13)
median.addNumber(11)
median.addNumber(5)

// console.log(median.getMedian());


let a = [1, 9, 8, 4, 3, 10, -2, -10, 9, -100]
a.sort((a, b) => a - b)
console.log(a);
a.push(0)
console.log(a)