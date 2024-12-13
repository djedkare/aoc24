import * as Input from './inputs/input12.js';
import * as U from './utils.js';
import assert from 'assert';

export const transformInput = (str: string): string[][] => {
    assert.ok(str[str.length - 1] !== '\n');
    return str.split('\n').map((line) => line.split(''));
};

export const sampleInput = transformInput(Input.sampleStr);
export const input = transformInput(Input.str);

export const encode = (c: U.Coord): string => JSON.stringify(c);

export const getRegion = (grid: string[][], c: U.Coord): Set<string> => {
    assert.ok(
        c[0] >= 0 && c[0] < grid.length && c[1] >= 0 && c[1] < grid[0].length
    );
    const type = U.at(grid, c);
    const set = new Set<string>([]);
    const dfs = ([y, x]: U.Coord): void => {
        assert.ok(y >= 0 && y < grid.length && x >= 0 && x < grid[0].length);
        if (U.at(grid, [y, x]) !== type) {
            return;
        }
        const encoding = encode([y, x]);
        if (set.has(encoding)) {
            return;
        }
        set.add(encoding);
        if (y - 1 >= 0 && U.at(grid, [y - 1, x]) === type) {
            dfs([y - 1, x]);
        }
        if (y + 1 < grid.length && U.at(grid, [y + 1, x]) === type) {
            dfs([y + 1, x]);
        }
        if (x - 1 >= 0 && U.at(grid, [y, x - 1]) === type) {
            dfs([y, x - 1]);
        }
        if (x + 1 < grid[0].length && U.at(grid, [y, x + 1]) === type) {
            dfs([y, x + 1]);
        }
    };
    dfs(c);
    return set;
};

export const perimeter = (region: Set<string>): number => {
    let n = 0;
    const directions: U.Coord[] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    for (const s of region) {
        const c: U.Coord = JSON.parse(s);
        for (const neighbour of directions.map((d) => U.add(c, d))) {
            if (!region.has(JSON.stringify(neighbour))) {
                n += 1;
            }
        }
    }
    return n;
};

export const solveEasy = (grid: string[][]): number => {
    let done: Set<string> = new Set();
    let n = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const c: U.Coord = [y, x];
            const encoded = encode(c);
            if (done.has(encoded)) {
                continue;
            }
            const region = getRegion(grid, c);
            n += region.size * perimeter(region);
            done = U.union(done, region);
        }
    }
    return n;
};

export type Fence = [U.Coord, U.Coord]; // [elem, direction]

export const fences = (region: Set<string>): Set<string> => {
    const output = new Set<string>();
    const directions: U.Coord[] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    for (const s of region) {
        const c: U.Coord = JSON.parse(s);
        for (const d of directions) {
            const neighbour = U.add(c, d);
            if (!region.has(JSON.stringify(neighbour))) {
                const fence = [c, d];
                output.add(JSON.stringify(fence));
            }
        }
    }
    return output;
};

export const sides = (fences: Set<string>): number => {
    let n = 0;
    const counted: Set<string> = new Set();
    for (const s of fences) {
        if (counted.has(s)) {
            continue;
        }
        n += 1;
        const [c, d]: Fence = JSON.parse(s);
        if (d[0] !== 0) {
            // left-right fence: -
            const minus: U.Coord = [0, -1];
            const plus: U.Coord = [0, 1];
            for (
                let coord: U.Coord = structuredClone(c);
                fences.has(JSON.stringify([coord, d]));
                coord = U.add(coord, minus)
            ) {
                counted.add(JSON.stringify([coord, d]));
            }
            for (
                let coord: U.Coord = structuredClone(c);
                fences.has(JSON.stringify([coord, d]));
                coord = U.add(coord, plus)
            ) {
                counted.add(JSON.stringify([coord, d]));
            }
        } else {
            // up-down fence: |
            const minus: U.Coord = [-1, 0];
            const plus: U.Coord = [1, 0];
            for (
                let coord: U.Coord = structuredClone(c);
                fences.has(JSON.stringify([coord, d]));
                coord = U.add(coord, minus)
            ) {
                counted.add(JSON.stringify([coord, d]));
            }
            for (
                let coord: U.Coord = structuredClone(c);
                fences.has(JSON.stringify([coord, d]));
                coord = U.add(coord, plus)
            ) {
                counted.add(JSON.stringify([coord, d]));
            }
        }
        // counted.add(s);
    }
    return n;
};

export const solveHard = (grid: string[][]): number => {
    let done: Set<string> = new Set();
    let n = 0;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const c: U.Coord = [y, x];
            const encoded = encode(c);
            if (done.has(encoded)) {
                continue;
            }
            const region = getRegion(grid, c);
            n += region.size * sides(fences(region)); // only differing line
            done = U.union(done, region);
        }
    }
    return n;
};
