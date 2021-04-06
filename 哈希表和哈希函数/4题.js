// 题目
// 设计一种结构，该结构有如下三种功能
// insert(key)=>将某个key加入该结构，做到不重复加入
// delete(key)=>将原本结构的某个key移除
// getRandom()=>等概率随机返回结构中的任何一个key

class Structure {
    constructor() {
        this.indexKey = new Map();
        this.keyIndex = new Map();
        this.size = 0;
    }
    insert(key) {
        this.keyIndex.set(key, this.size);
        this.indexKey.set(this.size++, key);
    }
    delete(key) {
        // 先确定要删除key的index，key
        // 将最后一个元素加入到被删除的位置
        // size--
        if (!this.keyIndex.has(key)) {
            // 拿到要删除的key的索引，以便map的最后一个元素重新设置索引
            let deleteIndex = this.keyIndex.get(key);
            // 最后一个元素的索引
            let lastIndex = --this.size;
            // 用最后一个索引拿到最后一个key
            let lastKey = this.indexKey.get(lastIndex);
            // 最后一个元素的索引设置为被删除key的索引
            this.keyIndex.set(lastKey, deleteIndex);
            // 被删除元素的索引的key设置为最后一个元素
            this.indexKey.set(deleteIndex, lastKey);
            // 删除原来的索引
            this.keyIndex.delete(key);
            // 删除原来的key
            this.indexKey.delete(lastIndex);
            // 先设置后删除的原因是：如果删除的元素是最后一个元素，如果先删除，之后又添加上了
        }
    }
    getRandom() {
        if (this.size == 0) {
            return null;
        }
        let randIndex = Math.floor(Math.random() * this.size)
        return this.indexKey.get(randIndex);
    }
}