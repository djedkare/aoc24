import * as X from './code15.js';
import assert from 'assert';

describe('Day 15: Warehouse Robot', function () {
    describe('Easy', function () {
        it('scoreInternal', function () {
            const gridStr = String.raw`##########
#.O.O.OOO#
#........#
#OO......#
#OO@.....#
#O#.....O#
#O.....OO#
#O.....OO#
#OO....OO#
##########`;
            const grid = X.parseGrid(gridStr);
            assert.deepStrictEqual(X.scoreInternal(grid), 10092);
        });
        it('solveEasy: small sample input', function () {
            assert.deepStrictEqual(X.solveEasy(X.smallSampleInput), 2028);
        });
        it('solveEasy: sample input', function () {
            assert.deepStrictEqual(X.solveEasy(X.sampleInput), 10092);
        });
    });
});
