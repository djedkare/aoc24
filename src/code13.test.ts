import * as X from './code13.js';
import assert from 'assert';

describe('Day 13: Claw Machine', function () {
    describe('Easy', function () {
        it('solvePuzzle: sample input, puzzle 0', function () {
            assert.deepStrictEqual(X.solvePuzzle(X.sampleInput[0]), [80, 40]);
        });
        it('solvePuzzle: sample input, puzzle 1', function () {
            assert.deepStrictEqual(X.solvePuzzle(X.sampleInput[1]), [-1, -1]);
        });
        it('solvePuzzle: sample input, puzzle 2', function () {
            assert.deepStrictEqual(X.solvePuzzle(X.sampleInput[2]), [38, 86]);
        });
        it('solvePuzzle: sample input, puzzle 3', function () {
            assert.deepStrictEqual(X.solvePuzzle(X.sampleInput[3]), [-1, -1]);
        });
    });

    describe('Hard', function () {
        it('solvePuzzleGauss: simple example', function () {
            const p: X.Puzzle = { A: [5, 3], B: [2, 4], Prize: [7, 7] };
            assert.deepStrictEqual(X.solvePuzzleGauss(p), [1, 1]);
        });
        it('solvePuzzleGauss: sample input, puzzle 0', function () {
            assert.deepStrictEqual(
                X.solvePuzzleGauss(X.sampleInput[0]),
                [80, 40]
            );
        });
        it('solvePuzzleGauss: sample input, puzzle 2', function () {
            assert.deepStrictEqual(
                X.solvePuzzleGauss(X.sampleInput[2]),
                [38, 86]
            );
        });
        it('solveHard: solves easy input', function () {
            assert.deepStrictEqual(X.solveHard(X.input), X.solveEasy(X.input));
        });
        it('hardenPuzzle', function () {
            const p = X.sampleInput[0];
            const output = {
                A: [94, 34],
                B: [22, 67],
                Prize: [10000000008400, 10000000005400],
            };
            assert.deepStrictEqual(X.hardenPuzzle(X.sampleInput[0]), output);
        });
    });
});
