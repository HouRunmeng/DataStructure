// 给定一个数组，需要将该数组排序，但是为了提高效率，数组中可能存在前几个元素和后几个元素不用排序的情况
// 例如：[1,2,5,4,2,7,6,8,9]
// 元素1，2和元素8，9不用排序
// 思路：

function minSortArr(arr) {
	if (arr == null || arr.length == 0) {
		return false;
	}
	let max = Number.MIN_VALUE;
	let rightIndex = -1;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] >= max) {
			max = arr[i];
		} else {
			rightIndex = i;
		}
	}
	let min = Number.MAX_VALUE;
	let leftIndex = arr.length;
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] <= min) {
			min = arr[i]
		} else {
			leftIndex = i;
		}
	}
	return [leftIndex, rightIndex];
}

console.log(
	minSortArr([1, 2, 5, 4, 2, 7, 6, 8, 9])
);