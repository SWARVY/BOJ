const fs = require("fs");
const str = "8\n3 7 1 6 3 5 1 7";
const input = str.split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const building = input[1].split(" ");
const result = new Array(building.length);
const stack = [];
let cnt = 0;

for (let i = 0; i < result.length; i++) result[i] = { count: 0, near: 0 };

building.forEach((height, idx) => {
  
});

console.log(result);
