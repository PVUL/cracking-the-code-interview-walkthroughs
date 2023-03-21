/*
Given two numbers represented by two lists, write a function that adds the two numbers
and return the sum as a linked list. The digits are stored in reverse order.
EXAMPLE
Input: [7,1,6] + [5,9,2]
Output: [2,1,9] --> 617 + 295 = 912
*/

function addTwoNumbers(l1, l2) {
  // Solution:
  // Time Complexity: O(max(m, n))
  // Space Complexity: O(max(m, n))
  let sum = new ListNode('');
  let current = sum; // tail of LL
  let carry = 0; // either 0 or 1, but may greater temporarily, since we are using it as value store for the of l1 and l2 current nodes

  while (l1 || l2 || carry) {
    if (l1) {
      carry += l1.data;
      l1 = l1.next;
    }

    if (l2) {
      carry += l2.data;
      l2 = l2.next;
    }

    current.next = new ListNode(carry % 10); // we set the next node to the mod 10 value
    carry = carry >= 10 ? 1 : 0; // reset carry
    current = current.next;
  }

  return sum.next;
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

mocha.setup('bdd');
const { assert } = chai;

describe('Add Two Numbers', () => {
  it('works', () => {
    const l1 = convertArrToLL([7, 1, 6]);
    const l2 = convertArrToLL([5, 9, 2]);

    const res = addTwoNumbers(l1, l2);
    assert.equal(fetchLLVals(res).join(''), '219');
  });
});

mocha.run();
