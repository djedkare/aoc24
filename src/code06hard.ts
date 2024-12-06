import * as Input from './inputs/input06.js';
import * as U from './utils.js';

export const inputStr = Input.str;
export const inputSampleStr = Input.sampleStr;

type Dir = 'up' | 'down' | 'left' | 'right';
type Coord = [number, number];

export const transformInput = (str: string): [boolean[][], Coord] => {
    const strArr = str.split('\n').map((row) => row.split(''));
    if (strArr[strArr.length - 1].length === 0) {
        strArr.pop();
    }

    const blockedArr = strArr.map((row) => row.map((c) => c === '#'));

    let position: [number, number] | undefined;
    for (let y = 0; y < strArr.length; y++) {
        for (let x = 0; x < strArr[y].length; x++) {
            if (strArr[y][x] === '^') {
                position = [y, x];
                break;
            }
        }
        if (position) {
            break;
        }
    }
    return [blockedArr, position!];
};

export const inputSample = transformInput(Input.sampleStr);
export const input = transformInput(Input.str);

export const nextPos = ([y, x]: Coord, d: Dir): Coord => {
    switch (d) {
        case 'up':
            return [y - 1, x];
        case 'down':
            return [y + 1, x];
        case 'left':
            return [y, x - 1];
        case 'right':
            return [y, x + 1];
    }
};

export const turnRight = (d: Dir): Dir => {
    switch (d) {
        case 'down':
            return 'left';
        case 'left':
            return 'up';
        case 'up':
            return 'right';
        case 'right':
            return 'down';
    }
};

export const outOfRange = (
    [y, x]: Coord,
    yRange: number,
    xRange: number
): boolean => {
    return y < 0 || y >= yRange || x < 0 || x >= xRange;
};

export const sameCoord = ([y0, x0]: Coord, [y1, x1]: Coord): boolean =>
    y0 === y1 && x0 === x1;

export const checkLoop = (
    blockedArr: boolean[][],
    newObstr: Coord,
    pos: Coord,
    dir: Dir
): boolean => {
    const yRange = blockedArr.length;
    const xRange = blockedArr[0].length;
    const blocked = ([y, x]: Coord) =>
        sameCoord([y, x], newObstr) ? true : blockedArr[y][x];

    // const visited: Set<[Coord, Dir]> = new Set([]);
    const visited: Set<string> = new Set([]);
    while (true) {
        if (visited.has(JSON.stringify([pos, dir]))) {
            return true;
        }
        visited.add(JSON.stringify([pos, dir]));
        const next = nextPos(pos, dir);
        if (outOfRange(next, yRange, xRange)) {
            return false;
        } else if (blocked(next)) {
            dir = turnRight(dir);
        } else {
            pos = next;
        }
    }
};

export const solve_ = (
    blockedArr: boolean[][],
    pos: Coord,
    dir: Dir
): number => {
    const yRange = blockedArr.length;
    const xRange = blockedArr[0].length;
    const blocked = ([y, x]: Coord) => blockedArr[y][x];

    const newObstructions: Set<string> = new Set([]);
    let n = 0;
    while (true) {
        const next = nextPos(pos, dir);
        if (outOfRange(next, yRange, xRange)) {
            return n;
        } else if (blocked(next)) {
            dir = turnRight(dir);
        } else {
            if (!newObstructions.has(JSON.stringify(next))) {
                newObstructions.add(JSON.stringify(next));
                if (checkLoop(blockedArr, next, pos, dir)) {
                    n++;
                }
            }
            pos = next;
        }
    }
};

export const solve = (str: string): number => {
    const [arr, pos] = transformInput(str);
    return solve_(arr, pos, 'up');
};
