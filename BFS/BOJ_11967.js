const fs = require("fs");
const str = "3 6\n1 1 1 2\n2 1 2 2\n1 1 1 3\n2 3 3 1\n1 3 1 2\n1 3 2 1";
const input = str.split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const size = input.shift();
const data = [];

function BFS(graph, startNode) {
  const visited = [];
  let needVisit = [];

  needVisit.push(startNode);

  while (needVisit.length) {
    const node = needVisit.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      needVisit = [...needVisit, ...graph[node]];
    }
  }
  return visited;
}

function app() {
  for (let i = 0; i < input.length; i++)
    data.push(input[i].split(" ").map(Number));
  console.log(BFS(data, 1));
}

app();
