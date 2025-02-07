import * as U from './utils.js';
import * as X from './code15hard.js';
import assert from 'assert';

const singleRow = (s: string) => [s.split('')];
const toSingleRow = (st: X.State) => st.grid[0].join('');
const multiRow = (ss: string[]) => ss.map((s) => s.split(''));
const toMultiRow = (st: X.State) => st.grid.map((arr) => arr.join(''));

describe('Day 15 Hard', function () {
    // tryMoveLeft
    // -----------

    it('tryMoveLeft: facing .', function () {
        const input: X.State = {
            grid: singleRow('[][]..'),
            pos: [0, 5],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow('[][]..'),
            pos: [0, 4],
            moves: [],
        };
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing #', function () {
        const input: X.State = {
            grid: singleRow('[][]#.'),
            pos: [0, 5],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow('[][]#.'),
            pos: [0, 5],
            moves: [],
        };
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing the edge', function () {
        const input: X.State = {
            grid: singleRow('......'),
            pos: [0, 0],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow('......'),
            pos: [0, 0],
            moves: [],
        };
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing immovable box', function () {
        const str = '[]....';
        const input: X.State = {
            grid: singleRow(str),
            pos: [0, 2],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow(str),
            pos: [0, 2],
            moves: [],
        };
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing immovable box', function () {
        const str = '#[]....';
        const input: X.State = {
            grid: singleRow(str),
            pos: [0, 3],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow(str),
            pos: [0, 3],
            moves: [],
        };
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing immovable boxes', function () {
        const str = '#[][][]....';
        const input: X.State = {
            grid: singleRow(str),
            pos: [0, 7],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow(str),
            pos: [0, 7],
            moves: [],
        };
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing two movable boxes', function () {
        const input: X.State = {
            grid: singleRow('#.[][].'),
            pos: [0, 6],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow('#[][]..'),
            pos: [0, 5],
            moves: [],
        };
        assert.deepStrictEqual(toSingleRow(input), toSingleRow(output));
        assert.deepStrictEqual(input, output);
    });
    it('tryMoveLeft: facing one movable box', function () {
        const input: X.State = {
            grid: singleRow('#.[].'),
            pos: [0, 4],
            moves: [],
        };
        X.tryMoveLeft(input);
        const output: X.State = {
            grid: singleRow('#[]..'),
            pos: [0, 3],
            moves: [],
        };
        assert.deepStrictEqual(toSingleRow(input), toSingleRow(output));
        assert.deepStrictEqual(input, output);
    });

    // tryMoveRight
    // ------------

    it('tryMoveRight: facing .', function () {
        const str = '..[][]';
        const actual: X.State = {
            grid: singleRow(str),
            pos: [0, 0],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow(str),
            pos: [0, 1],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveRight: facing #', function () {
        const str = '.#[][]';
        const actual: X.State = {
            grid: singleRow(str),
            pos: [0, 0],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow(str),
            pos: [0, 0],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveRight: facing the edge', function () {
        const str = '..[][].';
        const actual: X.State = {
            grid: singleRow(str),
            pos: [0, 6],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow(str),
            pos: [0, 6],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveRight: facing one immovable box', function () {
        const str = '..[]';
        const actual: X.State = {
            grid: singleRow(str),
            pos: [0, 1],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow(str),
            pos: [0, 1],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveRight: facing two immovable boxes', function () {
        const str = '..[][]#';
        const actual: X.State = {
            grid: singleRow(str),
            pos: [0, 1],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow(str),
            pos: [0, 1],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveRight: facing one movable box', function () {
        // const str = '..[].';
        const actual: X.State = {
            grid: singleRow('..[].'),
            pos: [0, 1],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow('...[]'),
            pos: [0, 2],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveRight: facing two movable boxes', function () {
        // const str = '..[][]';
        const actual: X.State = {
            grid: singleRow('..[][].'),
            pos: [0, 1],
            moves: [],
        };
        X.tryMoveRight(actual);
        const expected: X.State = {
            grid: singleRow('...[][]'),
            pos: [0, 2],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });

    // tryMoveVertically
    // -----------------

    it('tryMoveVertically: facing #', function () {
        const grid = multiRow(['.#.', '...']);
        const actual: X.State = { grid: grid, pos: [1, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [1, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing [', function () {
        const grid = multiRow(['.[]', '...']);
        const actual: X.State = { grid: grid, pos: [1, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [1, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing ]', function () {
        const grid = multiRow(['[].', '...']);
        const actual: X.State = { grid: grid, pos: [1, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [1, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing .', function () {
        const grid = multiRow(['...', '...']);
        const actual: X.State = { grid: grid, pos: [1, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [0, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing the edge', function () {
        const grid = multiRow(['...', '...']);
        const actual: X.State = { grid: grid, pos: [0, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [0, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing immovable box: left', function () {
        const grid = multiRow(['#..', '[].', '...']);
        const actual: X.State = { grid: grid, pos: [2, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [2, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing immovable box: right', function () {
        const grid = multiRow(['.#.', '[].', '...']);
        const actual: X.State = { grid: grid, pos: [2, 1], moves: [] };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = { grid: grid, pos: [2, 1], moves: [] };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing movable [', function () {
        // const grid = multiRow(['...', '.[]', '...']);
        const actual: X.State = {
            grid: multiRow(['...', '.[]', '...']),
            pos: [2, 1],
            moves: [],
        };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = {
            grid: multiRow(['.[]', '...', '...']),
            pos: [1, 1],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing movable ]', function () {
        // const grid = multiRow(['...', '[].', '...']);
        const actual: X.State = {
            grid: multiRow(['...', '[].', '...']),
            pos: [2, 1],
            moves: [],
        };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = {
            grid: multiRow(['[].', '...', '...']),
            pos: [1, 1],
            moves: [],
        };
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing multiple movable boxes', function () {
        const gridActual = multiRow([
            '....', //
            '.[].', //
            '[][]', //
            '.[].', //
            '....', //
        ]);
        const gridExpected = multiRow([
            '.[].', //
            '[][]', //
            '.[].', //
            '....', //
            '....', //
        ]);
        const actual: X.State = {
            grid: gridActual,
            pos: [4, 1],
            moves: [],
        };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = {
            grid: gridExpected,
            pos: [3, 1],
            moves: [],
        };
        assert.deepStrictEqual(toMultiRow(actual), toMultiRow(expected));
        assert.deepStrictEqual(actual, expected);
    });
    it('tryMoveVertically: facing multiple immovable boxes', function () {
        const grid = multiRow([
            '....', //
            '#[].', //
            '[][]', //
            '.[].', //
            '....', //
        ]);
        const actual: X.State = {
            grid: grid,
            pos: [4, 1],
            moves: [],
        };
        X.tryMoveVertically(actual, -1);
        const expected: X.State = {
            grid: grid,
            pos: [4, 1],
            moves: [],
        };
        assert.deepStrictEqual(toMultiRow(actual), toMultiRow(expected));
        assert.deepStrictEqual(actual, expected);
    });
});
