import * as X from './code10.js';
import assert from 'assert';

describe('Day 10: Hiking', function () {
    describe('Easy', function () {
        it('dfs: sample input, bottom 0', function () {
            const grid = X.transformInput(X.sampleStr);
            const c: [number, number] = [7, 1];
            assert.deepEqual(X.distinct(X.dfs(grid, c)), 5);
        });
        it('dfs: sample input, top 0', function () {
            const grid = X.transformInput(X.sampleStr);
            const c: [number, number] = [0, 2];
            assert.deepEqual(X.distinct(X.dfs(grid, c)), 5);
        });
        it('solveEasy: sample input', function () {
            assert.deepStrictEqual(X.solveEasy(X.sampleStr), 36);
        });
    });

    describe('Hard', function () {
        it('');
    });
});
