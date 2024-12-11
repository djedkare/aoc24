import * as X from './code08.js';
import assert from 'assert';

describe('Day 8', function () {
    describe('Input', function () {
        it('makeGrid: 2x2 input, newline terminated', function () {
            const str = '.a\n0.\n';
            const output = [
                ['.', 'a'],
                ['0', '.'],
            ];
            assert.deepStrictEqual(output, X.makeGrid(str));
        });
        it('makeGrid: 2x2 input', function () {
            const str = '.a\n0.';
            const output = [
                ['.', 'a'],
                ['0', '.'],
            ];
            assert.deepStrictEqual(output, X.makeGrid(str));
        });
        it('makeMap: 2x2 input', function () {
            const str = '.a\n0.';
            const output = new Map<string, [number, number][]>([
                ['a', [[0, 1]]],
                ['0', [[1, 0]]],
            ]);
            assert.deepStrictEqual(output, X.makeMap(X.makeGrid(str)));
        });
        it('makeMap: 2x2 input, duplicate', function () {
            const str = '.a\n0a';
            const output = new Map<string, [number, number][]>([
                [
                    'a',
                    [
                        [0, 1],
                        [1, 1],
                    ],
                ],
                ['0', [[1, 0]]],
            ]);
            assert.deepStrictEqual(output, X.makeMap(X.makeGrid(str)));
        });
    });

    describe('Easy', function () {
        it('antinodesPair', function () {
            const c0: X.Coord = [5, 5];
            const c1: X.Coord = [7, 6];
            const output = [
                [3, 4],
                [9, 7],
            ];
            assert.deepStrictEqual(output, X.antinodesPair(c0, c1));
        });
        it('antinodesPair: ([3, 4], [5, 5])', function () {
            const c0: X.Coord = [3, 4];
            const c1: X.Coord = [5, 5];
            const output = [
                [1, 3],
                [7, 6],
            ];
            assert.deepStrictEqual(output, X.antinodesPair(c0, c1));
        });
        // it('antinodesArr: a from sample input');
    });
});
