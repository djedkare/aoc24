import assert from 'assert';
import * as Input from './inputs/input05.js';
import * as U from './utils.js';

export const isEmptySet = <T>(set: Set<T>): boolean => {
    for(const _ of set) { return false;}
    return true;
}

export const union = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
    const outputSet: Set<T> = new Set([]);
    set1.forEach((x) => outputSet.add(x));
    set2.forEach((x) => outputSet.add(x));
    return outputSet;
}

export const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
    const outputSet: Set<T> = new Set([]);
    set1.forEach((x) => set2.has(x) ? outputSet.add(x) : false);
    return outputSet;
}

export const prepareInput = (s: string): {constraints: [number, number][], updates: number[][], pages: Set<number>} => {
    const arr_ = s.split('\n');
    const arr = arr_[arr_.length-1] === "" ? arr_.slice(0, arr_.length-1) : arr_;
    const splitPoint = arr.indexOf("");
    const constraints: [number, number][] = arr.slice(0, splitPoint).map(
        (row) => row.split("|").map((n) => parseInt(n)) as [number, number]
    );
    const updates: number[][] = arr.slice(splitPoint+1).map(
        (row) => row.split(",").map((n) => parseInt(n))
    );
    const constraintPages = new Set(constraints.flat());
    const allPages: Set<number> = union(
        new Set(constraints.flat()),
        new Set(updates.flat())
    );
    return {constraints: constraints, updates: updates, pages: allPages};
}

export const makePredecessorMap_ = (constraints: [number, number][]): Map<number, Set<number>> => {
    const m = new Map() as Map<number, Set<number>>;
    const insert = (pred: number, succ: number) => {
        const entry = m.get(succ);
        if(entry) {entry.add(pred)} else {m.set(succ, new Set([pred]))}
    };
    constraints.forEach(([pred, succ]) => insert(pred, succ));
    return m;
}

export const makePredecessorMap = (obj: {constraints: [number, number][], updates: number[][], pages: Set<number>}): Map<number, Set<number>> => {
    const map = makePredecessorMap_(obj.constraints);
    obj.pages.forEach((page) => !map.has(page) ? map.set(page, new Set([])) : false);
    return map;
}

export const isPredecessorOf = (predecessors: Map<number, Set<number>>, pred: number, succ: number) => {
    const tmp = predecessors.get(succ);
    if(tmp) {
        return tmp.has(pred);
    } else {
        return false;
    }
}

export const validateUpdate = (predecessors: Map<number, Set<number>>, update: number[]) => {
    return update.every(
        (page, i) => update.slice(i+1).every(
            (page_) => !isPredecessorOf(predecessors, page_, page)
        )
    );
}

export const middleElement = <T>(l: T[]): T | typeof NaN => l.length % 2 === 1 ? l[Math.floor(l.length / 2)] : NaN;

export const solve = (str: string): number => {
    const obj = prepareInput(str);
    let n = 0;
    let m = makePredecessorMap(obj);
    obj.updates.forEach((upd) => validateUpdate(m, upd) ? n += middleElement(upd) : false);
    return n;
}

export const solution0sample = solve(Input.sampleStr);
export const solution0 = solve(Input.str);

export const transitivePredecessors_ = (predecessors: Map<number, Set<number>>, succ: number, set: Set<number>): void => {
    const preds = predecessors.get(succ);
    if(!preds) { return; }
    preds.forEach(element => {
        if(!set.has(element)) {
            set.add(element);
            transitivePredecessors_(predecessors, element, set);
        }
    });
}

export const transitivePredecessors = (predecessors: Map<number, Set<number>>, succ: number): Set<number> => {
    const set: Set<number> = new Set();
    transitivePredecessors_(predecessors, succ, set);
    return set;
}

export const transitivePredecessorMap = (predecessors: Map<number, Set<number>>): Map<number, Set<number>> => {
    const map: Map<number, Set<number>> = new Map();
    for(const key of predecessors.keys()) {
        map.set(key, transitivePredecessors(predecessors, key));
    }
    return map;
}

// correct
export const topologicalSort = (transPredMap: Map<number, Set<number>>, list_: number[]): number[] => {
    const list = list_.slice();
    let isPredOf = (a: number, b: number) => isPredecessorOf(transPredMap, a, b);
    list.sort((a, b) => isPredOf(a, b) ? -1 : isPredOf(b, a) ? 1 : 0);
    return list;
}

// buggy
export const bubbleSort = (transPredMap: Map<number, Set<number>>, inputArr: number[]): number[] => {
    const unsortedElems: Set<number> = new Set(inputArr);
    if(Array.from(unsortedElems.values()).length !== inputArr.length) {
        assert.deepStrictEqual(Array.from(unsortedElems.values()), inputArr);
    }
    const sortedArr: number[] = [];
    while(sortedArr.length < inputArr.length) {
        const addedNext: number[] = [];
        unsortedElems.forEach(
            (n) => {
                if(isEmptySet(intersection(transPredMap.get(n)!, unsortedElems))) { addedNext.push(n) }
            }
        );
        if(addedNext.length === 0) {
            console.log`addedNext.length === 0:   ${sortedArr}, ${inputArr}`;
            throw "";
        }
        addedNext.forEach((n) => {sortedArr.push(n); unsortedElems.delete(n)});
    }
    return sortedArr;
}

export const solveHard = (str: string): number => {
    const obj = prepareInput(str);
    let n = 0;
    let predMap = makePredecessorMap(obj);
    // obj.updates.forEach((upd) => !validateUpdate(predMap, upd) ?
    //     n += middleElement(bubbleSort(transPredMap, upd)) :
    //     false);
    obj.updates.forEach((upd) => {
        if(!validateUpdate(predMap, upd)) {
            const mapSlice = new Map();
            upd.forEach((n) => {
                mapSlice.set(n, predMap.get(n))
            });
            const transPredMap = transitivePredecessorMap(mapSlice);
            n += middleElement(topologicalSort(transPredMap, upd));
        }
    });
    return n;
}

export const solution1sample = solveHard(Input.sampleStr);
export const solution1 = solveHard(Input.str);