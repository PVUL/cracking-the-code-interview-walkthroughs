/* 
Design a stack that supports push, pop, and min (retrieves the minimum element in the 
stack). Push, pop and min should all operate in constant time.
*/

class MinStack {
  constructor() {
    this.stack = new Stack();
    this.minStack = new Stack();
  }
  push(value) {
    if (value <= this.min()) {
      this.minStack.push(value);
    }
    this.stack.push(value);
  }
  pop() {
    const value = this.stack.pop();
    if (value === this.min()) {
      this.minStack.pop();
    }
    return value;
  }
  min() {
    if (this.minStack.isEmpty()) {
      return Infinity;
    }
    return this.minStack.peek();
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

describe("Min Stack", () => {
  const swm = new MinStack();

  it("push and pop work", () => {
    swm.push(10);
    swm.push(100);

    assert.equal(swm.pop(), 100);
    assert.equal(swm.pop(), 10);
  });

  it("min works", () => {
    swm.push(5);
    assert.equal(swm.min(), 5);
    assert.equal(swm.pop(), 5);

    swm.push(5);
    swm.push(1);
    assert.equal(swm.min(), 1);
    swm.pop();
    assert.equal(swm.min(), 5);
  });
});

mocha.run();
