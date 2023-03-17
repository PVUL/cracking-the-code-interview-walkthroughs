/*
Given a string, return a new string with all spaces replaced with '%20'.

Example
"Boaty McBoatface" --> "Boaty%20McBoatface"
*/

function replaceSpaces(str) {
  // Solution 1: replace and regex
  // time complexity: O(n)
  // space complexity: O(n)
  // return str.replace(/\s/g, '%20');

  // Solution 2: for loop
  // time complexity: O(n)
  // space complexity: O(n)
  // let newStr = '';
  // for (let char of str) {
  //   newStr += char === ' ' ? '%20' : char;
  // }
  // return newStr;

  // Solution 3: split and join
  return str.split(' ').join('%20');
}

// function replaceSpaces(ÒlÒÒl) {
//   return ÒlÒÒl.replace(/\s/g, "%20");
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

describe('Replace Spaces', () => {
  it("replaceSpaces('I love you') returns 'I%20love%20you'", () => {
    assert.equal(replaceSpaces('I love you'), 'I%20love%20you');
  });
});

mocha.run();
