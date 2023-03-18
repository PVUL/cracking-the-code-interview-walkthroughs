/*
Given an m x n matrix of integers, if an element is 0, set its entire row and
column to 0.
Example
[1, 1, 1],
[1, 0, 1],
[1, 1, 1]
should be changed to
[1, 0, 1],
[0, 0, 0],
[1, 0, 1]
*/

function setMatrixZeros(matrix) {
  /**
   * Solution 1.
   * Time complexity: O(2n*m) exponential
   * Space complexity: O(n) at worst
   */
  // find the 0 first
  // const zeroes = []; // [[x, y], [x, y]]
  // for (let m = 0; m < matrix.length; m++) {
  //   for (let n = 0; n < matrix[m].length; n++) {
  //     // if found a zero, mark the coordinate
  //     if (matrix[m][n] === 0) {
  //       zeroes.push([m, n]);
  //     }
  //   }
  // }
  // // now go back and add zeroes
  // for (let zero of zeroes) {
  //   for (let m = 0; m < matrix.length; m++) {
  //     if (m === zero[0]) {
  //       matrix[m].fill(0, 0, matrix.length + 1);
  //     } else {
  //       for (let n = 0; n < matrix[m].length; n++) {
  //         if (n === zero[1]) {
  //           matrix[m][n] = 0;
  //         }
  //       }
  //     }
  //   }
  // }

  // Solution 2. with O(1) space.
  // Time Complexity: O(n*m) subquadratic time, because nested for loop.
  // Space Complexity: O(1) since we are using the first row/col of matrix to
  //                   indicate where a Zero is to be set, instead of creating
  //                   an array object, which would be O(n).
  //
  // we'll use the first row and column as markers
  // so let's determine there are zeroes present
  let firstRowHasZero = false;
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }
  let firstColHasZero = false;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        // mark the coordintates in the first row/col
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }
  const nullifyRow = (row) => {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[row][j] = 0;
    }
  };
  const nullifyCol = (col) => {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][col] = 0;
    }
  };
  // zero out rows
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      nullifyRow(i);
    }
  }
  // zero out columns
  for (let j = 1; j < matrix[0].length; j++) {
    if (matrix[0][j] === 0) {
      nullifyCol(j);
    }
  }
  if (firstColHasZero) nullifyCol(0);
  if (firstRowHasZero) nullifyRow(0);
  console.log(matrix);
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

describe('Set Matrix Zeroes', () => {
  it('modifies input matrix.', () => {
    const inputMatrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ];
    setMatrixZeros(inputMatrix);
    assert.equal(inputMatrix[0][2], 0);
  });

  it('Works on a 3x4 and 3x3 matrix', () => {
    let inputMatrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ];
    setMatrixZeros(inputMatrix);
    for (let i = 0; i < inputMatrix.length; i++) {
      inputMatrix[i] = inputMatrix[i].join('');
    }
    assert.equal(inputMatrix[0], '0000');
    assert.equal(inputMatrix[1], '0450');
    assert.equal(inputMatrix[2], '0310');

    inputMatrix = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    setMatrixZeros(inputMatrix);
    for (let i = 0; i < inputMatrix.length; i++) {
      inputMatrix[i] = inputMatrix[i].join('');
    }
    assert.equal(inputMatrix[0], '101');
    assert.equal(inputMatrix[1], '000');
    assert.equal(inputMatrix[2], '101');
  });

  it('Works on a 1 row matrix', () => {
    let inputMatrix = [[1, 0]];
    setMatrixZeros(inputMatrix);
    assert.equal(inputMatrix[0][0], 0);
    assert.equal(inputMatrix[0][1], 0);
  });

  it('Works on a 1 col matrix', () => {
    inputMatrix = [[0], [1]];
    setMatrixZeros(inputMatrix);
    assert.equal(inputMatrix[0][0], 0);
    assert.equal(inputMatrix[1][0], 0);
  });
});

mocha.run();
