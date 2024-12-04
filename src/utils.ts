export function range(n: number) {
    return Array.from({length: n}, (_, i) => i);
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
    arr.forEach((x) => f(x) ? acc++ : 0);
    return acc;
}