//   Array
//   =====

export function range(lower: number, upper?: number) {
    if(upper === undefined) { upper = lower; lower = 0; }
    return Array.from({length: upper - lower}, (_, i) => i+lower);
}

export const zip = <T, U>(a: T[], b: U[]): [T, U][] => {
    let len = Math.min(a.length, b.length);
    let arr: [T, U][] = [];
    for(let i=0; i<len; i++) {
        arr.push([a[i], b[i]]);
    }
    return arr;
}

export const zipWith = <T, U, V>(f: (arg0: T, arg1: U) => V, a: T[], b: U[]): V[] => {
    let len = Math.min(a.length, b.length);
    let arr: V[] = [];
    for(let i=0; i<len; i++) {
        arr.push(f(a[i], b[i]));
    }
    return arr;
}

export const count = <T>(f: (arg0: T) => boolean, arr: T[]): number => {
    let acc = 0;
    for(const x of arr) { if(f(x)) { acc++; } }
    return acc;
}

//   Set
//   ===

declare global {
    interface Set<T> {
        empty(): boolean;
    }
}

Set.prototype.empty = function (): boolean {
    return this.size === 0;
}

export const union = <T>(...args: Set<T>[]): Set<T> => {
    const outputSet: Set<T> = new Set([]);
    for(const set of args) {
        for(const x of set) { outputSet.add(x); }
    }
    return outputSet;
}

export const intersection = <T>(set0: Set<T>, ...sets: Set<T>[]): Set<T> => {
    const outputSet: Set<T> = new Set(set0);
    // for(const x of set0) { if(set1.has(x)) { outputSet.add(x); } }
    for(const set of sets) {
        const itemsToDelete = []
        for(const elem of outputSet) {
            if(!set.has(elem)) {itemsToDelete.push(elem)}
        }
        for(const elem of itemsToDelete) { outputSet.delete(elem); }
    }
    return outputSet;
}