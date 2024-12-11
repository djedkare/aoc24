import * as Input from './inputs/input08.js';
import * as U from './utils.js';
import assert from 'assert';

export const inputStr = Input.str;
export const inputSampleStr = Input.sampleStr;

export type Coord = [number, number];

export const add = ([y0, x0]: Coord, [y1, x1]: Coord): Coord => [
    y0 + y1,
    x0 + x1,
];

export const subtract = ([y0, x0]: Coord, [y1, x1]: Coord): Coord => [
    y0 - y1,
    x0 - x1,
];

export const eq = ([y0, x0]: Coord, [y1, x1]: Coord): boolean =>
    y0 === y1 && x0 === x1;

export const makeGrid = (str: string): string[][] => {
    if (str[str.length - 1] === '\n') {
        str = str.slice(0, str.length - 1);
    }
    return str.split('\n').map((line) => line.split(''));
};

export const makeMap = (grid: string[][]): Map<string, Coord[]> => {
    const map = new Map<string, Coord[]>();
    const mapInsert = (s: string, c: Coord) => {
        const val = map.get(s);
        if (val) {
            val.push(c);
        } else {
            map.set(s, [c]);
        }
    };
    for (const [y, arr] of grid.entries()) {
        for (const [x, s] of arr.entries()) {
            if (s !== '.') {
                mapInsert(s, [y, x]);
            }
        }
    }
    return map;
};

export const antinodesPair = (c0: Coord, c1: Coord): [Coord, Coord] => {
    const antinode0 = add(c0, subtract(c0, c1));
    const antinode1 = add(c1, subtract(c1, c0));
    return [antinode0, antinode1];
};

export const antinodesArr = (arr: Coord[]): Coord[] => {
    const output = [];
    // arr should hold no duplicates
    for (const [i0, elem0] of arr.entries()) {
        for (const [i1, elem1] of arr.entries()) {
            if (i0 < i1) {
                const [antinode0, antinode1] = antinodesPair(elem0, elem1);
                output.push(antinode0);
                output.push(antinode1);
            }
        }
    }
    return output;
};

export const antinodesMap = (map: Map<string, Coord[]>): Coord[] => {
    const output = [];
    for (const arr of map.values()) {
        output.push(...antinodesArr(arr));
    }
    return output;
};

export const solveEasy = (str: string): Set<string> => {
    const grid = makeGrid(str);
    const yBound = grid.length;
    const xBound = grid[0].length;
    const inBounds = ([y, x]: Coord) =>
        0 <= y && y < yBound && 0 <= x && x < xBound;
    const map = makeMap(grid);
    const filteredArr = antinodesMap(map).filter(inBounds);
    const set = new Set(filteredArr.map((c) => JSON.stringify(c)));
    return set;
};

export const antinodesPairHard = (
    c0: Coord,
    c1: Coord,
    yBound: number,
    xBound: number
): Coord[] => {
    const output: Coord[] = [];
    const inBounds = ([y, x]: Coord) =>
        0 <= y && y < yBound && 0 <= x && x < xBound;
    const diff = subtract(c0, c1);
    for (
        let antinode = c0;
        inBounds(antinode);
        antinode = add(antinode, diff)
    ) {
        output.push(antinode);
    }
    // c0 appears twice in the output.
    // shouldn't matter because the output
    // is stored in a set later on.
    for (
        let antinode = c0;
        inBounds(antinode);
        antinode = subtract(antinode, diff)
    ) {
        output.push(antinode);
    }
    return output;
};

export const antinodesArrHard = (
    arr: Coord[],
    yBound: number,
    xBound: number
): Coord[] => {
    const output = [];
    // arr should hold no duplicates
    for (const [i0, elem0] of arr.entries()) {
        for (const [i1, elem1] of arr.entries()) {
            if (i0 < i1) {
                const antinodes = antinodesPairHard(
                    elem0,
                    elem1,
                    yBound,
                    xBound
                );
                output.push(...antinodes);
            }
        }
    }
    return output;
};

export const antinodesMapHard = (
    map: Map<string, Coord[]>,
    yBound: number,
    xBound: number
): Coord[] => {
    const output = [];
    for (const arr of map.values()) {
        output.push(...antinodesArrHard(arr, yBound, xBound));
    }
    return output;
};

export const solveHard = (str: string): Set<string> => {
    const grid = makeGrid(str);
    const yBound = grid.length;
    const xBound = grid[0].length;
    const inBounds = ([y, x]: Coord) =>
        0 <= y && y < yBound && 0 <= x && x < xBound;
    const map = makeMap(grid);
    const arr = antinodesMapHard(map, yBound, xBound);
    assert.deepStrictEqual(arr, arr.filter(inBounds));
    const set = new Set(arr.map((c) => JSON.stringify(c)));
    return set;
};
