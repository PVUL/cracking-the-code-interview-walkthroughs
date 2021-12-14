/* 
We are given two numbers n and m, and two-bit positions, i and j. Insert bits of m 
into n starting from j to i. Return the new resulting number.

Example
Input : n = 1024 (10000000000)
        m = 19   (00000010011)
        i = 2
        j = 6;
Output : n = 1100 (10001001100)
*/

function updateBits(n, m, i, j) {
  // Create a mask to clear bits i through j in n. EXAMPLE: i = 2, j = 4. Result
  // should be 11100011.
  const allOnes = ~0; // Will be sequence of all ones

  // 1s before position j, then 0s. left = 11100000
  const left = allOnes << (j + 1);

  // 1's after position i. right = 00000011
  const right = (1 << i) - 1;

  // Combine left and right to make mask.
  // Mask is all 1s, except for 0s between i and j. mask 11100011
  const mask = left | right;

  // For n, use mask to set 0s between i and j
  const nCleared = n & mask;

  // Shift bits in m to the left i times.
  const mShifted = m << i;

  // M is now inserted into N, from bit j to bit i
  return nCleared | mShifted;
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

describe("Insert Bits", () => {
  it("works", () => {
    assert.equal(updateBits(1024, 19, 2, 6), 1100);
    assert.equal(updateBits(5, 3, 1, 2), 7);
  });
});

mocha.run();
