// class Node {
//     constructor(val) {
//         this.val = val;
//         this.next = null;
//     }
// }

// // let a = new Node(1)
// // a.next = new Node(2);
// // a.next.next = new Node(4);

// // let b = new Node(1);
// // b.next = new Node(3);
// // b.next.next = new Node(4);

// let a = new Node(2)
// let b = new Node(1)

// // [1,2,4]
// // [1,3,4]
// function merge(l1, l2) {
//     let startNode = l1.val <= l2.val ? l1 : l2;
//     let ptr = startNode;

//     if (startNode == l1) {
//         l1 = l1.next;
//     } else {
//         l2 = l2.next;
//     }
//     while (l1 !== null && l2 !== null) {
//         if (l1.val <= l2.val) {
//             ptr.next = l1;
//             l1 = l1.next;
//             if (l1 == null) {
//                 break;
//             }
//         } else {
//             ptr.next = l2;
//             l2 = l2.next;
//             if (l2 == null) {
//                 break;
//             }
//         }
//         ptr = ptr.next;
//     }
//     ptr = ptr.next == null ? ptr : ptr.next;
//     while (l1 !== null) {
//         ptr.next = l1;
//         l1 = l1.next;
//         if (l1 == null) {
//             break;
//         }
//         ptr = ptr.next;
//     }
//     while (l2 !== null) {
//         ptr.next = l2;
//         l2 = l2.next;
//         if (l2 == null) {
//             break;
//         }
//         ptr = ptr.next;
//     }
//     return startNode
// }

// console.log(merge(b, a));


// var search = function (nums, target) {
//     let L = 0;
//     let R = nums.length - 1;
//     let M = L + ((R - L) >> 1);
//     while (L < R) {
//         if (nums[M] >= target) {
//             R = M - 1;
//             M = ((R + L) >> 1);
//         } else if (nums[M] < target) {
//             L = M + 1;
//             M = ((M + R) >> 1);
//         }
//     };
//     console.log(M);
//     let res = 0;
//     while (nums[M] < target || M == -1) {
//         M++
//     }
//     while (nums[M] == target) {
//         M++;
//         res += 1;
//     }
//     return res;

// }
// console.log(
//     search([2, 2], 2)
// )


function isLoop(node) {
    if (node == null) {
        return false
    }
    let set = new Set();
    while (node !== null) {
        if (!set.has(node)) {
            set.add(node);
        } else {
            return true
        }
        node = node.next;
    }
}

var getLen = function (node) {
    if (isLoop(node)) {
        console.log('sorry,this is a loop in it');
        return false;
    }
    if (node == null) {
        return 0;
    }
    let res = 0;
    while (node !== null) {
        res++;
        node = node.next
    }
    return res;
}
class Node {
    constructor(value) {
        this.value = value
        this.next = null;
    }
}

let a = new Node(1)
let b = new Node(2)
let c = new Node(3);
a.next = b;
b.next = c;
c.next = b;
console.log(isLoop(a));
console.log(getLen(a));