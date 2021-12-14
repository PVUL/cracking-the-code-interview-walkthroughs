/* 
Given a binary tree and two nodes within the tree, write a function to find the lowest 
common ancestor (LCA) of the given nodes.

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function lowestCommonAncestor(root, p, q) {
  function helper(node, p, q) {
    if (!node) return null;
    if (node === p || node === q) return node;

    const leftSearchResult = helper(node.left, p, q);
    const rightSearchResult = helper(node.right, p, q);

    if (!leftSearchResult) return rightSearchResult;
    if (!rightSearchResult) return leftSearchResult;

    return node;
  }

  return helper(root, p, q);
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

describe("Lowest Common Ancestor", () => {
  const BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(2);
  BST.insert(4);
  const rootNode = BST.root;
  const twoNode = rootNode.left;
  const fourNode = rootNode.right;

  it("Returns common ancestor.", () => {
    assert.equal(lowestCommonAncestor(rootNode, twoNode, fourNode), rootNode);
  });

  it("Returns common ancestor if one of the input nodes is the answer.", () => {
    assert.equal(lowestCommonAncestor(rootNode, rootNode, fourNode), rootNode);
    assert.equal(lowestCommonAncestor(rootNode, rootNode, twoNode), rootNode);

    assert.equal(lowestCommonAncestor(rootNode, twoNode, twoNode), twoNode);
    assert.equal(lowestCommonAncestor(rootNode, fourNode, fourNode), fourNode);
  });
});

mocha.run();
