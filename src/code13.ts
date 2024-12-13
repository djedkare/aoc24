import * as Input from './inputs/input13.js';
import * as U from './utils.js';
import assert from 'assert';

export type Puzzle = { A: U.Coord; B: U.Coord; Prize: U.Coord };

export const transformBlock = (str: string): Puzzle => {
    const [lineA, lineB, linePrize] = str.split('\n');
    const f = (s: string): U.Coord => {
        const numbers = s.match(/\d+/g)!;
        assert.equal(numbers.length, 2);
        return [parseInt(numbers[0]), parseInt(numbers[1])];
    };
    return { A: f(lineA), B: f(lineB), Prize: f(linePrize) };
};

export const transformInput = (str: string): Puzzle[] => {
    const blocks = str.split('\n\n');
    return blocks.map(transformBlock);
};

export const sampleInput = transformInput(Input.sampleStr);
export const input = transformInput(Input.str);

export const solvePuzzle = (puzzle: Puzzle): [number, number] => {
    let remainder: U.Coord = structuredClone(puzzle.Prize);
    let i = 0;
    while (remainder[0] >= 0 && remainder[1] >= 0 && i < 100) {
        if (
            remainder[0] % puzzle.B[0] === 0 &&
            remainder[1] % puzzle.B[1] === 0 &&
            remainder[0] / puzzle.B[0] === remainder[1] / puzzle.B[1]
        ) {
            return [i, remainder[0] / puzzle.B[0]];
        }

        i++;
        remainder = U.subtract(remainder, puzzle.A);
    }
    return [-1, -1];
};

export const cost = (x: U.Coord): number =>
    x[0] === -1 && x[1] === -1 ? 0 : 3 * x[0] + x[1];

export const solveEasy = (puzzles: Puzzle[]): number =>
    U.sum(puzzles.map((p) => cost(solvePuzzle(p))));

let ineq = ([y0, x0]: U.Coord, [y1, x1]: U.Coord) => y0 !== y1 || x0 !== x1;
