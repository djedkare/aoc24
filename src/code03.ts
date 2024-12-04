// bug: if the input string starts with, e.g., "(10,10)",
// solution0 would be 100 too large
import * as fs from 'fs'

export const str: string = ('' + fs.readFileSync('./src/inputs/input03.txt'));

export const arr: string[] = str.split('mul');

function isDigit(s: string) {
    return /^[0-9]$/.test(s);
}

export const getMulResult = (str: string): number => {
    if(str[0] != '(') {
        return 0;
    }
    let n0_start = 1;
    let n0_end = -1;
    let n1_start = -1;
    let n1_end = -1;
    let state = 'n0';
    let i=1;
    while(isDigit(str[i])) { i++; }
    if(i === 1) { return 0; }
    if(i > 4) { return 0; } // necessary?
    n0_end = i;
    if(str[i] !== ',') { return 0; }
    i++;
    n1_start = i;
    while(isDigit(str[i])) { i++; }
    if(i === n1_start) { return 0; }
    n1_end = i;
    if(str[i] !== ')') { return 0; }
    return parseInt(str.slice(n0_start, n0_end)) *
        parseInt(str.slice(n1_start, n1_end));

}

export const solution0: number = arr.reduce((acc, cur) => acc + getMulResult(cur), 0);


export const parseString = (target: string) => (str:string) => {
    if(str.startsWith(target)) {
        return str.slice(target.length);
    } else {
        return false;
    }
}

export const parseDo = (str: string): string | false => parseString("do()")(str);

export const parseDont = (str: string): string | false => parseString("don't()")(str);

export const parseNumber = (str: string): [string, number] | false => {
    let i = 0;
    while(isDigit(str[i])) { i++ }
    const n = parseInt(str.slice(0, i));
    return n>0 ? [str.slice(i), n] : false;
}

export const parseMul = (str_: string): [string, number] | false => {
    let n0, n1;
    let str: string | false = str_;

    str = parseString("mul(")(str);
    if(str === false) { return false; }

    let tmp = parseNumber(str);
    if(tmp === false) {
        return false;
    } else {
        [str, n0] = tmp;
    }

    str = parseString(",")(str);
    if(str === false) { return false; }

    tmp = parseNumber(str);
    if(tmp === false) {
        return false;
    } else {
        [str, n1] = tmp;
    }

    str = parseString(")")(str);
    if(str === false) { return false; }

    return [str, n0*n1];
}

export const parse = (str: string): number => {
    let n = 0;
    let flag = true;
    while(str.length > 0) {
        let tmp;
        tmp = parseDo(str);
        if(tmp !== false) {
            flag = true;
            str = tmp;
            continue;
        }

        tmp = parseDont(str);
        if(tmp !== false) {
            flag = false;
            str = tmp;
            continue;
        }

        tmp = parseMul(str);
        if(tmp !== false) {
            if(flag) { n += tmp[1]; }
            str = tmp[0];
            continue;
        }

        str = str.slice(1);
    }
    return n;
}

export const solution1 = parse(str);