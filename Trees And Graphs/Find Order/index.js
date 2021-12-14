/* 
You are given an array of projects and an array of dependencies. In the array of 
dependencies, dependency [0, 1] indicates that to build project 1, you have to first 
build project 0.
Return a build order that will allow the projects to be built, as an array. 
If there are many valid answers, return any of them. 
If there is no valid build order, return an empty array.

EXAMPLE
Input
Projects: [0, 1, 2, 3, 4, 5],
Dependencies: [[5, 2],[5, 0],[4, 0],[4, 1],[2, 3], [3, 1]]

Output: [4,5,0,2,3,1], [5,4,2,3,1,0], etc
*/

function findOrder(projects, dependencies) {
  const adjacencyList = buildDirectedGraph(projects, dependencies);
  const visited = {};

  const topologicalSortedOrder = [];
  let cycleDetected = false;

  for (const project of projects) {
    visited[project] = "white";
  }

  // DFS to detect cycle and push nodes to output
  function dfs(vertex) {
    if (cycleDetected) return;

    visited[vertex] = "gray";

    for (const neighborVertex of adjacencyList[vertex]) {
      if (visited[neighborVertex] === "gray") {
        cycleDetected = true;
      } else if (visited[neighborVertex] === "white") {
        dfs(neighborVertex);
      }
    }

    visited[vertex] = "black";
    topologicalSortedOrder.push(vertex);
  }

  // DFS all possible vertices
  for (const project of projects) {
    if (visited[project] === "white") {
      dfs(project);
    }
  }

  if (cycleDetected) {
    return [];
  } else {
    topologicalSortedOrder.reverse();
    return topologicalSortedOrder;
  }
}

function buildDirectedGraph(vertices, edges) {
  const adjacencyList = {};

  for (vertex of vertices) {
    adjacencyList[vertex] = [];
  }

  for (const edge of edges) {
    const v1 = edge[0];
    const v2 = edge[1];

    adjacencyList[v1].push(v2);
  }

  return adjacencyList;
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

describe("Find Order", () => {
  it("returns correct topological sort", () => {
    const res = findOrder(
      ["0", "1", "2", "3", "4", "5"],
      [
        ["5", "2"],
        ["5", "0"],
        ["4", "0"],
        ["4", "1"],
        ["2", "3"],
        ["3", "1"],
      ]
    );

    const possibleResults = [
      "450231",
      "452031",
      "452301",
      "452310",
      "523401",
      "523410",
      "524031",
      "524301",
      "524310",
      "540231",
      "542031",
      "542301",
      "542310",
    ];

    assert.equal(possibleResults.includes(res.join("")), true);
  });

  it("returns empty array if topological sort not possible", () => {
    assert.equal(findOrder([0], [[0, 0]]).length, 0);

    assert.equal(
      findOrder(
        [0, 1, 2],
        [
          [0, 1],
          [2, 1],
          [2, 2],
        ]
      ).length,
      0
    );

    assert.equal(
      findOrder(
        [0, 1, 2, 3],
        [
          [0, 1],
          [0, 2],
          [1, 2],
          [2, 0],
          [2, 3],
          [3, 3],
        ]
      ).length,
      0
    );
  });
});

mocha.run();
