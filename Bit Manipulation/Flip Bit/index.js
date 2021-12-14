/* 
Give an integer a, we can flip exactly one bit. Write code to find the length of the 
longest sequence of 1s you could create. 

Example
Input : 1775 (11011101111)
Output : 8   (11011111111)
                    ^
After flipping the bit, we get consecutive 8 bits. 
*/

function flipBit(a) {
  let currLength = 0;
  let prevLength = 0;
  let maxLength = 0;

  while (a !== 0) {
    // If current bit is a 1, increase current length
    if ((a & 1) === 1) {
      currLength += 1;
      // If current bit is a 0
    } else {
      // If the next bit is a 1, previous Length should be set to the current Length.
      if ((a & 2) === 2) {
        prevLength = currLength;
        // If the next bit is a 0, then we can’t merge these sequences together. So, set the previous Length to 0.
      } else {
        prevLength = 0;
      }

      currLength = 0; // Reset currLength
    }

    maxLength = Math.max(prevLength + currLength, maxLength);
    a >>= 1; // Right shift 1
  }

  return maxLength + 1; // add 1 for flip bit count
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

describe("Flip Bit", () => {
  it("works", () => {
    assert.equal(flipBit(1775), 8);
    assert.equal(flipBit(12), 3);
    assert.equal(flipBit(15), 5);
    assert.equal(flipBit(71), 4);
  });
});

mocha.run();
