import * as X from './code06.js';
import assert from 'assert';

describe('Day 6', function () {
    it('transformIntput trivial', function () {
        //   ..
        //   ^.
        const inputStr = '..\n^.\n';
        const comparisonObj = {
            yLength: 2,
            xLength: 2,
            grid: [
                ['.', '.'],
                ['.', '.'],
            ],
            visited: [
                [false, false],
                [false, false],
            ],
            position: [1, 0],
            direction: [-1, 0],
            done: false,
        };
        assert.deepStrictEqual(comparisonObj, X.transformInput(inputStr));
        // assert.ok(!X.isDone(comparisonObj));
    });
    it('transformIntput one #', function () {
        //   .#
        //   ^.
        const inputStr = '.#\n^.\n';
        const comparisonObj = {
            yLength: 2,
            xLength: 2,
            grid: [
                ['.', '#'],
                ['.', '.'],
            ],
            visited: [
                [false, false],
                [false, false],
            ],
            position: [1, 0],
            direction: [-1, 0],
            done: false,
        };
        assert.deepStrictEqual(comparisonObj, X.transformInput(inputStr));
        // assert.ok(!X.isDone(comparisonObj));
    });
    // it('isDone true', function () {
    //     const comparisonObj = {
    //         yLength: 2,
    //         xLength: 2,
    //         grid: [
    //             ['.', '#'],
    //             ['.', '.'],
    //         ],
    //         visited: [
    //             [false, false],
    //             [false, false],
    //         ],
    //         position: [2, 0] as [number, number],
    //         direction: [-1, 0] as [number, number],
    //     };
    //     assert.ok(X.isDone(comparisonObj));
    // });
    it('countVisited', function () {
        const comparisonObj = {
            yLength: 2,
            xLength: 2,
            grid: [
                ['.', '#'],
                ['.', '.'],
            ],
            visited: [
                [true, false],
                [true, true],
            ],
            position: [2, 0] as [number, number],
            direction: [-1, 0] as [number, number],
            done: true,
        };
        assert.deepStrictEqual(X.countVisited(comparisonObj), 3);
    });
    it('solves easy sample', function () {
        assert.deepStrictEqual(X.solutionEasySample, 41);
    });
});
