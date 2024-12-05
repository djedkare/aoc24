import * as Input from './inputs/input04.js';
import * as U from './utils.js';

export const arr = Input.str.split('\n');

export const directions: number[][] =
    [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

export const add = ([a0, a1]: [number, number], [b0, b1]: [number, number]): [number, number] => [a0+b0, a1+b1];

export const valid = ([y, x]: [number, number]) => y < arr.length && x < arr[y].length;

export const at = ([y, x]: [number, number]) => arr[y][x];

export const makeString = (coord: [number, number], direction: [number, number]) => {
    let str = "";
    while(valid(coord)) {
        str += at(coord);
        coord = add(coord, direction);
    }
    return str;
}

export const arcs: string[] = ([] as string[]).concat(
    U.range(140).map((x) => makeString([0, x], [1, 0])),
    U.range(140).map((y) => makeString([y, 0], [0, 1])),
    // diagonal down right:
    U.range(140).map((y) => makeString([y, 0], [1, 1])),
    U.range(140).slice(1).map((x) => makeString([0, x], [1, 1])),
    // diagonal down left:
    U.range(140).slice(1).map((y) => makeString([y, 139], [1, -1])),
    U.range(140).map((x) => makeString([0, x], [1, -1]))
).flatMap((arc) => [arc, arc.split('').reverse().join('')])

export const search = (str: string): number => {
    const regex = /XMAS/g;
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

export const solution0 = arcs.reduce((acc, cur) => acc+search(cur), 0);

export const sameElems = (l0: string[], l1: string[]) =>
    JSON.stringify(l0.slice().sort()) === JSON.stringify(l1.slice().sort());

export const checkMas = (y: number, x: number): boolean =>
    sameElems([arr[y-1][x-1], arr[y+1][x+1]], ["M", "S"]) &&
    sameElems([arr[y-1][x+1], arr[y+1][x-1]], ["M", "S"]) &&
    arr[y][x] == "A"

export const solution1 =
    U.range(139).slice(1).flatMap(
        (y) => U.range(139).slice(1).map((x) => [y, x])
    ).filter(
        ([y, x]) => checkMas(y, x)
    ).length
