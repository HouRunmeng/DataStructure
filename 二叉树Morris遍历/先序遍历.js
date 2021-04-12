// 二叉树递归：时间复杂度O(N)
// 额外空间复杂度O(H),H为树的高度   

// 但是Morris可以降低空间复杂度O(1)
// 笔试不会用到，笔试在意时间

// 流程
// cur = head
// 若cur没有左树，cur = cur.right
// 若cur有左树，一直找到其左树的最右结点（非空）mostRight
// ①若mostRight为的右指针为null,mostRight的右指针指向cur，cur向左移动
// ②若mostRight的右指针指向cur，那么让其恢复null的状态，cur向右移动
// ③cur若移动为null，立即停止移动

// 若某个结点没有左树，cur一定会来到这个结点一次
// 若某个结点有左树，cur一定会来到这个结点两次
// 对于有左树的结点，因为遍历了两次，那么这两个相同的结点之间一定会将其左树遍历完

// 利用底层节点右指针指向cur（之后cur左移）的位置，方便cur回到上级
// 二叉树天然没有指向父节点的指针，如果不能申请额外的空间，只能从底层的null指针入手
// 如果cur结点左子树的最右结点为空，那么cur一定是第一次到达这个结点，
// 如果cur结点左子树的最右结点为本身，那么cur一定是第二次到达这个结点，
// 如果是第二次来到这个节点，那么需要恢复最右指针为空，向右移动（此时左子树已经遍历完毕）
// 记：将cur移到的点的顺序，记为morris顺序下


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
    // cur.right !== node (因为cur.right可能是经过人为修改的，必须限制)
    // 若cur.right == node,说明当前节点已经访问过了 
    while (cur.right !== null && cur.right !== node) {
        cur = cur.right
    }
    return cur
}

// morris遍历之后如何拿到先序遍历结果?
// 第一次访问结点,打印数据
// 如何拿到中序遍历结果?
// 若某个节点只能拿到一次,打印,若某个节点能拿到两次,打印第二次
// 如何让拿到后续遍历？
// 能够访问两次的结点，在第二次访问时，打印其左子树的有边界，
// 遍历完之后，逆序打印只能访问一次的结点数据
// 如何在输出后续遍历时数据时不增加额外空间？从当前节点的左孩子开始，遍历其右边界，类似单链表的调整，将左孩子的右边界逆序，再输出
// （将right指针看作单链表的next指针）
function Morris(root) {
    if (root == null) {
        return [];
    }
    let cur = root;
    // 以下所有声明的数组，本不应声明，应该直接打印值，否则会提高空间复杂度
    // 此处为了方便，将先序，中序的遍历结果存储下来，方便观察
    while (cur !== null) {
        if (cur.left === null) {
            // 第一次访问节点,且该节点只能访问一次;
            console.log(cur.value);
            cur = cur.right;
        } else if (cur.left !== null) {
            let mostRight = getMostRight(cur);
            if (mostRight.right == null) {
                // 第一次访问节点，该结点能够访问两次
                console.log(cur.value);
                mostRight.right = cur;
                cur = cur.left;
            } else if (mostRight.right == cur) {
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