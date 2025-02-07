// import { type } from 'os';
import * as Input from './inputs/input09files.js';
import * as U from './utils.js';

export const str = Input.str;
export const sampleStr = Input.sampleStr;

export const transformInput = (str: string): (number | '.')[] => {
    if (str[str.length - 1] === '\n') {
        str = str.slice(0, str.length - 1);
    }

    const arr0 = str.split('').map((c) => parseInt(c));
    let addFile = true;
    let id = 0;
    const output: (number | '.')[] = [];
    for (const n of arr0) {
        let elem: number | '.' = '.';
        if (addFile) {
            elem = id;
            id++;
        }
        for (let i = 0; i < n; i++) {
            output.push(elem);
        }
        addFile = !addFile;
    }
    return output;
};

export const moveFiles = (input: (number | '.')[]): (number | '.')[] => {
    const output: (number | '.')[] = Array(input.length).fill('.');
    let left = 0;
    let right = input.length - 1;
    while (left <= right) {
        if (input[left] !== '.') {
            output[left] = input[left];
            left++;
        } else if (input[right] === '.') {
            right--;
        } else {
            output[left] = input[right];
            left++;
            right--;
        }
    }
    return output;
};

export const checksum = (arr: (number | '.')[]): number => {
    let n = 0;
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i];
        if (x !== '.') {
            n += i * x;
        }
    }
    return n;
};

export const solveEasy = (str: string): number =>
    checksum(moveFiles(transformInput(str)));

export const printLine = (arr: (number | '.')[]): void => {
    const str = arr.reduce((acc, cur) => acc + cur, '');
    console.log(str);
};

// Hard
// ====

export type Thing =
    | { t: 'File'; id: number; length: number }
    | { t: 'Gap'; length: number };
export type File = { t: 'File'; id: number; length: number };
export type Gap = { t: 'Gap'; length: number };

export const printLineHard = (arr: Thing[]): string => {
    let thingToStr = (thing: Thing) =>
        Array(thing.length)
            .fill(thing.t === 'File' ? '' + thing.id : '.')
            .join('');
    return arr.reduce((acc, cur) => acc + thingToStr(cur), '');
};

export const transformInputHard = (str: string): Thing[] => {
    if (str[str.length - 1] === '\n') {
        str = str.slice(0, str.length - 1);
    }
    const numbers = str.split('').map((c) => parseInt(c));
    let addFile = true;
    let id = 0;
    const output: Thing[] = [];

    for (const n of numbers) {
        if (addFile) {
            output.push({ t: 'File', id: id, length: n });
            id += 1;
        } else {
            output.push({ t: 'Gap', length: n });
        }
        addFile = !addFile;
    }
    return output;
};

export const inputHard = transformInputHard(str);

export const deleteFileFromArray = (things: Thing[], i: number): void => {
    let thing = things[i],
        l = things[i].length;
    if (thing.t !== 'File') {
        throw 'deleteFileFromArray: not a file';
    }
    things.splice(i, 1, { t: 'Gap', length: l });
    if (things.length > i + 1 && things[i + 1].t === 'Gap') {
        things[i].length += things[i + 1].length;
        things.splice(i + 1, 1);
    }
    if (things[i - 1].t === 'Gap') {
        things[i - 1].length += things[i].length;
        things.splice(i, 1);
    }
};

export const insertIntoGap = (
    things: Thing[],
    i: number,
    thing: Thing
): void => {
    if (things[i].t === 'File') {
        throw 'insertIntoGap: things[i] not a gap';
    } else {
        if (things[i].length < thing.length) {
            throw 'insertIntoGap: gap too small';
        } else if (things[i].length === thing.length) {
            things[i] = thing;
        } else {
            things[i].length -= thing.length;
            things.splice(i, 0, thing);
        }
    }
};

export const moveFilesHard = (things_: Thing[], log = false): Thing[] => {
    let things: Thing[] = structuredClone(things_);
    let lengths: Map<number, number> = new Map();
    var maxId = -1;
    for (let thing of things) {
        if (thing.t === 'File') {
            lengths.set(thing.id, thing.length);
            maxId = thing.id;
        }
    }

    if (log) {
        console.log(printLineHard(things));
    }
    var id = maxId;
    while (id >= 0) {
        if (log) {
            console.log(`id ${id}: `);
        }
        for (let i of U.range(things.length)) {
            let thing = things[i];
            if (thing.t === 'Gap' && thing.length >= lengths.get(id)!) {
                if (log) {
                    console.log(`gap at index ${i}`);
                }
                var oldIndex = -1;
                for (let k of U.range(things.length)) {
                    if (things[k].t === 'File' && things[k].id === id) {
                        oldIndex = k;
                    }
                }
                let file: Thing = things[oldIndex];
                deleteFileFromArray(things, oldIndex);
                insertIntoGap(things, i, file);
                break;
            } else if (thing.t === 'File' && thing.id === id) {
                if (log) {
                    console.log(`no gap found`);
                }
                break;
            }
        }
        id -= 1;
        if (log) {
            console.log(printLineHard(things));
        }
    }
    return things;
};

export const checksumHard = (things: Thing[]): number => {
    var i = 0;
    var total = 0;
    for (let thing of things) {
        if (thing.t === 'File') {
            for (let k of U.range(thing.length)) total += (i + k) * thing.id;
        }
        i += thing.length;
    }
    return total;
};

export const solveHard = (things: Thing[]): number =>
    checksumHard(moveFilesHard(things));
export const solutionHard = () => solveHard(transformInputHard(str));
export const sampleSolutionHard = () =>
    moveFilesHard(transformInputHard(sampleStr));
