import * as Input from './inputs/input11.js';
import * as U from './utils.js';
import assert from 'assert';

export const input = Input.str;

export const transformInput = (str: string): number[] =>
    str.split(' ').map((n) => parseInt(n));

export const splitDigits = (stone: number): [number, number] | false => {
    assert.ok(stone >= 0);
    const str = '' + stone;
    if (str.length % 2 !== 0) {
        return false;
    }
    const left = parseInt(str.slice(0, str.length / 2));
    const right = parseInt(str.slice(str.length / 2, str.length));
    return [left, right];
};

export const blink = (stone: number): number[] => {
    if (stone === 0) {
        return [1];
    }
    const d = splitDigits(stone);
    if (d) {
        return d;
    } else {
        return [stone * 2024];
    }
};

export const passTimeBruteForce = (
    stones: number[],
    steps: number
): number[] => {
    if (steps === 0) {
        return stones;
    }
    return passTimeBruteForce(
        stones.flatMap((st) => blink(st)),
        steps - 1
    );
};

export const passTime = (
    map: Map<string, number>,
    stones: number[],
    steps: number
): number => {
    if (steps === 0) {
        return stones.length;
    }
    let count = 0;
    for (const stone of stones) {
        const encoded = JSON.stringify([stone, steps]);
        if (map.has(encoded)) {
            count += map.get(encoded)!;
        } else {
            const succ = blink(stone);
            const n = passTime(map, succ, steps - 1);
            map.set(encoded, n);
            count += n;
        }
    }
    return count;
};

export const solveEasy = (stones: number[], steps: number): number =>
    passTime(new Map(), stones, steps);
