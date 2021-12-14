/* 
Given a Directed Graph and two vertices in it, write a function to determine if 
there is a path from the first vertex to the second vertex.

Example
const g = new DirectedGraph();
g.addVertex(1);
g.addVertex(2);
isReachable(g, 1, 2) --> false
g.addEdge(1, 2);
isReachable(g, 1, 2) --> true

class DirectedGraph {
  constructor() {
    this.adjacencyList = {};
  }
}
*/

function isReachable(directedGraph, v1, v2) {
  const q = new Queue();
  const visited = {};

  visited[v1] = true;
  q.add(v1);

  while (q.size() > 0) {
    const dequeued = q.remove();
    if (dequeued === v2) return true;

    for (const neighbor of directedGraph.adjacencyList[dequeued]) {
      if (neighbor in visited === false) {
        visited[neighbor] = true;
        q.add(neighbor);
      }
    }
  }

  // If BFS is completed without having visited v2
  return false;
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

describe("Is Reachable", () => {
  it("returns true correctly", () => {
    const g = new DirectedGraph();
    g.addVertex(1);
    g.addVertex(2);
    g.addEdge(1, 2);

    assert.equal(isReachable(g, 1, 2), true);
  });

  it("returns true if input nodes are the same node", () => {
    const g = new DirectedGraph();
    g.addVertex(1);

    assert.equal(isReachable(g, 1, 1), true);
  });

  it("returns false correctly", () => {
    const g = new DirectedGraph();
    g.addVertex(1);
    g.addVertex(2);

    assert.equal(isReachable(g, 1, 2), false);
  });
});

mocha.run();
