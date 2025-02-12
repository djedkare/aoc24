//   Coord
//   =====

export type Coord = [number, number];

export const at = <T>(grid: T[][], [y, x]: Coord): T => grid[y][x];

export const addInternal = ([y0, x0]: Coord, [y1, x1]: Coord): Coord => [
    y0 + y1,
    x0 + x1,
];

export const add = (...args: Coord[]): Coord => {
    if (args.length === 0) {
        return [0, 0];
    }
    return args.reduce(addInternal);
};

export const mul = ([y0, x0]: Coord, [y1, x1]: Coord): Coord => [
    y0 * y1,
    x0 * x1,
];

export const subtract = ([y0, x0]: Coord, [y1, x1]: Coord): Coord => [
    y0 - y1,
    x0 - x1,
];

export const dist = ([y0, x0]: Coord, [y1, x1]: Coord): number =>
    Math.sqrt(Math.pow(y0 - y1, 2) + Math.pow(x0 - x1, 2));

export const equal = ([y0, x0]: Coord, [y1, x1]: Coord) =>
    y0 === y1 && x0 === x1;

export const neighbours = ([y, x]: Coord): Coord[] => [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
];

export const print = ([y, x]: Coord): string => `[${y}, ${x}]`;

//   Coord-Adjacent
//   ==============

export const initializeGrid = <T>(size: Coord, val: T): T[][] => {
    const grid = Array(size[0]);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(size[1]).fill(val);
    }
    return grid;
};

//   Array
//   =====

export function range(lower: number, upper?: number) {
    if (upper === undefined) {
        upper = lower;
        lower = 0;
    }
    return Array.from({ length: upper - lower }, (_, i) => i + lower);
}

export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
    let len = Math.min(a.length, b.length);
    let arr: [T, U][] = [];
    for (let i = 0; i < len; i++) {
        arr.push([a[i], b[i]]);
    }
    return arr;
};

export const zipWith = <T, U, V>(
    f: (arg0: T, arg1: U) => V,
    a: T[],
    b: U[]
): V[] => {
    let len = Math.min(a.length, b.length);
    let arr: V[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(f(a[i], b[i]));
    }
    return arr;
};

export const count = <T>(f: (arg0: T) => boolean, arr: T[]): number => {
    let acc = 0;
    for (const x of arr) {
        if (f(x)) {
            acc++;
        }
    }
    return acc;
};

export const sum = (numbers: number[]): number =>
    numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

export const product = (numbers: number[]): number =>
    numbers.reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        1
    );

export const max = (numbers: number[]): number => Math.max(...numbers); // max([]) === -Infinity

export const min = (numbers: number[]): number => Math.min(...numbers); // min([]) === Infinity

//   Set
//   ===

declare global {
    interface Set<T> {
        empty(): boolean;
    }
}

Set.prototype.empty = function (): boolean {
    return this.size === 0;
};

export const union = <T>(...args: Set<T>[]): Set<T> => {
    const outputSet: Set<T> = new Set([]);
    for (const set of args) {
        for (const x of set) {
            outputSet.add(x);
        }
    }
    return outputSet;
};

export const intersection = <T>(set0: Set<T>, ...sets: Set<T>[]): Set<T> => {
    const outputSet: Set<T> = new Set(set0);
    // for(const x of set0) { if(set1.has(x)) { outputSet.add(x); } }
    for (const set of sets) {
        const itemsToDelete = [];
        for (const elem of outputSet) {
            if (!set.has(elem)) {
                itemsToDelete.push(elem);
            }
        }
        for (const elem of itemsToDelete) {
            outputSet.delete(elem);
        }
    }
    return outputSet;
};
