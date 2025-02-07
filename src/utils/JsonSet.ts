export class JsonSet<T> {
    set: Set<string>;
    constructor(iterable?: Iterable<T> | null | undefined) {
        this.set = new Set();
        if (iterable) {
            for (const elem of iterable) {
                this.add(elem);
            }
        }
    }

    add(value: T) {
        this.set.add(JSON.stringify(value));
        return this; // to allow chaining like the native Set
    }

    has(value: T) {
        return this.set.has(JSON.stringify(value));
    }

    delete(value: T) {
        return this.set.delete(JSON.stringify(value));
    }

    clear() {
        this.set.clear();
    }

    size() {
        return this.set.size;
    }

    values(): T[] {
        return Array.from(this.set).map((item) => JSON.parse(item));
    }

    [Symbol.iterator]() {
        return this.values()[Symbol.iterator]();
    }

    forEach(callback: (arg0: T, arg1: T) => void, thisArg?: any) {
        this.values().forEach((value: T) => callback(value, value), thisArg);
        this.set.forEach;
    }
}
