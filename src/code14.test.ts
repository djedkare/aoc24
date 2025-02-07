import assert from 'assert';
import * as X from './code14.js';
import * as U from './utils.js';

describe('Day 14: Bathroom Security Robots', function () {
    describe('Easy', function () {
        it('sample input: safety factor after 100 seconds', function () {
            const robots = X.sampleInput;
            const bounds: U.Coord = [11, 7];
            assert.equal(
                X.safetyFactor(X.simulate(robots, [11, 7], 100), bounds),
                12
            );
        });
    });

    describe('Hard', function () {
        it('dist', function () {
            const robots: X.Robot[] = [
                { p: [0, 0], v: [0, 0] },
                { p: [6, 8], v: [0, 0] },
            ];
            assert.deepStrictEqual(X.averageDistance(robots), 5);
        });
    });
});
