import * as Input from './inputs/input10.js';
import * as U from './utils.js';
import assert from 'assert';

export const str = Input.str;
export const sampleStr = Input.sampleStr;

export const transformInput = (str: string): number[][] => {
    const output = str
        .split('\n')
        .map((row) => row.split('').map((c) => parseInt(c)));
    const n = output[0].length;
    for (const row of output) {
        assert.deepStrictEqual(row.length, n);
    }
    return output;
};

export const zeroes = (grid: number[][]): U.Coord[] => {
    const arr: U.Coord[] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 0) {
                arr.push([y, x]);
            }
        }
    }
    return arr;
};

export const next = (grid: number[][], [y, x]: U.Coord): U.Coord[] => {
    const arr: U.Coord[] = [];
    if (0 <= y - 1) {
        arr.push([y - 1, x]);
    }
    if (y + 1 < grid.length) {
        arr.push([y + 1, x]);
    }
    if (0 <= x - 1) {
        arr.push([y, x - 1]);
    }
    if (x + 1 < grid[0].length) {
        arr.push([y, x + 1]);
    }
    const nextNum = U.at(grid, [y, x]) + 1;
    return arr.filter((c) => U.at(grid, c) === nextNum);
};

export const dfs = (grid: number[][], c: U.Coord): U.Coord[] => {
    if (U.at(grid, c) === 9) {
        return [c];
    }
    let arr = [];
    for (const cNext of next(grid, c)) {
        arr.push(...dfs(grid, cNext));
    }
    return arr;
};

export const distinct = (arr: U.Coord[]): number => {
    const set = new Set<string>();
    for (const elem of arr) {
        set.add(JSON.stringify(elem));
    }
    return set.size;
};

export const solveEasy_ = (grid: number[][]): number => {
    let n = 0;
    for (const z of zeroes(grid)) {
        const set = new Set<string>();
        for (const c of dfs(grid, z)) {
            set.add(JSON.stringify(c));
        }
        n += set.size;
    }
    return n;
};

export const solveEasy = (str: string): number =>
    solveEasy_(transformInput(str));

export const solveHard_ = (grid: number[][]): number => {
    const arr = [];
    for (const z of zeroes(grid)) {
        arr.push(...dfs(grid, z));
    }
    return arr.length;
};

export const solveHard = (str: string): number =>
    solveHard_(transformInput(str));
