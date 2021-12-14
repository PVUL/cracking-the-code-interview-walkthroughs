/* 
Given a binary tree, determine if it is height-balanced. A height-balanced binary 
tree is a tree where the difference between heights of left subtree and right subtree 
of any given node is not more than one. 

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function isBalanced(root) {
  function helper(node) {
    if (!node) return 0;

    const left = 1 + helper(node.left);
    const right = 1 + helper(node.right);

    if (Math.abs(left - right) > 1) return -Infinity;

    return Math.max(left, right);
  }

  return helper(root) === -Infinity ? false : true;
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Is Balanced", () => {
  it("returns true correctly", () => {
    const BST = new BinarySearchTree();
    BST.insert(8);
    BST.insert(3);
    assert.equal(isBalanced(BST.root), true);

    BST.insert(10);
    assert.equal(isBalanced(BST.root), true);
  });

  it("returns false correctly", () => {
    const BST = new BinarySearchTree();
    BST.insert(8);
    BST.insert(10);
    BST.insert(13);
    assert.equal(isBalanced(BST.root), false);

    const BST2 = new BinarySearchTree();
    BST2.insert(8);

    BST2.insert(7);
    BST2.insert(6);
    BST2.insert(5);

    BST2.insert(9);
    BST2.insert(10);
    BST2.insert(11);
    //             8
    //           /   \
    //          7     9
    //         /       \
    //        6         10
    //       /           \
    //      5             11
    assert.equal(isBalanced(BST2.root), false);
  });
});

mocha.run();
