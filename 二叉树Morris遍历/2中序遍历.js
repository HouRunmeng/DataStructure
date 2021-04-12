class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function getMostRight(node) {
    if (node == null) {
        return null;
    }
    let cur = node.left === null ? node : node.left
    while (cur.right !== null && cur.right !== node) {
        cur = cur.right
    }
    return cur
}

// morris遍历之后如何拿到先序遍历结果?
// 第一次访问结点,打印数据
// 如何拿到中序遍历结果?
// 若某个节点只能拿到一次,打印,若某个节点能拿到两次,打印第二次
// 如何能拿到后续遍历？
// 能够访问两次的结点，在第二次访问时，打印其左子树的有边界，
// 遍历完之后，逆序打印只能访问一次的结点数据
// 如何在输出后续遍历时数据时不增加额外空间？从当前节点的左孩子开始，遍历其右边界，类似单链表的调整，将左孩子的右边界逆序，再输出
// （将right指针看作单链表的next指针）
function Morris(root) {
    if (root == null) {
        return [];
    }
    let cur = root;
    while (cur !== null) {
        if (cur.left === null) {
            // 第一次访问节点,且该节点只能访问一次;
            console.log(cur.value);
            cur = cur.right;
        } else if (cur.left !== null) {
            let mostRight = getMostRight(cur);
            if (mostRight.right == null) {
                // 第一次访问节点，该结点能够访问两次
                mostRight.right = cur;
                cur = cur.left;
            } else if (mostRight.right == cur) {
                let mostRight = getMostRight(cur);
                // 第二次访问结点
                console.log(cur.value);
                mostRight.right = null;
                cur = cur.right;
            }
        }
    }
}

let node = new Node(1);
node.left = new Node(2)
node.right = new Node(3)
node.left.left = new Node(4);
node.left.right = new Node(5);
node.right.left = new Node(6);
node.right.right = new Node(7);

console.log(
    Morris(node)
    // getMostRight(node)
);


// morris复杂度估计：是否为O(N)?，因为有一个寻找左子树最右边界的循环的过程
// 复杂度不变
// 由Morris遍历图可知，在寻找的过程中，经过的结点没有重复，则寻找结点复杂度为O(N),即总过程的复杂度为O(N)

// 使用Morris算法，判断某棵树是否为搜索二叉树
// 思路：用某个变量存储先前打印的值，若先前打印的值小于当前值（在遍历的途中一直成立），则该树为搜索二叉树