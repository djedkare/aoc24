import * as Input from './inputs/input06.js';
import * as U from './utils.js';

export const input = Input.str;
export const inputSample = Input.sampleStr;

export const transformInput = (
    str: string
): {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
} => {
    const arr = str.split('\n').map((row) => row.split(''));
    if (arr[arr.length - 1].length === 0) {
        arr.pop();
    }
    let position: [number, number] | undefined;
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] === '^') {
                position = [y, x];
                break;
            }
        }
        if (position) {
            break;
        }
    }
    const direction: [number, number] = [-1, 0];
    let visited = arr.map((row) => U.range(row.length).map((_) => false));
    // visited[position![0]][position![1]] = true;
    const grid = arr.map((row) => row.map((c) => (c === '^' ? '.' : c)));

    return {
        yLength: arr.length,
        xLength: arr[0].length,
        grid: grid,
        visited: visited,
        position: position!,
        direction: direction,
        done: false,
    };
};

export const obj = transformInput(Input.str);
export const sampleObj = transformInput(Input.sampleStr);

// export const isDone = (obj: {
//     yLength: number;
//     xLength: number;
//     grid: string[][];
//     visited: boolean[][];
//     position: [number, number];
//     direction: [number, number];
// }): boolean => {
//     const inRange = (range: number, x: number) => 0 <= x && x < range;
//     return !(
//         inRange(obj.yLength, obj.position[0]) &&
//         inRange(obj.xLength, obj.position[1])
//     );
// };

export const addVectors = (
    [a0, a1]: [number, number],
    [b0, b1]: [number, number]
): [number, number] => [a0 + b0, a1 + b1];

export const vectorIndex = <T>([y, x]: [number, number], arr: T[][]): T =>
    arr[y][x];

export const turnRight = ([y, x]: [number, number]): [number, number] => {
    // switch (direction) {
    //     case [-1, 0]:
    //         return [0, 1];
    //     case [0, 1]:
    //         return [1, 0];
    //     case [1, 0]:
    //         [0, -1];
    //     case [0, -1]:
    //         return [-1, 0];
    // }
    if (y === -1 && x === 0) {
        return [0, 1];
    } else if (y === 0 && x === 1) {
        return [1, 0];
    } else if (y === 1 && x === 0) {
        return [0, -1];
    } else if (y === 0 && x === -1) {
        return [-1, 0];
    } else {
        console.log(`turnRight: invalid direction ${[y, x]}`);
        return [NaN, NaN];
    }
};

// deep copy everything but the grid and the primitives
export const cloneObj = (obj: {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
}): {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
} => {
    const clone = { ...obj };
    clone.visited = structuredClone(clone.visited);
    clone.position = structuredClone(clone.position);
    clone.direction = structuredClone(clone.direction);
    return clone;
};

export const step = (obj: {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
}): {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
} => {
    // const clone = structuredClone(obj);
    const clone = cloneObj(obj);
    clone.visited[clone.position[0]][clone.position[1]] = true;
    const nextPosition = addVectors(clone.position, clone.direction);
    const inRange = (range: number, n: number) => 0 <= n && n < range;
    if (
        !(
            inRange(obj.yLength, nextPosition[0]) &&
            inRange(obj.xLength, nextPosition[1])
        )
    ) {
        clone.done = true;
    } else if (vectorIndex(nextPosition, clone.grid) === '#') {
        clone.direction = turnRight(clone.direction);
    } else {
        clone.position = nextPosition;
    }
    return clone;
};

export const countVisited = (obj: {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
}): number => {
    return U.count((x) => x === true, obj.visited.flat().flat());
};

export const solve = (obj: {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
}): number => {
    while (!obj.done) {
        obj = step(obj);
    }
    return countVisited(obj);
};

export const march = (obj: {
    yLength: number;
    xLength: number;
    grid: string[][];
    visited: boolean[][];
    position: [number, number];
    direction: [number, number];
    done: boolean;
}): number => {
    while (!obj.done) {
        console.log(`Position: ${obj.position}   Direction: ${obj.direction}`);
        obj = step(obj);
    }
    return countVisited(obj);
};

export const solutionEasySample = solve(transformInput(Input.sampleStr));
export const solutionEasyMarch = () => march(transformInput(Input.str));
export const solutionEasy = () => solve(transformInput(Input.str)); // 24 seconds on my machine :/
