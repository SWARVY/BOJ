class Node {
  constructor(data) {
    this.prev = null;
    this.data = data;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }

  put_front(data) {
    const node = new Node(data);
    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      const next = this.front;
      this.front = node;
      this.front.next = next;
      next.prev = this.front;
    }
    this.count += 1;
  }

  get_front() {
    if (!this.count) return false;
    const temp = this.front.data;
    if (this.count === 1) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
      this.front.prev = null;
    }
    this.count -= 1;
    return temp;
  }

  put_rear(data) {
    const node = new Node(data);
    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      node.prev = this.rear;
      this.rear.next = node;
    }
    this.rear = node;
    this.count += 1;
  }

  get_rear() {
    if (!this.count) return false;
    const temp = this.rear.data;
    if (this.count === 1) {
      this.front = null;
      this.rear = null;
    } else {
      const temp = this.rear.data;
      this.rear = this.rear.prev;
      this.rear.next = null;
    }
    this.count -= 1;
    return temp;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const deque = new Deque();
// const str = "aba\nababacccababa";
// const input = str.split("\n");
const find_string = input.shift();
const find_string_rev = [...find_string].reverse().join("");
let target_string = input[0];

function app() {
  while (1) {
    if (target_string.indexOf(find_string) !== -1)
      target_string = left_del(target_string);
    else break;
    if (target_string.indexOf(find_string) !== -1)
      target_string = right_del(target_string);
    else break;
  }
  console.log(target_string);
}

function left_del(target) {
  const result = [];
  let check = false;
  let cnt = 0;

  for (let i = 0; i < target.length; i++) {
    deque.put_rear(target[i]);
    if (!check) {
      if (find_string[cnt] === target[i]) cnt += 1;
      else {
        cnt = 0;
        if (find_string[0] === target[i]) cnt += 1;
      }
      if (cnt === find_string.length) {
        check = true;
        for (let i = 0; i < find_string.length; i++) deque.get_rear();
      }
    }
  }
  while (deque.count) result.push(deque.get_front());
  return result.join("");
}

function right_del(target) {
  const result = [];
  let check = false;
  let cnt = 0;

  for (let i = target.length - 1; i >= 0; i--) {
    deque.put_front(target[i]);
    if (!check) {
      if (find_string_rev[cnt] === target[i]) cnt += 1;
      else {
        cnt = 0;
        if (find_string_rev[0] === target[i]) cnt += 1;
      }
      if (cnt === find_string_rev.length) {
        check = true;
        for (let i = 0; i < find_string_rev.length; i++) deque.get_front();
      }
    }
  }
  while (deque.count) result.push(deque.get_front());
  return result.join("");
}

app();
