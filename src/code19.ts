import * as Input from './inputs/input19.js';
import * as U from './utils.js';
import assert from 'assert';

export type Puzzle = { available: string[]; designs: string[] };

export const parseInput = (str: string): Puzzle => {
    const [str0, str1] = str.split('\n\n');
    const available = str0.split(', ');
    const designs = str1.split('\n');
    return { available: available, designs: designs };
};

export const sampleInput = parseInput(Input.sampleStr);
export const input = parseInput(Input.str);

export const isPossibleRecursive = (
    available: string[],
    design: string
): boolean => {
    if (design.length === 0) {
        return true;
    }
    for (const s of available) {
        if (
            design.startsWith(s) &&
            isPossibleRecursive(available, design.slice(s.length))
        ) {
            return true;
        }
    }
    return false;
};

export const solveEasy = (puzzle: Puzzle): number => {
    let n = 0;
    for (const design of puzzle.designs) {
        if (isPossibleRecursive(puzzle.available, design)) {
            n++;
        }
    }
    return n;
};

export const countPossibilitiesRecursive = (
    available: string[],
    design: string
): number => {
    if (design.length === 0) {
        return 1;
    }
    let n = 0;
    for (const s of available) {
        if (design.startsWith(s)) {
            n += countPossibilitiesRecursive(available, design.slice(s.length));
        }
    }
    return n;
};

export const solveHardBruteForce = (puzzle: Puzzle): number => {
    let n = 0;
    for (const design of puzzle.designs) {
        n += countPossibilitiesRecursive(puzzle.available, design);
    }
    return n;
};

export const countPossibilitiesDynamic = (
    available: string[],
    design: string
): number => {
    const arr = Array(design.length + 1).fill(0);
    arr[design.length] = 1;
    for (let i = design.length - 1; i >= 0; i--) {
        const remaining = design.slice(i);
        for (const towel of available) {
            if (remaining.startsWith(towel)) {
                arr[i] += arr[i + towel.length];
            }
        }
    }
    return arr[0];
};

export const solveHardDynamic = (puzzle: Puzzle): number => {
    let n = 0;
    for (const design of puzzle.designs) {
        n += countPossibilitiesDynamic(puzzle.available, design);
    }
    return n;
};
