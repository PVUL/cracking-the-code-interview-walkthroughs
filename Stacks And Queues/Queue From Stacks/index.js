/*
Implement a queue using just two stacks.
*/

class QueueFromStacks {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }
  size() {
    return this.stack1.size() + this.stack2.size();
  }
  add(value) {
    this.stack1.push(value);
  }
  remove() {
    while (this.stack1.size() > 0) {
      this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
  }
  peek() {
    while (this.stack1.size() > 0) {
      this.stack2.push(this.stack1.pop());
    }
    return this.stack2.peek();
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

describe("Queue From Stacks", () => {
  it("size works, add method exists", () => {
    const queue = new QueueFromStacks();
    assert.equal(queue.size(), 0);
    queue.add("Dummy info");
  });

  it("remove has FIFO behavior", () => {
    const queue = new QueueFromStacks();

    queue.add(1);
    queue.add(2);
    queue.add(3);

    assert.equal(queue.remove(), 1);
    assert.equal(queue.remove(), 2);
    assert.equal(queue.remove(), 3);
  });

  it("peek works", () => {
    const queue = new QueueFromStacks();

    queue.add(1);
    queue.add(2);
    assert.equal(queue.peek(), 1);
    assert.equal(queue.remove(), 1);
  });
});

mocha.run();
