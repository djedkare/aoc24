import * as X from './code19.js';
import assert from 'assert';

describe('Day 19: Towels', function () {
    describe('Easy', function () {
        it('isPossibleRecursive: sample input no. 0', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[0]
                ),
                true
            );
        });
        it('isPossibleRecursive: sample input no. 1', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[1]
                ),
                true
            );
        });
        it('isPossibleRecursive: sample input no. 2', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[2]
                ),
                true
            );
        });
        it('isPossibleRecursive: sample input no. 3', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[3]
                ),
                true
            );
        });
        it('isPossibleRecursive: sample input no. 4', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[4]
                ),
                false
            );
        });
        it('isPossibleRecursive: sample input no. 5', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[5]
                ),
                true
            );
        });
        it('isPossibleRecursive: sample input no. 6', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[6]
                ),
                true
            );
        });
        it('isPossibleRecursive: sample input no. 7', function () {
            assert.deepStrictEqual(
                X.isPossibleRecursive(
                    X.sampleInput.available,
                    X.sampleInput.designs[7]
                ),
                false
            );
        });
        it('solveEasy: sample input', function () {
            assert.deepStrictEqual(X.solveEasy(X.sampleInput), 6);
        });
    });

    describe('Hard', function () {
        it('solveHardBruteForce: sample input', function () {
            assert.deepStrictEqual(X.solveHardBruteForce(X.sampleInput), 16);
        });
        it('solveHardDynamic: sample input', function () {
            assert.deepStrictEqual(X.solveHardDynamic(X.sampleInput), 16);
        });
    });
});
