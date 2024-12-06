import * as X from './code06hard.js';
import assert from 'assert';

describe('Day 6 Hard', function () {
    it('transformInput: trivial input', function () {
        const inputStr = '.#\n^.';
        const output = [
            [
                [false, true],
                [false, false],
            ],
            [1, 0],
        ];
        assert.deepStrictEqual(output, X.transformInput(inputStr));
    });
    it('transformInput: inputSample starting location', function () {
        assert.deepStrictEqual([6, 4], X.inputSample[1]);
    });
    it('checkLoop: inputSample Loop No. 1', function () {
        assert.ok(
            X.checkLoop(X.inputSample[0], [6, 3], X.inputSample[1], 'up')
        );
    });
    it('checkLoop: inputSample Loop No. 2', function () {
        assert.ok(
            X.checkLoop(X.inputSample[0], [7, 6], X.inputSample[1], 'up')
        );
    });
    it('checkLoop: inputSample Loop No. 3', function () {
        assert.ok(
            X.checkLoop(X.inputSample[0], [7, 7], X.inputSample[1], 'up')
        );
    });
    it('checkLoop: inputSample Loop No. 4', function () {
        assert.ok(
            X.checkLoop(X.inputSample[0], [8, 1], X.inputSample[1], 'up')
        );
    });
    it('checkLoop: inputSample Loop No. 5', function () {
        assert.ok(
            X.checkLoop(X.inputSample[0], [8, 3], X.inputSample[1], 'up')
        );
    });
    it('checkLoop: inputSample Loop No. 6', function () {
        assert.ok(
            X.checkLoop(X.inputSample[0], [9, 7], X.inputSample[1], 'up')
        );
    });
    it('solve: sample input', function () {
        assert.deepStrictEqual(6, X.solve(X.inputSampleStr));
    });
});
