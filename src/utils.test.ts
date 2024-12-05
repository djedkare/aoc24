import * as U from './utils.js';
import assert from 'assert';

describe('Utils', function () {
    describe('Array', function () {
        it('range(5)', function () {
            assert.deepStrictEqual(U.range(5), [0, 1, 2, 3, 4]);
        });
        it('range(0)', function () {
            assert.deepStrictEqual(U.range(0), []);
        });
        it('range(-2, 5', function () {
            assert.deepStrictEqual(U.range(-2, 5), [-2, -1, 0, 1, 2, 3, 4]);
        });
        it('zip', function () {
            assert.deepStrictEqual(U.zip([1, 2, 3], ['a', 'b', 'c', 'd']), [
                [1, 'a'],
                [2, 'b'],
                [3, 'c'],
            ]);
        });
        it('zipWith', function () {
            assert.deepStrictEqual(
                U.zipWith((x, y) => x + y, [10, 20, 30, 40], [1, 2, 3]),
                [11, 22, 33]
            );
        });
        it('count', function () {
            assert.deepStrictEqual(
                U.count((n) => n % 2 === 0, U.range(5)),
                3
            );
        });
    });

    describe('Set', function () {
        it('empty false', function () {
            assert.ok(!new Set([false]).empty());
        });
        it('empty true', function () {
            assert.ok(new Set([]).empty());
        });
        it('union()', function () {
            assert.deepStrictEqual(U.union(), new Set([]));
        });
        it('union(x, y)', function () {
            assert.deepStrictEqual(
                U.union(new Set([1, 2, 3]), new Set([3, 4, 5])),
                new Set([1, 2, 3, 4, 5])
            );
        });
        it('union(x, y, z)', function () {
            assert.deepStrictEqual(
                U.union(new Set([1, 2, 3]), new Set([3, 4, 5]), new Set([10])),
                new Set([1, 2, 3, 4, 5, 10])
            );
        });
        it('intersection(x)', function () {
            assert.deepStrictEqual(
                U.intersection(new Set([1, 2, 3])),
                new Set([1, 2, 3])
            );
        });
        it('intersection(x, y)', function () {
            assert.deepStrictEqual(
                U.intersection(new Set([1, 2, 3]), new Set([3, 4, 5])),
                new Set([3])
            );
        });
        it('intersection( x, y, z)', function () {
            assert.deepStrictEqual(
                U.intersection(
                    new Set([1, 2, 3]),
                    new Set([2, 3, 4]),
                    new Set([3, 4, 5])
                ),
                new Set([3])
            );
        });
    });
});
