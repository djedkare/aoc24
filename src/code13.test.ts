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
});
