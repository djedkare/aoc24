import * as X from './code07.js';
import assert from 'assert';

describe('Day 7', function () {
    describe('Easy', function () {
        it('transformInput: single line', function () {
            const str = '161011: 16 10 13';
            const output: [number, number[]][] = [[161011, [16, 10, 13]]];
            assert.deepStrictEqual(output, X.transformInput(str));
        });
        it('transformInput: 3 lines', function () {
            const str = String.raw`190: 10 19
3267: 81 40 27
83: 17 5`;
            const output = [
                [190, [10, 19]],
                [3267, [81, 40, 27]],
                [83, [17, 5]],
            ];
            assert.deepStrictEqual(output, X.transformInput(str));
        });
        it('sat: true empty', function () {
            assert.ok(X.sat([0, []]));
        });
        it('sat: false empty', function () {
            assert.ok(!X.sat([1, []]));
        });
        it('sat: true [190, [10, 19]]', function () {
            assert.ok(X.sat([190, [10, 19]]));
        });
        it('sat: true [3267, [81, 40, 27]]', function () {
            assert.ok(X.sat([3267, [81, 40, 27]]));
        });
        it('sat: false [83, [17, 5]]', function () {
            assert.ok(!X.sat([83, [17, 5]]));
        });
        it('solve: sample input', function () {
            assert.deepStrictEqual(3749, X.solve(X.inputSampleStr));
        });
        it('inverseconcat(1234, 34)', function () {
            assert.deepStrictEqual(12, X.inverseConcatDigits(1234, 34));
        });
        it('inverseConcat(156, 6)', function () {
            assert.deepStrictEqual(15, X.inverseConcatDigits(156, 6));
        });
        it('satHard: true [190, [10, 19]]', function () {
            assert.ok(X.satHard([190, [10, 19]]));
        });
        it('satHard: true [3267, [81, 40, 27]]', function () {
            assert.ok(X.satHard([3267, [81, 40, 27]]));
        });
        it('satHard: false [83, [17, 5]]', function () {
            assert.ok(!X.satHard([83, [17, 5]]));
        });
        it('satHard: true [156, [15, 6]]', function () {
            assert.ok(X.satHard([156, [15, 6]]));
        });
        it('satHard: true [192, [17, 8, 14]]', function () {
            assert.ok(X.satHard([192, [17, 8, 14]]));
        });
        it('satHard: true [7290, [6, 8, 6, 15]]', function () {
            assert.ok(X.satHard([7290, [6, 8, 6, 15]]));
        });
        it('solveHard: sample input', function () {
            assert.deepStrictEqual(11387, X.solveHard(X.inputSampleStr));
        });
    });
});
