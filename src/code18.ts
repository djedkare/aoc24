import { parseNumber } from './code03';
import * as Input from './inputs/input18.js';
import * as U from './utils.js';
import assert from 'assert';

export type Puzzle = { size: U.Coord; bytes: U.Coord[] };

export const parseInput = (str: string, size: U.Coord): Puzzle => {
    const parseByte = (s: string): U.Coord => {
        const [y, x] = s.split(',').map((n) => parseInt(n));
        return [y, x];
    };
    const bytes = str.split('\n').map(parseByte);
    return { size: size, bytes: bytes };
};

export const sampleInput = parseInput(Input.sampleStr, [7, 7]);
export const sampleInputEasy = {
    ...sampleInput,
    bytes: sampleInput.bytes.slice(0, 12),
};
export const input = parseInput(Input.str, [71, 71]);
export const inputEasy = { ...input, bytes: input.bytes.slice(0, 1024) };

// true means uncorrupted
export const fillGrid = (puzzle: Puzzle): boolean[][] => {
    const arr = Array(puzzle.size[0]);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Array(puzzle.size[1]).fill(true);
    }
    for (const [y, x] of puzzle.bytes) {
        arr[y][x] = false;
    }
    return arr;
};

export const printGrid = (grid: boolean[][]): void => {
    const f = (b: boolean) => (b ? '.' : '#');
    const strs: string[] = grid.map((row) => row.map(f).join(''));
    for (const str of strs) {
        console.log(str);
    }
};

export const calculateDistances = (input: boolean[][]): number[][] => {
    const grid = U.initializeGrid([input.length, input[0].length], Infinity);
    dijkstra_(input, grid, [0, 0], 0);
    return grid;
};

export const dijkstra_ = (
    accessible: boolean[][],
    distances: number[][],
    [y, x]: U.Coord,
    dist: number
) => {
    console.log(`Considering ${U.print([y, x])}...`);
    if (0 > y || y >= accessible.length || 0 > x || x >= accessible[0].length) {
        console.log(`Out of bounds!`);
        return;
    } else if (!U.at(accessible, [y, x])) {
        console.log(`Inaccessible!`);
        return;
    } else if (U.at(distances, [y, x]) <= dist) {
        console.log(`Already visited!`);
        return;
    }
    console.log(`Old distance is ${distances[y][x]}, new ${dist}`);
    distances[y][x] = dist;
    for (const neighbour of U.neighbours([y, x])) {
        dijkstra_(accessible, distances, neighbour, dist + 1);
    }
};

export const printAsdf = (
    accessible: boolean[][],
    distances: number[][]
): void => {
    // const f = (b: boolean, x: number) => (b ? () : '#');
    // const strs: string[] = accessible.map((row) => row.map(f).join(''));
    // for (const str of strs) {
    //     console.log(str);
    // }
    for (let y = 0; y < accessible.length; y++) {
        const f = (b: boolean, x: number) =>
            b ? (x < Infinity ? 'O' : '.') : '#';
    }
};

export const solveEasy = (puzzle: Puzzle): number =>
    calculateDistances(fillGrid(puzzle))[puzzle.size[0] - 1][
        puzzle.size[1] - 1
    ];

export const dijkstraPath = (
    accessible: boolean[][],
    distances: number[][],
    [y, x]: U.Coord,
    dist: number,
    dest: U.Coord
): U.Coord[] | false => {
    if (0 > y || y >= accessible.length || 0 > x || x >= accessible[0].length) {
        return false;
    } else if (!U.at(accessible, [y, x])) {
        return false;
    } else if (U.at(distances, [y, x]) <= dist) {
        return false;
    } else if (U.equal(dest, [y, x])) {
        return [[y, x]];
    }
    distances[y][x] = dist;
    for (const neighbour of U.neighbours([y, x])) {
        const tmp: U.Coord[] | false = dijkstraPath(
            accessible,
            distances,
            neighbour,
            dist + 1,
            dest
        );
        if (tmp) {
            return [[y, x], ...tmp];
        }
    }
    return false;
};

export const findPath = (input: boolean[][]): U.Coord[] => {
    const grid = U.initializeGrid([input.length, input[0].length], Infinity);
    const path: U.Coord[] = dijkstraPath(input, grid, [0, 0], 0, [
        input.length - 1,
        input[0].length - 1,
    ]) as U.Coord[];
    return path;
};

export const solveHard = (puzzle: Puzzle, n: number): U.Coord => {
    const puzzle_: Puzzle = { ...puzzle, bytes: puzzle.bytes.slice(0, n) };
    const remainingBytes = puzzle.bytes.slice(n, puzzle.bytes.length);
    const path: U.Coord[] = findPath(fillGrid(puzzle_));
    for (const byte of remainingBytes) {
        if (path.some((coord) => U.equal(coord, byte))) {
            return byte;
        }
    }
    return [-1, -1];
};
