import * as X from './code09files.js';
import assert from 'assert';

describe('Day 9: Files on Disk', function () {
    describe('Input', function () {
        it('transformInput("12345")', function () {
            const str = '12345';
            const output = [
                0,
                '.',
                '.',
                1,
                1,
                1,
                '.',
                '.',
                '.',
                '.',
                2,
                2,
                2,
                2,
                2,
            ];
            assert.deepStrictEqual(X.transformInput(str), output);
        });
        it('transformInput(sampleStr)', function () {
            const str = '2333133121414131402';
            const output = [
                0,
                0,
                '.',
                '.',
                '.',
                1,
                1,
                1,
                '.',
                '.',
                '.',
                2,
                '.',
                '.',
                '.',
                3,
                3,
                3,
                '.',
                4,
                4,
                '.',
                5,
                5,
                5,
                5,
                '.',
                6,
                6,
                6,
                6,
                '.',
                7,
                7,
                7,
                '.',
                8,
                8,
                8,
                8,
                9,
                9,
            ];
            assert.deepStrictEqual(X.transformInput(str), output);
        });
    });
    describe('Easy', function () {
        it('moveFiles: sample input', function () {
            const str = X.sampleStr;
            const output = [
                0,
                0,
                9,
                9,
                8,
                1,
                1,
                1,
                8,
                8,
                8,
                2,
                7,
                7,
                7,
                3,
                3,
                3,
                6,
                4,
                4,
                6,
                5,
                5,
                5,
                5,
                6,
                6,
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
                '.',
            ];
            assert.deepStrictEqual(X.moveFiles(X.transformInput(str)), output);
        });
        it('solveEasy: sampleInput', function () {
            assert.deepStrictEqual(X.solveEasy(X.sampleStr), 1928);
        });
    });

    describe('Hard', function () {
        it('transformInputHard: empty input', function () {
            const input = '';
            const output: X.Thing[] = [];
            assert.deepStrictEqual(X.transformInputHard(input), output);
        });
        it('transformInputHard: small input', function () {
            const input = '123';
            const output: X.Thing[] = [
                { t: 'File', id: 0, length: 1 },
                { t: 'Gap', length: 2 },
                { t: 'File', id: 1, length: 3 },
            ];
            assert.deepStrictEqual(X.transformInputHard(input), output);
        });
        it('deleteFileFromArray', function () {
            const inputThings: X.Thing[] = [
                { t: 'Gap', length: 3 },
                { t: 'File', length: 8, id: 12 },
                { t: 'Gap', length: 2 },
            ];
            X.deleteFileFromArray(inputThings, 1);
            const output: X.Thing[] = [{ t: 'Gap', length: 13 }];
            assert.deepStrictEqual(inputThings, output);
        });
        it('insertIntoGap: exact fit', function () {
            let inputThings: X.Thing[] = [
                { t: 'File', length: 3, id: 0 },
                { t: 'Gap', length: 8 },
                { t: 'File', length: 5, id: 1 },
            ];
            X.insertIntoGap(inputThings, 1, { t: 'File', length: 8, id: 99 });
            let output = [
                { t: 'File', length: 3, id: 0 },
                { t: 'File', length: 8, id: 99 },
                { t: 'File', length: 5, id: 1 },
            ];
            assert.deepStrictEqual(inputThings, output);
        });
        it('insertIntoGap: inexact fit', function () {
            let inputThings: X.Thing[] = [
                { t: 'File', length: 3, id: 0 },
                { t: 'Gap', length: 9 },
                { t: 'File', length: 5, id: 1 },
            ];
            X.insertIntoGap(inputThings, 1, { t: 'File', length: 8, id: 99 });
            let output = [
                { t: 'File', length: 3, id: 0 },
                { t: 'File', length: 8, id: 99 },
                { t: 'Gap', length: 1 },
                { t: 'File', length: 5, id: 1 },
            ];
            assert.deepStrictEqual(inputThings, output);
        });
    });
});
