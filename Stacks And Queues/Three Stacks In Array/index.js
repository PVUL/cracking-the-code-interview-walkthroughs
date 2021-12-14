/* 
Implement three stacks using just one array.
*/

class ThreeStacks {
  constructor(stackCapacity) {
    this.stackCapacity = stackCapacity;
    this.values = [];
    this.sizes = [0, 0, 0];
  }
  push(stackNum, value) {
    if (this.isFull(stackNum) || stackNum > 2) {
      return undefined;
    }

    this.sizes[stackNum]++;
    this.values[this.indexOfTop(stackNum)] = value;
  }
  pop(stackNum) {
    if (this.isEmpty(stackNum) || stackNum > 2) {
      return undefined;
    }

    const topIndex = this.indexOfTop(stackNum);
    const value = this.values[topIndex];
    this.values[topIndex] = undefined; //clear
    this.sizes[stackNum]--; //shrink

    return value;
  }
  peek(stackNum) {
    if (this.isEmpty(stackNum) || stackNum > 2) {
      return undefined;
    }

    return this.values[this.indexOfTop(stackNum)];
  }
  indexOfTop(stackNum) {
    const offset = stackNum * this.stackCapacity;
    const size = this.sizes[stackNum];
    return offset + size - 1;
  }
  isEmpty(stackNum) {
    return this.sizes[stackNum] === 0;
  }
  isFull(stackNum) {
    return this.sizes[stackNum] === this.stackCapacity;
  }
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

describe("push(stackNum, value)", () => {
  const threeStacksFromArray = new ThreeStacks(1);

  it("pushes to correct stack within array", () => {
    threeStacksFromArray.push(1, "Kevin");
    assert.equal(threeStacksFromArray.values[1], "Kevin");
  });
  it("returns undefined if specified stack is full or is invalid", () => {
    assert.equal(threeStacksFromArray.push(1, "Kevin"), undefined);
    assert.equal(threeStacksFromArray.push(100000, "Kevin"), undefined);
  });
});

describe("pop(stackNum)", () => {
  const threeStacksFromArray = new ThreeStacks(3);
  threeStacksFromArray.push(1, "a");
  threeStacksFromArray.push(1, "b");
  threeStacksFromArray.push(1, "c");

  it("returns correct value, shrinks stack.", () => {
    assert.equal(threeStacksFromArray.pop(1), "c");
    assert.equal(threeStacksFromArray.pop(1), "b");
    assert.equal(threeStacksFromArray.pop(1), "a");
  });
  it("returns undefined if specified stack is empty or is invalid", () => {
    assert.equal(threeStacksFromArray.pop(1), undefined);
    assert.equal(threeStacksFromArray.pop(100000), undefined);
  });
});

describe("peek(stackNum)", () => {
  const threeStacksFromArray = new ThreeStacks(3);
  threeStacksFromArray.push(1, "a");
  threeStacksFromArray.push(1, "b");
  threeStacksFromArray.push(1, "c");

  it("returns top value for the right stack.", () => {
    assert.equal(threeStacksFromArray.peek(1), "c");
    threeStacksFromArray.pop(1);
    assert.equal(threeStacksFromArray.peek(1), "b");
    threeStacksFromArray.pop(1);
    assert.equal(threeStacksFromArray.peek(1), "a");
  });
  it("returns undefined if specified stack is empty or is invalid", () => {
    threeStacksFromArray.pop(1);
    assert.equal(threeStacksFromArray.peek(1), undefined);
    assert.equal(threeStacksFromArray.peek(100000), undefined);
  });
});

mocha.run();
