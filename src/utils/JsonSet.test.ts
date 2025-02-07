import assert from 'assert';
import { JsonSet } from './JsonSet.js';

describe('JsonSet', function () {
    it('empty set', function () {
        const s = new JsonSet();
        assert.ok(s.size() === 0);
    });

    it('1 .. 5', function () {
        const s = new JsonSet([1, 2, 3, 4, 5]);
        let i = 0;
        for (const elem of s) {
            i += elem;
        }
        assert.deepStrictEqual(i, 15);
    });

    it('equality on objects', function () {
        const s = new JsonSet([[1, 2]]);
        s.delete([1, 2]);
        assert.ok(s.size() === 0);
    });
});
