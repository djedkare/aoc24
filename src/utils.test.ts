import * as U from './utils.js';
import assert from 'assert';

describe('Utils', function () {
    describe('Coord', function () {
        it('equal: true', function () {
            assert.ok(U.equal([2, 3], [2, 3]));
        });
        it('equal: false 1', function () {
            assert.ok(!U.equal([2, 3], [3, 2]));
        });
        it('equal: false 2', function () {
            assert.ok(!U.equal([2, 3], [2, 333]));
        });
        it('equal: false 3', function () {
            assert.ok(!U.equal([2, 3], [222, 3]));
        });
        it('add: 0 args', function () {
            assert.deepStrictEqual(U.add(), [0, 0]);
        });
        it('add: 1 arg', function () {
            assert.deepStrictEqual(U.add([1, 3]), [1, 3]);
        });
        it('add: 2 args', function () {
            assert.deepStrictEqual(U.add([1, 3], [10, 30]), [11, 33]);
        });
        it('add: 3 args', function () {
            assert.deepStrictEqual(
                U.add([1, 3], [10, 30], [100, 300]),
                [111, 333]
            );
        });
        it('dist: 0', function () {
            assert.deepStrictEqual(U.dist([3, 500], [3, 500]), 0);
        });
        it('dist: 1 on y axis', function () {
            assert.deepStrictEqual(U.dist([3, 500], [4, 500]), 1);
        });
        it('dist: 1 on x axis', function () {
            assert.deepStrictEqual(U.dist([3, 500], [3, 501]), 1);
        });
        it('dist: 5', function () {
            assert.deepStrictEqual(U.dist([0, 0], [3, 4]), 5);
        });
    });

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
        it('sum', function () {
            assert.deepStrictEqual(10, U.sum([1, 2, 3, 4]));
        });
        it('product', function () {
            assert.deepStrictEqual(24, U.product([1, 2, 3, 4]));
        });
        it('max', function () {
            assert.deepStrictEqual(8, U.max([5, -2, -Infinity, 8, 2]));
        });
        it('max inf', function () {
            assert.deepStrictEqual(Infinity, U.max([5, -2, Infinity, 8, 2]));
        });
        it('min', function () {
            assert.deepStrictEqual(-2, U.min([5, -2, Infinity, 8, 2]));
        });
        it('min inf', function () {
            assert.deepStrictEqual(-Infinity, U.min([5, -2, -Infinity, 8, 2]));
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
        it('intersection(x, y, z)', function () {
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
