// var assert = require('assert');
import assert from 'assert';
import * as X from '../src/code04.js';
describe('Day 4', function () {
    describe('Easy', function () {
        it('add', function () {
            assert.deepStrictEqual([11, 22], X.add([10, 20], [1, 2]));
        });

        it('valid', function () {
            assert.ok(X.valid([20, 20]));
        });
    });

    describe('Hard', function () {
        it('sameElems', function () {
            assert.ok(X.sameElems(['S', 'M'], ['M', 'S']));
        });
    });
});
