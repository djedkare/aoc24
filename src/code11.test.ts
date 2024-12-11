import * as X from './code11.js';
import assert from 'assert';

describe('Day 11: Stones', function () {
    describe('Easy', function () {
        it('transformInput', function () {
            assert.deepStrictEqual(
                X.transformInput('2701 64945 0 9959979 93 781524 620 1'),
                [2701, 64945, 0, 9959979, 93, 781524, 620, 1]
            );
        });
        it('splitDigits(10)', function () {
            assert.deepStrictEqual(X.splitDigits(10), [1, 0]);
        });
        it('splitDigits(101)', function () {
            assert.deepStrictEqual(X.splitDigits(101), false);
        });
        it('splitDigits(1001)', function () {
            assert.deepStrictEqual(X.splitDigits(1001), [10, 1]);
        });
        it('blink(0)', function () {
            assert.deepStrictEqual(X.blink(0), [1]);
        });
        it('blink(2)', function () {
            assert.deepStrictEqual(X.blink(2), [4048]);
        });
        it('blink(1001)', function () {
            assert.deepStrictEqual(X.blink(1001), [10, 1]);
        });
        it('passTimeBruteForce: sample input, 1 step', function () {
            assert.deepStrictEqual(
                X.passTimeBruteForce([125, 17], 1),
                [253000, 1, 7]
            );
        });
        it('passTimeBruteForce: sample input, 2 steps', function () {
            assert.deepStrictEqual(
                X.passTimeBruteForce([125, 17], 2),
                [253, 0, 2024, 14168]
            );
        });
        it('passTimeBruteForce: sample input, 6 steps', function () {
            assert.deepStrictEqual(
                X.passTimeBruteForce([125, 17], 6),
                [
                    2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48,
                    80, 96, 2, 8, 6, 7, 6, 0, 3, 2,
                ]
            );
        });
    });
});
