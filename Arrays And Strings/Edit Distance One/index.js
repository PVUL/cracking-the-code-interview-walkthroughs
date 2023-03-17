/*
Given two string s1 and s2, see if s1 can be converted to s2 thru zero edits or just ONE of the edits below.

Insert a character
Remove a character
Replace a character

EXAMPLE
dog, dog --> true
dogs, dog --> true
dog, dogs --> true
dog, log --> true
dog, cat --> false
*/

function editDistanceOne(first, second) {
  // first attempt. using string lengths.
  // // base case
  // if (first === second) return true;
  // const lengthDiff = Math.abs(first.length - second.length);
  // if (lengthDiff === 1) return true;
  // if (lengthDiff > 1) return false;
  // // the replace scenario
  // const charSet = {}; // {a: 1, b: 2}
  // for (let char of first) {
  //   charSet[char] = charSet[char] + 1 || 1;
  // }
  // let allowances = 1;
  // for (let char of second) {
  //   if (charSet[char] > 0) {
  //     charSet[char] -= 1;
  //   } else if (allowances > 0) {
  //     allowances -= 1;
  //     continue;
  //   } else {
  //     return false;
  //   }
  // }
  // return true;

  /** 2nd attempt. Since first attemp was not specific enough.
   * time complexity: O(n)
   * space complexity: O(1)
   */
  // base case
  const lengthDiff = Math.abs(first.length - second.length);
  if (lengthDiff > 1) return false;
  // for length diff of 1, insert or remove a character
  if (lengthDiff === 1) {
    let i = 0; // index of first
    let j = 0; // index of second

    while (i < first.length && j < second.length) {
      if (first[i] !== second[j]) {
        if (i !== j) return false;
        j++;
      } else {
        i++;
        j++;
      }
    }
    return true;
  }
  // for length diff of 0, replace a character
  if (lengthDiff === 0) {
    let allowances = 1;
    for (let i = 0; i < first.length; i++) {
      if (first[i] !== second[i]) {
        if (allowances === 0) {
          return false;
        }
        allowances -= 1;
      }
    }
  }
  return true;
}

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

function editReplaceOne(s1, s2) {}

// Check if you can insert a character into sl to make s2.
function editInsertOne(s1, s2) {}

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

describe('Edit Distance One', () => {
  it("returns true if no edits needed, editDistanceOne('dog', 'dog') --> true", () => {
    assert.equal(editDistanceOne('dog', 'dog'), true);
  });
  it("returns true for removal of character, editDistanceOne('dogs', 'dog') --> true", () => {
    assert.equal(editDistanceOne('dogs', 'dog'), true);
  });
  it("returns true for insertion of character, editDistanceOne('dog', 'dogs') --> true", () => {
    assert.equal(editDistanceOne('dog', 'dogs'), true);
  });
  it("returns true for replacement of character, editDistanceOne('dog', 'log') --> true", () => {
    assert.equal(editDistanceOne('dog', 'log'), true);
  });
  it("returns false correctly, editDistanceOne('dog', 'cat') --> false", () => {
    assert.equal(editDistanceOne('dog', 'cat'), false);
  });
  it("returns false correctly, editDistanceOne('dog', 'dogss') --> false", () => {
    assert.equal(editDistanceOne('dog', 'dogss'), false);
  });
  it("returns false correctly, editDistanceOne('dogss', 'dog') --> false", () => {
    assert.equal(editDistanceOne('dogss', 'dog'), false);
  });
});

mocha.run();
