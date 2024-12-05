import assert from 'assert';
import * as X from './code05.js';
import { sampleStr } from './inputs/input05.js';

describe("Day 5", function () {
    describe("Set functions", function () {
        it("isEmptySet true", function () {
            assert.ok(X.isEmptySet(new Set([])));
        });
        it("isEmptySet false", function () {
            assert.ok(!X.isEmptySet(new Set([3])));
        });
        it("union", function () {
            const set0 = new Set([1, 2, 3]);
            const set1 = new Set([3,4,5]);
            const output = new Set([1,2,3,4,5]);
            assert.deepStrictEqual(X.union(set0, set1), output);
        });
        it("intersection", function () {
            const set0 = new Set([1, 2, 3]);
            const set1 = new Set([3,4,5]);
            const output = new Set([3]);
            assert.deepStrictEqual(X.intersection(set0, set1), output);
        });
    });

    describe("prepareInput", function () {
        it("works with trivial input", function () {
            const str = "2|4\n\n4,2,5";
            assert.deepStrictEqual(X.prepareInput(str),
                {constraints: [[2, 4]], updates: [[4, 2, 5]], pages: new Set([2,4,5])});
        });
        
        it("ignores trailing newline", function () {
            const str = "2|4\n\n4,2,5\n";
            assert.deepStrictEqual(X.prepareInput(str),
                {constraints: [[2, 4]], updates: [[4, 2, 5]], pages: new Set([4,2,5])});
        });
    });

    describe("makePredecessorsMap", function () {
        it("works with trivial input", function () {
            const constraints: [number, number][] = [[2, 4], [5, 4], [10, 12]];
            const output: Map<number, Set<number>> = new Map([
                [12, new Set([10])],
                [4, new Set([2, 5])]
            ]);
            assert.deepStrictEqual(X.makePredecessorMap_(constraints), output);
        });
    });

    describe("validateUpdate", function () {
        it("accepts with empty predecessors", function () {
            const predecessors: Map<number, Set<number>> = new Map([]);
            const update = [4, 2, 5];
            assert.ok(X.validateUpdate(predecessors, update));
        });
        it("accepts with irrelevant predecessors", function () {
            const predecessors: Map<number, Set<number>> = new Map([
                [10, new Set([12])],
                [-3, new Set([10, 22])]
            ]);
            const update = [4, 2, 5];
            assert.ok(X.validateUpdate(predecessors, update));
        });
        it("accepts with relevant predecessors", function() {
            const predecessors: Map<number, Set<number>> = new Map([
                [5, new Set([4, 2])],
                [4, new Set([2])]
            ]);
            const update = [2, 4, 5];
            assert.ok(X.validateUpdate(predecessors, update));
        });
        it("rejects on conflict", function() {
            const predecessors: Map<number, Set<number>> = new Map([
                [5, new Set([4, 2])],
                [4, new Set([2])],
                [2, new Set([6])]
            ]);
            const update = [2, 4, 5, 6];
            assert.ok(!X.validateUpdate(predecessors, update));
        });
    });

    describe("middleElement", function () {
        it("works for length 3", function () {
            assert.deepStrictEqual(X.middleElement([2,3,4]), 3);
        });
    });

    describe("solve", function () {
        it("solves the sample input", function () {
            assert.deepStrictEqual(X.solution0sample, 143);
        });
    });

    describe("transitivePredecessors", function() {
        it("works with no predecessors", function () {
            assert.deepStrictEqual(X.transitivePredecessors(new Map(), 3), new Set());
        });
        it("works with a chain", function () {
            const map = new Map([
                [4, new Set([3])],
                [3, new Set([2])],
                [2, new Set([1])],
                [1, new Set([0])]
            ]);
            assert.deepStrictEqual(X.transitivePredecessors(map, 3), new Set([2, 1, 0]));
        });
        it("doesn't hang on a loop (unnecessary but still cool)", function () {
            const map = new Map([
                [1, new Set([2])],
                [2, new Set([1])]
            ]);
            assert.deepStrictEqual(X.transitivePredecessors(map, 1), new Set([2, 1]));
        });
        it("works with a branching and rejoining graph", function () {
            const map = new Map([
                [5, new Set([4])],
                [4, new Set([3, 2])],
                [3, new Set([1])],
                [2, new Set([1])],
                [1, new Set([] as number[])]
            ]);
            assert.deepStrictEqual(X.transitivePredecessors(map, 4), new Set([3, 2, 1]));
        });
    });

    describe("transitivePredecessorMap", function() {
        it("works with no predecessors", function () {
            assert.deepStrictEqual(X.transitivePredecessorMap(new Map()), new Map());
        });
        it("works with a chain", function () {
            const input = new Map([
                [4, new Set([3])],
                [3, new Set([2])],
                [2, new Set([1])],
                [1, new Set([0])]
            ]);
            const output = new Map([
                [4, new Set([3, 2, 1, 0])],
                [3, new Set([2, 1, 0])],
                [2, new Set([1, 0])],
                [1, new Set([0])]
            ]);
            assert.deepStrictEqual(X.transitivePredecessorMap(input), output);
        });
        it("doesn't hang on a loop (unnecessary but still cool)", function () {
            const input = new Map([
                [1, new Set([2])],
                [2, new Set([1])]
            ]);
            const output = new Map([
                [1, new Set([2, 1])],
                [2, new Set([1, 2])]
            ]);
            assert.deepStrictEqual(X.transitivePredecessorMap(input), output);
        });
        it("works with a branching and rejoining graph", function () {
            const input = new Map([
                [5, new Set([4])],
                [4, new Set([3, 2])],
                [3, new Set([1])],
                [2, new Set([1])],
                [1, new Set([] as number[])]
            ]);
            const output = new Map([
                [5, new Set([4, 3, 2, 1])],
                [4, new Set([3, 2, 1])],
                [3, new Set([1])],
                [2, new Set([1])],
                [1, new Set([] as number[])]
            ]);
            assert.deepStrictEqual(X.transitivePredecessorMap(input), output);
        });
    });

    describe("topologicalSort", function () {
        let obj = X.prepareInput(sampleStr);
        let transPredMap = X.transitivePredecessorMap(X.makePredecessorMap_(obj.constraints));

        it("works on sample input [75,97,47,61,53]", function () {
            assert.deepStrictEqual(X.topologicalSort(transPredMap, [75,97,47,61,53]), [97,75,47,61,53]);
        });
        it("works on sample input 61,13,29", function () {
            assert.deepStrictEqual(X.topologicalSort(transPredMap, [61,13,29]), [61,29,13]);
        });
        it("works on sample input [97,13,75,29,47]", function () {
            assert.deepStrictEqual(X.topologicalSort(transPredMap, [97,13,75,29,47]), [97,75,47,29,13]);
        });
    });

    describe("solveHard", function () {
        it("solves the sample input", function () {
            assert.deepStrictEqual(X.solution1sample, 123);
        });
    });
});