/* 
Given numbers a and b, write a function to count number of flipped bits needed to 
convert a to b.

Example
Input : a = 7, b = 10
Output : 3
Binary representation of 7 is  0 0 0 0 0 1 1 1
Binary representation of 10 is 0 0 0 0 1 0 1 0
                                       ^ ^   ^
We need to flip three bits in a to make it b. 
*/

function flippedCount(a, b) {
  return countSetBits(a ^ b);
}

function countSetBits(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n = n >> 1;
  }
  return count;
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

describe("Flipped Count", () => {
  it("works", () => {
    assert.equal(flippedCount(10, 20), 4);
    assert.equal(flippedCount(7, 10), 3);
    assert.equal(flippedCount(29, 5), 2);
  });
});

mocha.run();
