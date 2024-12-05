import { str } from './inputs/input01.js';

export const arr = str
    .split('\n')
    .map((row) => row.split('   ').map((s) => parseInt(s)));

export const nums0: number[] = arr.map((row) => row[0]).sort();

export const nums1: number[] = arr.map((row) => row[1]).sort();

export const solution0 = Array.from({ length: nums0.length }, (_, i) => i)
    .map((i) => Math.abs(nums0[i] - nums1[i]))
    .reduce((acc, cur) => acc + cur, 0);

let count = (id: number) =>
    nums1.reduce((acc, cur) => (cur == id ? acc + 1 : acc), 0);

export const solution1 = nums0
    .map((id) => id * count(id))
    .reduce((acc, cur) => acc + cur, 0);
