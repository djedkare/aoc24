import * as U from './inputs/input09files.js';
import assert from 'assert';

export const str = U.str;
export const sampleStr = U.sampleStr;

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
        // printLine(output);
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

export const moveFilesHard = (input: (number | '.')[]): (number | '.')[] => {
    const arr = input.slice();
    const find = (len: number, bound: number): number | 'none' => {
        for (let i = 0; i < bound; i++) {
            if (arr[i] !== '.') {
                continue;
            }
            let k = i;
            for (; arr[k] === '.'; k++) {}
            if (k - i >= len) {
                return i;
            }
        }
        return 'none';
    };
    let k = arr.length - 1;
    while (k >= 0) {
        if (arr[k] === '.') {
            k--;
            continue;
        }
        // arr[k] is a number
        let i = k;
        while (arr[i - 1] === arr[k]) {
            i--;
        }
        let len = 1 + k - i;
        let freeLocation = find(len, i);
        if (freeLocation === 'none') {
            return arr;
        }
        // move slice of length len from i to freeLocation
    }

    return arr;
};
