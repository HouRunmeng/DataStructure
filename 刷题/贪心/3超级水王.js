// 寻找数组中元素出现超过一半的数
function getRes(arr) {
	if (arr.length <= 0 || arr == null || arr == undefined) {
		return false;
	}
	let hp = 0;
	let value = 0;
	for (let i = 0; i < arr.length; i++) {
		if (hp == 0) {
			hp = 1;
			value = arr[i]
		} else if (arr[i] == value) {
			hp += 1;
		} else {
			hp -= 1;
		}
	}
	let count = 0;
	if (hp >= 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] == value) {
				count += 1;
			}
		}
	}
	return count > arr.length / 2 ? value : false;
}

console.log(getRes([1, 2, 1, 3, 3, 3, 3]));


// 超级水王扩展
// 求数组中出现次数大于N/k的元素
// n为数组的长度
// k为正整数（>=2）
// 易得，最多有k-1个该数字满足要求
// （若满足条件的有k个，j * (N/k) > N,(j >= k + 1)）
function getRes1(arr, k) {
	if (arr.length <= 0 || arr == null || arr == undefined) {
		return false;
	}
	let count = Math.floor(arr.length / k);
	console.log(count);
	let map = new Map();
	for (let i = 0; i < arr.length; i++) {
		if (map.size < count) {
			if (!map.has(arr[i])) {
				map.set(arr[i], 1)
			} else {
				map.set(arr[i], map.get(arr[i]) + 1)
			}
		} else {
			for (let [item] of map) {
				map.set(item, map.get(item) - 1);
				if (map.get(item) == 0) {
					map.delete(item);
				}
			}
		}
	}
	for (let [item] of map) {
		map.set(item, 0)
	}
	for (let index in arr) {
		if (map.has(arr[index])) {
			map.set(arr[index], map.get(arr[index]) + 1);
		}
	}
	let res = [];
	for (let [item] of map) {
		if (map.get(item) > arr.length / k) {
			res.push(item)
		}
	}
	return res;
}
console.log(getRes1([1, 1, 1, 1, 2, 2, 2, 3, 4, 5, 6, 10, 1, 1], 3));