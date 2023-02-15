const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const str = "3 5\n10101\n01010\n10101";
// const input = str.split("\n");
const [height, width] = input.shift().split(" ").map(Number);
const board = [];
const extended_board = [];
const ur = [];
const ul = [];
const dr = [];
const dl = [];
let maxLen = 0;

function app() {
  for (let i = 0; i < height; i++) board.push(input[i].split("").map(Number));
  for (let i = 0; i <= height + 1; i++)
    extended_board.push(new Array(width + 2).fill(0));
  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) extended_board[i][j] = board[i - 1][j - 1];
  }
  for (let i = 0; i <= height + 1; i++) {
    ur.push(new Array(width + 2).fill(0));
    ul.push(new Array(width + 2).fill(0));
    dr.push(new Array(width + 2).fill(0));
    dl.push(new Array(width + 2).fill(0));
  }
  calculate();
  console.log(maxLen);
}

function calculate() {
  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      if (extended_board[i][j]) {
        ur[i][j] = ur[i - 1][j + 1] + 1;
        ul[i][j] = ul[i - 1][j - 1] + 1;
      }
    }
  }

  for (let i = height; i >= 1; i--) {
    for (let j = 1; j <= width; j++) {
      if (extended_board[i][j]) {
        dr[i][j] = dr[i + 1][j + 1] + 1;
        dl[i][j] = dl[i + 1][j - 1] + 1;
      }
    }
  }

  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      for (let k = 1; k <= Math.min(dl[i][j], dr[i][j]) + 1; k++) {
        if (ul[i + 2 * (k - 1)][j] >= k && ur[i + 2 * (k - 1)][j] >= k) {
          maxLen = Math.max(maxLen, k);
          break;
        }
      }
    }
  }
}

app();
