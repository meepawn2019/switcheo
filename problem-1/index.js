// There way to sum the numbers from 1 to n

// 1. recursion
const sum_to_n_a = function sum2(n) {
  if (n === 1) {
    return 1;
  }

  return n + sum_to_n_a(n - 1);
}

// 2. arithmetic progression
const sum_to_n_b = function sum3(n) {
  return (1 + n) * n / 2;
}

// 3. reduce
const sum_to_n_c = function sum5(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b);
}

// Test

const test = function test(fn) {
  console.log(fn(1) === 1);
  console.log(fn(2) === 3);
  console.log(fn(3) === 6);
  console.log(fn(4) === 10);
  console.log(fn(5) === 15);
}

test(sum_to_n_a);
test(sum_to_n_b);
test(sum_to_n_c);