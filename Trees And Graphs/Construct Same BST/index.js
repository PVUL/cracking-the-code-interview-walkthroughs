/* 
Given a root of a Binary Search Tree, return all possible arrays of node values that
will give the same binary search tree.

 Input
    5
   / \
  4   6

Output: [[5,4,6], [5,6,4]]
*/

/* Weave lists together in all possible ways. This works by removing the
head from one list, recursing, and then doing the same thing with the other list. */
function weaveLists(first, second, results, prefix) {
  // When first or second are empty, add the remainder to prefix and store the result.
  if (!first.head || !second.head) {
    /* We are using reference types here. So before pushing prefix to results, we will
    clone it. */
    const result = prefix.clone();
    result.addAll(first);
    result.addAll(second);
    results.push(result);
    return;
  }

  /* Recurse with headFirst added to the prefix. Removing the head will damage
  first, so we have to put it back where we found it afterwards. */
  const headFirst = first.shift(); // first.removeFirst()
  prefix.add(headFirst.data);
  weaveLists(first, second, results, prefix);
  prefix.pop();
  first.unshift(headFirst.data); // first.addFirst(headFirst)

  /* Recurse with headSecond added to the prefix. Removing the head will damage
  second, so we have to put it back where we found it afterwards. */
  const headSecond = second.shift(); // second.removeFirst()
  prefix.add(headSecond.data);
  weaveLists(first, second, results, prefix);
  prefix.pop();
  second.unshift(headSecond.data); // second.addFirst(headSecond)
}

function constructSameBST(root) {
  let result = [];
  if (!root) {
    result.push(new LinkedList());
    return result;
  }

  const prefix = new LinkedList();
  prefix.add(root.data);

  const leftSeq = constructSameBST(root.left);
  const rightSeq = constructSameBST(root.right);

  // Weave left and right list together.
  for (const left of leftSeq) {
    for (const right of rightSeq) {
      let weaved = [];
      weaveLists(left, right, weaved, prefix);
      result = result.concat(weaved);
    }
  }

  return result;
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

describe("Construct Same BST", () => {
  it("Returns correct result for BST with 3 nodes", () => {
    const BST = new BinarySearchTree();
    BST.insert(2);
    BST.insert(1);
    BST.insert(3);

    const res = [];
    for (linkedListHead of constructSameBST(BST.root)) {
      res.push(fetchLLVals(linkedListHead).join(""));
    }

    assert.equal(res.length, 2);
    assert.equal(res.includes("213"), true);
    assert.equal(res.includes("231"), true);
  });

  it("Returns correct result for BST with 6 nodes.", () => {
    const BST = new BinarySearchTree();
    BST.insert(4);
    BST.insert(1);
    BST.insert(5);
    BST.insert(0);
    BST.insert(2);
    BST.insert(6);

    const res = [];
    for (linkedListHead of constructSameBST(BST.root)) {
      res.push(fetchLLVals(linkedListHead).join(""));
    }

    assert.equal(res.length, 20);
    assert.equal(res.includes("410256"), true);
    assert.equal(res.includes("410526"), true);
    assert.equal(res.includes("410562"), true);
    assert.equal(res.includes("415026"), true);
    assert.equal(res.includes("415062"), true);
    assert.equal(res.includes("415602"), true);
    assert.equal(res.includes("451026"), true);
    assert.equal(res.includes("451062"), true);
    assert.equal(res.includes("451602"), true);
    assert.equal(res.includes("456102"), true);
    assert.equal(res.includes("412056"), true);
    assert.equal(res.includes("412506"), true);
    assert.equal(res.includes("412560"), true);
    assert.equal(res.includes("415206"), true);
    assert.equal(res.includes("415260"), true);
    assert.equal(res.includes("415620"), true);
    assert.equal(res.includes("451206"), true);
    assert.equal(res.includes("451260"), true);
    assert.equal(res.includes("451620"), true);
    assert.equal(res.includes("456120"), true);
  });
});

mocha.run();
