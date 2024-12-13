import * as X from './code12.js';
import assert from 'assert';

describe('Day 12: Farming & Fences', function () {
    describe('Easy', function () {
        it('getRegion: sample input, size one region', function () {
            assert.deepStrictEqual(
                X.getRegion(X.sampleInput, [4, 7]),
                new Set(['[4,7]'])
            );
        });
        it('getRegion: bottom left region "M" 1', function () {
            const arr = [
                [7, 0],
                [8, 0],
                [9, 0],
                [9, 1],
                [9, 2],
            ];
            const set = new Set(arr.map((p) => JSON.stringify(p)));
            assert.deepStrictEqual(X.getRegion(X.sampleInput, [7, 0]), set);
        });
        it('getRegion: bottom left region "M" 2', function () {
            const arr = [
                [7, 0],
                [8, 0],
                [9, 0],
                [9, 1],
                [9, 2],
            ];
            const set = new Set(arr.map((p) => JSON.stringify(p)));
            assert.deepStrictEqual(X.getRegion(X.sampleInput, [9, 0]), set);
        });
        it('getRegion: bottom left region "M" 3', function () {
            const arr = [
                [7, 0],
                [8, 0],
                [9, 0],
                [9, 1],
                [9, 2],
            ];
            const set = new Set(arr.map((p) => JSON.stringify(p)));
            assert.deepStrictEqual(X.getRegion(X.sampleInput, [9, 2]), set);
        });
        it('perimeter: size one region', function () {
            assert.deepStrictEqual(X.perimeter(new Set(['[5,5]'])), 4);
        });
        it('perimeter: bottom left region "M"', function () {
            assert.deepStrictEqual(
                X.perimeter(X.getRegion(X.sampleInput, [9, 0])),
                12
            );
        });
        it('solveEasy: sample input', function () {
            assert.deepStrictEqual(X.solveEasy(X.sampleInput), 1930);
        });
    });

    describe('Hard', function () {
        it('fences: size one region', function () {
            const region = new Set([JSON.stringify([5, 5])]);
            const fencesArr = [
                [
                    [5, 5],
                    [0, 1],
                ],
                [
                    [5, 5],
                    [0, -1],
                ],
                [
                    [5, 5],
                    [1, 0],
                ],
                [
                    [5, 5],
                    [-1, 0],
                ],
            ];
            const output = new Set(fencesArr.map((p) => JSON.stringify(p)));
            assert.deepStrictEqual(X.fences(region), output);
        });
        it('fences: size two region', function () {
            const region = new Set(
                [
                    [5, 5],
                    [5, 6],
                ].map((p) => JSON.stringify(p))
            );
            const fencesArr = [
                [
                    [5, 5],
                    [0, -1],
                ],
                [
                    [5, 5],
                    [1, 0],
                ],
                [
                    [5, 5],
                    [-1, 0],
                ],
                [
                    [5, 6],
                    [0, 1],
                ],
                [
                    [5, 6],
                    [1, 0],
                ],
                [
                    [5, 6],
                    [-1, 0],
                ],
            ];
            const output = new Set(fencesArr.map((p) => JSON.stringify(p)));
            assert.deepStrictEqual(X.fences(region), output);
        });
        it('sides: size one region', function () {
            const region = new Set([JSON.stringify([5, 5])]);
            assert.deepStrictEqual(X.sides(X.fences(region)), 4);
        });
        it('sides: size 2 region', function () {
            const region = new Set(
                [
                    [5, 5],
                    [5, 6],
                ].map((p) => JSON.stringify(p))
            );
            assert.deepStrictEqual(X.sides(X.fences(region)), 4);
        });
        it('solveHard: sample input', function () {
            assert.deepStrictEqual(X.solveHard(X.sampleInput), 1206);
        });
    });
});
