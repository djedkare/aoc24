import * as Input from './inputs/input15.js';
import * as U from './utils.js';
import assert from 'assert';

export type Direction = '<' | 'v' | '>' | '^';
export type State = { grid: string[][]; pos: U.Coord; moves: Direction[] };

export const parseGrid = (str: string): string[][] =>
    str
        .split('\n')
        .slice(1, -1)
        .map((line) => line.slice(1, -1).split(''));

export const parseInput = (str: string): State => {
    const [gridStr, moveStr] = str.split('\n\n');
    const grid = parseGrid(gridStr);
    let pos: U.Coord = [-1, -1];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === '@') {
                pos = [y, x];
                grid[y][x] = '.';
            }
        }
    }
    const moves = moveStr.split('').filter((c) => c !== '\n') as Direction[];
    assert.ok(
        moves.every((m) => m === '<' || m === 'v' || m === '>' || m === '^')
    );
    assert.ok(pos[0] > -1 && pos[1] > -1);

    return { grid: grid, pos: pos, moves: moves };
};

export const smallSampleInput = parseInput(Input.smallSampleStr);
export const sampleInput = parseInput(Input.sampleStr);
export const input = parseInput(Input.str);

export const showGrid = (state: State): string => {
    const grid = structuredClone(state.grid);
    grid[state.pos[0]][state.pos[1]] = '@';
    return grid.map((row) => row.join('')).join('\n');
};

export const showMoves = (state: State): string => state.moves.join('');

export const score = (state: State): number => scoreInternal(state.grid);

export const scoreInternal = (grid: string[][]): number => {
    let n = 0;
    grid.forEach((row: string[], y: number) =>
        row.forEach((c: string, x: number) => {
            if (c === 'O') {
                n += 100 * (y + 1) + (x + 1);
            }
        })
    );
    return n;
};

export const done = (state: State): boolean => state.moves.length === 0;

export const step = (state: State): void => {
    const outOfBounds = ([y, x]: U.Coord): boolean =>
        !(
            0 <= y &&
            y < state.grid.length &&
            0 <= x &&
            x < state.grid[0].length
        );
    assert.ok(state.moves.length > 0);
    let direction: U.Coord;
    switch (state.moves[0]) {
        case '<':
            direction = [0, -1];
            break;
        case '>':
            direction = [0, 1];
            break;
        case '^':
            direction = [-1, 0];
            break;
        case 'v':
            direction = [1, 0];
            break;
    }
    state.moves.shift();
    let next = U.add(state.pos, direction);
    if (outOfBounds(next)) {
        return;
    }
    if (U.at(state.grid, next) === '#') {
        return;
    } else if (U.at(state.grid, next) === '.') {
        state.pos = next;
        return;
    }
    let noBox = next;
    while (U.at(state.grid, noBox) === 'O') {
        noBox = U.add(noBox, direction);
        if (outOfBounds(noBox)) {
            return;
        }
    }
    if (U.at(state.grid, noBox) === '.') {
        state.grid[noBox[0]][noBox[1]] = 'O';
        state.grid[next[0]][next[1]] = '.';
        state.pos = next;
    }
};

export const solveEasy = (state: State): number => {
    const st = structuredClone(state);
    while (!done(st)) {
        step(st);
    }
    return score(st);
};

export const solveVisually = (state: State): number => {
    const st = structuredClone(state);
    console.log(`Moves: \n${showMoves(st)}`);
    console.log();
    console.log('Initial state:');
    while (!done(st)) {
        console.log(showGrid(st));
        console.log();
        console.log(`Move ${st.moves[0]}:`);
        step(st);
    }
    console.log(showGrid(st));
    console.log();
    return score(st);
};
