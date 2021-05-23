arr = [1, -1, 23, -10]
arr.sort((a, b) => a - b)
console.log(arr);


function getRes(segments) {
	if (segments.length <= 0 || segments == null || segments == undefined) {
		return false
	}
	segments.sort((a, b) => a - b);
	let res = [];
	res.push(segments[0].end);
	for (let i = 1; i < segments.length; i++) {
		while (res[0] <= segments[i].start) {
			res.shift();
		}
		res.push(segments[i].end);
		res.sort((a, b) => a - b);
	}
	return res.length
}
let sengments = [{
	start: 1,
	end: 7
}, {
	start: 1,
	end: 4
}, {
	start: 1,
	end: 9
}, {
	start: 2,
	end: 13
}, {
	start: 5,
	end: 10
}, ]
console.log(getRes(sengments));