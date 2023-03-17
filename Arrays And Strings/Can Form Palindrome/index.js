/*
Given a string, check if characters of the string can be rearranged into a
palindrome. A palindrome is a word or phrase that reads the same backwards and forwards.

EXAMPLE
Ace Carr --> true (Can be arranged to Race Car, which is a palindrome)
*/

function canFormPalindrome(phrase) {
  /**
   * Solution 1: using a hash table
   * Time Complexity: O(n)
   * Space Complexity: O(1) all characters
   */
  // const charSet = {}; // {a: 1, c: 1}
  // for (let char of phrase.toLowerCase()) {
  //   if (char === ' ') continue;
  //   if (char in charSet) {
  //     delete charSet[char];
  //   } else {
  //     charSet[char] = 1;
  //   }
  // }
  // return Object.keys(charSet).length < 2;

  // Solution 2: Slight variation on solution 1
  // Time Complexity: O(n)
  // Space Complexity: O(1) all characters
  const charSet = {}; // {a: 1, c: 2}
  let leftoverChars = 0;
  for (let char of phrase.toLowerCase()) {
    if (char !== ' ') {
      charSet[char] = charSet[char] + 1 || 1;
      leftoverChars =
        charSet[char] % 2 === 0 ? leftoverChars - 1 : leftoverChars + 1;
    }
  }
  return leftoverChars <= 1;
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

describe('Can Form Palindrome', () => {
  it("canFormPalindrome('Ace Carr') returns true", () => {
    assert.equal(canFormPalindrome('Ace Carr'), true);
  });
  it("canFormPalindrome('Ace Car') returns false", () => {
    assert.equal(canFormPalindrome('Ace Car'), false);
  });

  it("canFormPalindrome('A man a plan a canal Panama') returns true", () => {
    assert.equal(canFormPalindrome('A man a plan a canal Panama'), true);
  });
});

mocha.run();
