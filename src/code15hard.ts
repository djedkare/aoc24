import { dir } from 'console';
import * as Input from './inputs/input15.js';
import * as U from './utils.js';
import * as JSONSet from './utils/JsonSet.js';
import assert from 'assert';

export type Direction = '<' | 'v' | '>' | '^';
export type State = { grid: string[][]; pos: U.Coord; moves: Direction[] };

export const directionToCoord = (d: Direction): U.Coord => {
    switch (d) {
        case '<':
            return [0, -1];
        case '>':
            return [0, 1];
        case '^':
            return [-1, 0];
        case 'v':
            return [1, 0];
    }
};

export const isHorizontal = (c: U.Coord): boolean => c[1] !== 0;
export const isLeft = (c: U.Coord): boolean => c[1] === -1;
export const isRight = (c: U.Coord): boolean => c[1] === 1;

export const expandChar = (c: string): string[] => {
    switch (c) {
        case '#':
            return ['#', '#'];
        case '.':
            return ['.', '.'];
        case 'O':
            return ['[', ']'];
        case '@':
            return ['@', '.'];
        default:
            throw "expandChar: don't recognize char '" + c + "'";
    }
};

export const parseGrid = (str: string): string[][] =>
    str
        .split('\n')
        .slice(1, -1)
        .map((line) => line.slice(1, -1).split('').flatMap(expandChar));

export const parseInput = (str: string): State => {
    const [gridStr, moveStr] = str.split('\n\n');
    let grid = parseGrid(gridStr);
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

export const smallSampleInput = parseInput(Input.smallSampleStrHard);
export const sampleInput = parseInput(Input.sampleStr);
export const input = parseInput(Input.str);

export const showGrid = (state: State): string => {
    const grid = structuredClone(state.grid);
    grid[state.pos[0]][state.pos[1]] = '@';
    return grid.map((row) => row.join('')).join('\n');
};
export const printGrid = (state: State): void => console.log(showGrid(state));
export const showMoves = (state: State): string => state.moves.join('');
export const printMoves = (state: State): void => console.log(showMoves(state));

export const score = (state: State): number => scoreInternal(state.grid);
export const scoreInternal = (grid: string[][]): number => {
    let n = 0;
    grid.forEach((row: string[], y: number) =>
        row.forEach((c: string, x: number) => {
            if (c === '[') {
                n += 100 * (y + 1) + (x + 2);
            }
        })
    );
    return n;
};

export const tryMoveLeft = (state: State): void => {
    let next = U.add(state.pos, [0, -1]),
        freeSpace = next,
        left: U.Coord = [0, -1],
        twoLeft: U.Coord = [0, -2];
    findNextFreeSpace: while (true) {
        if (freeSpace[1] < 0) {
            return;
        }
        switch (U.at(state.grid, freeSpace)) {
            case '#':
                return;
            case '.':
                break findNextFreeSpace;
            case '[':
                throw 'tryMoveLeft: encountered [';
            case ']':
            // do nothing
        }
        freeSpace = U.add(freeSpace, twoLeft);
    }
    state.pos = next;
    if (U.equal(next, freeSpace)) {
        return;
    }
    state.grid[next[0]][next[1]] = '.';
    for (
        let coord = U.add(next, left);
        coord[1] > freeSpace[1];
        coord = U.add(coord, twoLeft)
    ) {
        state.grid[coord[0]][coord[1]] = ']';
    }
    for (
        let coord = U.add(next, twoLeft);
        coord[1] >= freeSpace[1];
        coord = U.add(coord, twoLeft)
    ) {
        state.grid[coord[0]][coord[1]] = '[';
    }
};

export const tryMoveRight = (state: State): void => {
    let next = U.add(state.pos, [0, 1]),
        freeSpace = next,
        right: U.Coord = [0, 1],
        twoRight: U.Coord = [0, 2];
    findNextFreeSpace: while (true) {
        if (freeSpace[1] >= state.grid[0].length) {
            return;
        }
        switch (U.at(state.grid, freeSpace)) {
            case '#':
                return;
            case '.':
                break findNextFreeSpace;
            case ']':
                throw 'tryMoveRight: encountered ]';
            case '[':
            // do nothing
        }
        freeSpace = U.add(freeSpace, twoRight);
    }
    state.pos = next;
    if (U.equal(next, freeSpace)) {
        return;
    }
    state.grid[next[0]][next[1]] = '.';
    for (
        let coord = U.add(next, right);
        coord[1] < freeSpace[1];
        coord = U.add(coord, twoRight)
    ) {
        state.grid[coord[0]][coord[1]] = '[';
    }
    for (
        let coord = U.add(next, twoRight);
        coord[1] <= freeSpace[1];
        coord = U.add(coord, twoRight)
    ) {
        state.grid[coord[0]][coord[1]] = ']';
    }
};

export const boxesToMove = (
    grid: string[][],
    pos: U.Coord,
    direction: U.Coord
): JSONSet.JsonSet<U.Coord> | false => {
    const set: JSONSet.JsonSet<U.Coord> = new JSONSet.JsonSet();
    const outOfBounds = (pos: U.Coord): boolean =>
        pos[0] < 0 || pos[0] >= grid.length;
    const addBoxes = (pos: U.Coord): boolean | void => {
        if (outOfBounds(pos)) {
            return false;
        }
        switch (U.at(grid, pos)) {
            case '.':
                return true;
            case '#':
                return false;
            case '[':
                if (set.has(pos)) {
                    return true;
                } else {
                    set.add(pos);
                    return (
                        addBoxes(U.add(pos, direction)) &&
                        addBoxes(U.add(pos, [0, 1], direction))
                    );
                }
            case ']':
                if (set.has(U.add(pos, [0, -1]))) {
                    return true;
                } else {
                    set.add(U.add(pos, [0, -1]));
                    return (
                        addBoxes(U.add(pos, [0, -1], direction)) &&
                        addBoxes(U.add(pos, direction))
                    );
                }
        }
    };
    if (addBoxes(pos)) {
        return set;
    } else {
        return false;
    }
};

export const tryMoveVertically = (state: State, yDirection: number): void => {
    const direction: U.Coord = [yDirection, 0],
        set = boxesToMove(state.grid, U.add(state.pos, direction), direction);
    if (!set) {
        return;
    }
    for (let box of set) {
        state.grid[box[0]][box[1]] = '.';
        state.grid[box[0]][box[1] + 1] = '.';
    }
    for (let box of set) {
        state.grid[box[0] + yDirection][box[1]] = '[';
        state.grid[box[0] + yDirection][box[1] + 1] = ']';
    }
    state.pos[0] += yDirection;
};

export const step = (state: State): void => {
    assert.ok(state.moves.length > 0);
    let direction = state.moves[0];
    state.moves.shift();
    switch (direction) {
        case '<':
            tryMoveLeft(state);
            break;
        case '>':
            tryMoveRight(state);
            break;
        case '^':
            tryMoveVertically(state, -1);
            break;
        case 'v':
            tryMoveVertically(state, 1);
            break;
    }
};

export const solve = (state: State): number => {
    printGrid(state);
    while (state.moves.length > 0) {
        console.log('');
        console.log('Next move: ' + state.moves[0]);
        console.log('');
        step(state);
        printGrid(state);
    }
    console.log('');
    return score(state);
};
