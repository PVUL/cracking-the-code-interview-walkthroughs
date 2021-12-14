/* 
Given the root of a binary tree and a targetSum, return the number of paths that sum 
to targetSum. The path does not need to start or end at the root or a leaf, but it 
must go downwards (i.e., traveling only from parent nodes to child nodes).

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function pathSum(root, targetSum) {
  if (!root) return 0;

  let numOfPaths = 0;

  function helper(node, currentSum) {
    if (!node) return;

    currentSum += node.data;
    if (currentSum === targetSum) numOfPaths += 1;
    helper(node.left, currentSum);
    helper(node.right, currentSum);
  }

  //Stack used to traverse every node in binary tree
  const stack = [root];
  while (stack.length) {
    const popped = stack.pop();
    if (popped.left) stack.push(popped.left);
    if (popped.right) stack.push(popped.right);
    helper(popped, 0);
  }

  return numOfPaths;
}

// function pathSum(root, targetSum) {
//   let count = 0;
//   const ht = {}; // {sum: occurencesOfSum}

//   function dfs(node, cumulativeSum) {
//     if (!node) return;

//     cumulativeSum += node.data;

//     if (cumulativeSum === targetSum) {
//       count += 1;
//     }

//     if (cumulativeSum - targetSum in ht) {
//       count += ht[cumulativeSum - targetSum];
//     }

//     ht[cumulativeSum] = ht[cumulativeSum] + 1 || 1;

//     dfs(node.left, cumulativeSum);
//     dfs(node.right, cumulativeSum);

//     /* Once we are done traversing a path, we don't want to use the values
//     in that path again when traversing a different path */
//     ht[cumulativeSum]--;
//   }

//   dfs(root, 0);
//   return count;
// }

mocha.setup("bdd");
const { assert } = chai;

describe("Path Sum", () => {
  it("[1,-2,-3], -1 returns 1", () => {
    const bst = new BinarySearchTree();
    bst.insert(1);

    const root = bst.root;
    root.left = new TreeNode(-2);
    root.right = new TreeNode(-3);

    assert.equal(pathSum(root, -1), 1);
  });
  it("[1,-2,-3], 100 returns 0", () => {
    const bst = new BinarySearchTree();
    bst.insert(1);

    const root = bst.root;
    root.left = new TreeNode(-2);
    root.right = new TreeNode(-3);

    assert.equal(pathSum(root, 100), 0);
  });
});

mocha.run();
