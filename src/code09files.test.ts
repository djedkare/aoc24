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
        it('');
    });
});
