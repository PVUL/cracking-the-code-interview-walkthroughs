/*
Given an input string, write a function that returns a compressed string exactly as
seen below.
Example
bbcdddddbbb --> b2c1d5b3

If the "compressed" string is not smaller than the original string, return the
original string.
Example
abc --> abc
*/

function charLengthEncoding(str) {
  /** Solution 1.
   * Time Complexity: O(n) linear time due to while loop
   * Space Complexity: O(1) contant space
   */
  let compressedStr = ''; // b2c1d5b3
  let count = 1;
  for (i = 0; i < str.length; i++) {
    if (str[i] !== str[i + 1]) {
      compressedStr += str[i] + count.toString();
      count = 1; // reset count
    } else {
      count++;
    }
  }

  // console.log(compressedStr);
  return str.length <= compressedStr.length ? str : compressedStr;
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

describe('Character Length Encoding', () => {
  it("charLengthEncoding('aaaaaa') --> 'a6'", () => {
    assert.equal(charLengthEncoding('aaaaaa'), 'a6');
  });
  it("charLengthEncoding('bbcdddddbbb') --> 'b2c1d5b3'", () => {
    assert.equal(charLengthEncoding('bbcdddddbbb'), 'b2c1d5b3');
  });
  it("charLengthEncoding('abc') --> 'abc'", () => {
    assert.equal(charLengthEncoding('abc'), 'abc');
  });
});

mocha.run();
