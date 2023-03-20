/*
Write a function that takes a linked list and removes duplicate nodes from the list.
Example:
1 - 2 - 2 - 3
1 - 2 - 3
FOLLOW UP
Solve this problem without using a temporary buffer
*/

function removeDuplicates(head) {
  // Solution 1: with a buffer
  // Time complexity: O(n) due to while loop
  // Space complexity: O(n) due to buffer
  const map = {}; // {1: true, 2: true}
  let current = head;
  let prev = null;
  while (current) {
    // if current node value has been seen before, it's a duplicate value
    if (current.data in map) {
      // so we'll skip over the current node by setting the prev node
      // to the next node, un-referencing the current node out of the linked list
      prev.next = current.next;
    } else {
      // if this is the first time we're seeing this current node
      // let's put it into the map
      map[current.data] = true;
      // then we'll want to set the prev node to the current node
      prev = current;
    }
    // then set the current node to the next node
    // this is almost like incrementing the index of an array
    current = current.next;
  }

  // Solution 2: without a buffer
  // Time complexity: O(n^2) because nested while loops to
  //                  check for each node all nodes ahead of it
  // Space complexity: O(1) because no use of buffer
  // However this is not ideal, and Solution 1 is a better
  // approach due to the time savings.
  // let current = head;
  // while (current) {
  //   let runner = current;
  //   while (runner.next) {
  //     // check all nodes ahead of the current node
  //     // to see if there are any duplicates
  //     if (runner.next.data === current.data) {
  //       // if so, un-reference the next runner node to the next next node
  //       runner.next = runner.next.next;
  //     } else {
  //       // otherwise move on to the next runner node
  //       // to continue the checks on subsequent nodes
  //       runner = runner.next;
  //     }
  //   }
  //   current = current.next;
  // }
}

//No buffer allowed
// function removeDuplicates(head) {
//   let current = head;

//   while (current) {
//     // Runner checks all nodes ahead of current
//     let runner = current;

//     while (runner.next) {
//       if (runner.next.data === current.data) {
//         // Deletes current runner node
//         runner.next = runner.next.next;
//       } else {
//         runner = runner.next;
//       }
//     }

//     current = current.next;
//   }
// }

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

describe('Remove Duplicates', () => {
  it('Removes dupes correctly, if they exist.', () => {
    let list = convertArrToLL([1, 2, 2, 3]);
    removeDuplicates(list);
    assert.equal(fetchLLVals(list).join(''), '123');

    list = convertArrToLL([2, 1, 2, 3]);
    removeDuplicates(list);
    assert.equal(fetchLLVals(list).join(''), '213');
  });
  it('does not remove dupes, if they do not exist.', () => {
    let list = convertArrToLL([1, 2, 3]);
    removeDuplicates(list);
    assert.equal(fetchLLVals(list).join(''), '123');
  });
});

mocha.run();
