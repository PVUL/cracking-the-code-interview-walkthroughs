/* 
Given a sorted array of nums (ascending order), write a function that creates a 
Balanced Binary Search Tree using the array nums.

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function sortedArrayToBST(sortedNums) {
  function helper(leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
      return null;
    }
    const midIndex = Math.floor((leftIndex + rightIndex) / 2);
    const node = new TreeNode(sortedNums[midIndex]);
    node.left = helper(leftIndex, midIndex - 1);
    node.right = helper(midIndex + 1, rightIndex);
    return node;
  }

  return helper(0, sortedNums.length - 1);
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

describe("Sorted Array To BST", () => {
  it("works", () => {
    const resultBST = sortedArrayToBST([-10, -3, 0, 5, 9]);

    assert.equal(isValidBST(resultBST), true);
    assert.equal(maxDepth(resultBST), 3);
  });
});

mocha.run();
