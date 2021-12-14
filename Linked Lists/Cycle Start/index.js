/* 
Given the head of a circular linked list, write code that returns the node where the 
cycle begins. 
EXAMPLE
Input: 
1 - 2 - 3 - 4 
        \   /
         \ /
          5
Output: 3
*/

function findCycleStart(head) {
  if (!head || !head.next) {
    return null;
  }

  let slow = head;
  let fast = head;
  let beginningOfLoop = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // Cycle detected
    if (slow === fast) {
      // Find start of loop
      while (slow !== beginningOfLoop) {
        slow = slow.next;
        beginningOfLoop = beginningOfLoop.next;
      }
      return beginningOfLoop;
    }
  }

  return null;
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

describe("Cycle Start", () => {
  it("returns beginning of loop correctly", () => {
    const l1 = convertArrToLL([1, 2, 3, 4, 5]);

    const threeNode = l1.next.next;
    const fiveNode = threeNode.next.next;

    fiveNode.next = threeNode;
    assert.equal(findCycleStart(l1), threeNode);
  });
  it("returns null if no loop", () => {
    const l1 = convertArrToLL([0, 1, 2, 1, 3]);
    assert.equal(findCycleStart(l1), null);
  });
});

mocha.run();
