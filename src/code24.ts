import * as Input from './inputs/input24.js';
import * as U from './utils.js';
import assert from 'assert';

export type op = 'AND' | 'OR' | 'XOR';

export type equation = [string, op, string, string];

export const parseInput = (
    str: string
): [[string, boolean][], equation[], string[]] => {
    const blocks = str.split('\n\n');
    assert.ok(blocks.length === 2);
    const [str0, str1] = blocks;
    const assigns: [string, boolean][] = str0.split('\n').map((line) => {
        const [name, valStr] = line.split(': ');
        const val: boolean = Boolean(parseInt(valStr));
        return [name, val];
    });
    const validateOp = (s: string): op => {
        if (s === 'AND' || s === 'OR' || s === 'XOR') {
            return s;
        } else {
            throw 'Parsing error: ' + s + ' is not a valid op.';
        }
    };
    const eqs: equation[] = str1.split('\n').map((line) => {
        const [var0, opStr, var1, arrow, varOut] = line.split(' ');
        return [var0, validateOp(opStr), var1, varOut];
    });
    const outputs = eqs
        .map((eq) => eq[3])
        .filter((x) => x[0] === 'z')
        .sort();
    return [assigns, eqs, outputs];
};

export const sampleInput = parseInput(Input.sampleStr);
export const input = parseInput(Input.str);

export const insertEq = (
    map: Map<string, [string, op, string]>,
    eq: equation
): void => {
    assert.ok(!map.has(eq[3]));
    map.set(eq[3], [eq[0], eq[1], eq[2]]);
};

export const buildDependencyMap = (
    eqs: equation[]
): Map<string, [string, op, string]> => {
    const map = new Map();
    for (const eq of eqs) {
        insertEq(map, eq);
    }
    return map;
};

export const buildValueMap = (
    assigns: [string, boolean][]
): Map<string, boolean> => {
    const map = new Map();
    for (const [s, b] of assigns) {
        map.set(s, b);
    }
    return map;
};

export const lookupValueMap = (
    valMap: Map<string, boolean>,
    depMap: Map<string, [string, op, string]>,
    var_: string
): boolean => {
    const tmp0 = valMap.get(var_);
    if (tmp0 !== undefined) {
        return tmp0;
    }
    const tmp1 = depMap.get(var_);
    assert.ok(tmp1 !== undefined);
    const [var0, op, var1] = tmp1;
    let result;
    if (op === 'AND') {
        result =
            lookupValueMap(valMap, depMap, var0) &&
            lookupValueMap(valMap, depMap, var1);
    } else if (op === 'OR') {
        result =
            lookupValueMap(valMap, depMap, var0) ||
            lookupValueMap(valMap, depMap, var1);
    } else if (op === 'XOR') {
        //
        result =
            lookupValueMap(valMap, depMap, var0) !==
            lookupValueMap(valMap, depMap, var1);
    } else {
        throw 'bad op';
    }
    return result;
};

export const solveEasy = (
    input: [[string, boolean][], equation[], string[]]
): number => {
    const assigns = input[0],
        eqs = input[1],
        outputs = input[2];
    const depMap = buildDependencyMap(eqs);
    const valMap = buildValueMap(assigns);
    let n = 0;
    for (const output of outputs) {
        if (lookupValueMap(valMap, depMap, output)) {
            const exp = Math.pow(2, parseInt(output.slice(1)));
            n += exp;
        }
    }
    return n;
};
