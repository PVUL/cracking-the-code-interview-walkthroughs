/*
Given a string, return true if every character appears just once, and return false
otherwise. Can you solve this without using any additional data structures?

Examples
"abc" --> true
"abccd" --> false
*/

function noDuplicates(str) {
  /** base case */
  // there are only 128 characters, so we know if the
  // string is longer that there are duplicates
  if (str.length > 128) {
    return false;
  }

  /** Solution 1 (Best): with add'l data structure
   * Time complexity: O(N), but technically it's O(1), because
   * we do a check for 128 chars, it's not infinite.
   * Space complexity: O(1)
   */
  const charSet = {}; // {a: true, b: true}
  for (const char of str) {
    if (char in charSet) {
      return false;
    }
    charSet[char] = true;
  }
  return true;

  /** Solution 2 (OK): with nested for loops and no add'l data structures
   * Time complexity: O(N^2)
   * Space complexity: O(1)
   */
  // for (let i = 0; i < str.length; i++) {
  //   for (let j = i + 1; j < str.length; j++) {
  //     if (str[i] === str[j]) {
  //       return false;
  //     }
  //   }
  // }
  // return true;

  /** Solution 3 (Better): use a sorting algorithm and no add'l data structure
   * Time complexity: O(N log N)
   * Space complexity: O(1)
   */
  // str = str.split('').sort().join('');
  // for (let i = 0; i < str.length; i++) {
  //   if (str[i] === str[i + 1]) {
  //     return false;
  //   }
  // }
  // return true;
}

// ---------------------------------------------------------------------------
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// function noDuplicates(str) {
//   for (let i = 0; i < str.length; i++) {
//     for (let j = i + 1; j < str.length; j++) {
//       if (str[i] === str[j]) {
//         return false;
//       }
//     }
//   }

//   return true;
// }

// function noDuplicates(str) {
//   str = str.split("").sort().join("");

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === str[i + 1]) {
//       return false;
//     }
//   }

//   return true;
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

describe('noDuplicates', () => {
  it('returns true correctly.', () => {
    assert.equal(noDuplicates('abc'), true);
  });
  it('returns false correctly.', () => {
    assert.equal(noDuplicates('abccd'), false);
    assert.equal(noDuplicates('bh!!'), false);
  });
});

mocha.run();
