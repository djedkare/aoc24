import { str } from './inputs/input02.js';
import * as U from './utils.js';

export const arr: number[][] = str
    .split('\n')
    .map((row) => row.split(' ').map((n) => parseInt(n)));

export let deltaArr = (arr: number[]) => U.zipWith((a, b) => a-b, arr, arr.slice(1));

export let monotonous = (arr: number[]): boolean => {
    let deltas = deltaArr(arr);
    return deltas.every((n) => n>0) || deltas.every((n) => n<0)
};

export let noLargeJumps = (arr: number[]): boolean => deltaArr(arr).every((n) => Math.abs(n)<4);

export let safe = (arr: number[]): boolean => monotonous(arr) && noLargeJumps(arr)

export const solution0: number = arr.filter((row) => safe(row)).length;

export const fixable = (arr: number[]): boolean => {
    const candidates: number[][] = U.range(arr.length)
        .map((i) => [...arr.slice(0, i), ...arr.slice(i+1)]);
    return candidates.some((candidate) => safe(candidate));
}

export const solution1: number = arr.filter((row) => fixable(row)).length