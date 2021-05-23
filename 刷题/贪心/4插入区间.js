// 给定一个良好的区间
// [1-5][6-7][9	-13]
// 这个区间由小到大递增，且各个区间之间没有相交的部分
// 再给第二个参数新区间，返回加入该区间后仍良好的区间
// 例如给定[7-14]
// 返回的结果为[1-5][6-17]

// 贪心

// 思路
// 选择会被影响的区间和新区间的最小值，以及最大值合并为新的区间，加入到结果数组；
function getRes(arr, newRegion) {
	let relationStart = [];
	let relationEnd = [];
	// 可能会被新区间开头影响的区间
	// 即原数组的元素结束数值小于新区间的开始数值，就不会被影响
	// 选择""可能""会被影响的区间
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][1] >= newRegion[0]) {
			relationStart.push(i)
		}
	}
	// 可能会被新区间结尾影响的区间
	// 即原数组的元素开始数值大于新区间的结束数值，就不会被影响
	// 选择""可能""会被影响的区间
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i][0] <= newRegion[1]) {
			relationEnd.push(i)
		}
	}
	// 保存真正会被影响的区间
	let relation = [];
	let count = Math.max(relationEnd.length, relationStart.length);
	// 可能会被新区间开头影响的区间
	// 可能会被新区间结尾影响的区间
	// 得到会被影响的区间的索引（以上两个数组取交集）
	for (let i = 0; i < count; i++) {
		if (relationEnd.includes(i) && relationStart.includes(i)) {
			relation.push(i)
		}
	}
	let res = [];
	for (let i = 0; i < arr.length; i++) {
		if (!relation.includes(i)) {
			// 防止改变原数组
			let temp = [arr[i][0], arr[i][1]]
			res.push(temp);
		}
	}
	let max = Number.MIN_SAFE_INTEGER;
	let min = Number.MAX_SAFE_INTEGER;
	min = min < newRegion[0] ? min : newRegion[0]
	max = max > newRegion[1] ? max : newRegion[1]
	for (let i = 0; i < relation.length; i++) {
		min = min < arr[relation[i]][0] ? min : arr[relation[i]][0];
		max = max > arr[relation[i]][1] ? max : arr[relation[i]][1];
	}

	let merge = [min, max];
	res.push(merge);
	return res.sort((a, b) => a[0] - b[0])

}
console.log(getRes([
	[1, 5],
	[6, 9],
	[13, 17],
	[20, 30]
], [10, 18]));

// 贪心