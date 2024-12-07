import * as Input from './inputs/input07.js';
import * as U from './utils.js';
import assert from 'assert';

export const inputStr = Input.str;
export const inputSampleStr = Input.sampleStr;

export const transformInput = (str: string): [number, number[]][] => {
    if (str[str.length - 1] == '\n') {
        str = str.slice(0, str.length - 1);
    }
    const lines = str.split('\n');
    return lines.map((line) => {
        const pair = line.split(': ');
        assert.deepStrictEqual(2, pair.length);
        const testValue: number = parseInt(pair[0]);
        const numbers: number[] = pair[1]
            .split(' ')
            .map((s) => parseInt(s, 10));
        return [testValue, numbers];
    });
};

export const maxNumbers = Math.max(
    ...transformInput(inputStr).map(
        (line: [number, number[]]): number => line[1].length
    )
); // 12!

export const sat_ = (
    [testValue, numbers]: [number, number[]],
    i: number
): boolean => {
    if (!Number.isInteger(testValue)) {
        return false;
    }
    if (i < 0) {
        return testValue == 0;
    }
    if (testValue <= 0) {
        return false;
    }
    return (
        sat_([testValue - numbers[i], numbers], i - 1) ||
        sat_([testValue / numbers[i], numbers], i - 1)
    );
};

export const sat = ([testValue, numbers]: [number, number[]]): boolean =>
    sat_([testValue, numbers], numbers.length - 1);

const sum = (numbers: number[]) =>
    numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

export const solve_ = (arr: [number, number[]][]): number =>
    sum(arr.filter(sat).map((line) => line[0]));

export const solve = (str: string): number => solve_(transformInput(str));

export const solutionEasy = solve(inputStr);

export const digits = (x: number): number => ('' + x).length;
export const inverseConcatDigits = (a: number, b: number): number =>
    (a - b) / Math.pow(10, digits(b));

export const satHard_ = (
    [testValue, numbers]: [number, number[]],
    i: number
): boolean => {
    if (!Number.isInteger(testValue)) {
        return false;
    }
    if (i < 0) {
        return testValue == 0;
    }
    if (testValue <= 0) {
        return false;
    }
    return (
        satHard_([testValue - numbers[i], numbers], i - 1) ||
        satHard_([testValue / numbers[i], numbers], i - 1) ||
        satHard_([inverseConcatDigits(testValue, numbers[i]), numbers], i - 1)
    );
};

export const satHard = ([testValue, numbers]: [number, number[]]): boolean =>
    satHard_([testValue, numbers], numbers.length - 1);

export const solveHard_ = (arr: [number, number[]][]): number =>
    sum(arr.filter(satHard).map((line) => line[0]));

export const solveHard = (str: string): number =>
    solveHard_(transformInput(str));
