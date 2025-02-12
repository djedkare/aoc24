import * as Input from './inputs/input14.js';
import * as U from './utils.js';
import assert from 'assert';

export type Robot = { p: U.Coord; v: U.Coord };

export const transformInput = (str: string): Robot[] => {
    const lines = str.split('\n');
    const parse = (s: string): number =>
        s[0] === '-' ? -parseInt(s.slice(1)) : parseInt(s);
    const transform = (s: string): Robot => {
        const numberMatches: string[] = s.match(/-?\d+/g)!;
        const numbers: number[] = numberMatches.map(parse);
        assert.equal(numbers.length, 4);
        return { p: [numbers[0], numbers[1]], v: [numbers[2], numbers[3]] };
    };
    return lines.map(transform);
};

export const sampleInput = transformInput(Input.sampleStr);
export const input = transformInput(Input.str);
export const inputBounds: U.Coord = [101, 103];

export const mod = ([y0, x0]: U.Coord, [y1, x1]: U.Coord): U.Coord => [
    y0 % y1,
    x0 % x1,
];

export const stepRobot = (r: Robot, bounds: U.Coord): Robot => ({
    p: mod(U.add(U.add(r.p, r.v), bounds), bounds), // kinda hacky?
    v: r.v,
});

export const safetyFactor = (robots: Robot[], bounds: U.Coord): number => {
    let topLeft = 0,
        topRight = 0,
        botLeft = 0,
        botRight = 0;
    const middleY = Math.floor(bounds[0] / 2),
        middleX = Math.floor(bounds[1] / 2);
    robots.forEach((r) => {
        const y = r.p[0],
            x = r.p[1];
        if (y < middleY) {
            if (x < middleX) {
                //
                topLeft++;
            } else if (x > middleX) {
                topRight++;
            }
        } else if (y > middleY) {
            if (x < middleX) {
                botLeft++;
            } else if (x > middleX) {
                botRight++;
            }
        }
    });
    return topLeft * topRight * botLeft * botRight;
};

export const simulate = (
    robots: Robot[],
    bounds: U.Coord,
    steps: number
): Robot[] => {
    for (let i = 0; i < steps; i++) {
        robots = robots.map((r) => stepRobot(r, bounds));
    }
    return robots;
};

export const averageDistance = (robots: Robot[]): number => {
    const positions = robots.map((r) => r.p);
    // const f = (acc: U.Coord, cur: U.Coord) => U.add(acc, cur);
    const averagePosition: U.Coord = U.mul(
        positions.reduce((acc: U.Coord, cur: U.Coord) => U.add(acc, cur), [
            0, 0,
        ] as U.Coord),
        [1 / robots.length, 1 / robots.length]
    );

    const averageDistance: number =
        positions.reduce(
            (acc: number, cur: U.Coord) => acc + U.dist(cur, averagePosition),
            0
        ) / robots.length;
    return averageDistance;
};

export const simulateHard = (
    robots: Robot[],
    bounds: U.Coord,
    steps: number
): number[] => {
    const arr: number[] = [];
    for (let i = 0; i < steps; i++) {
        arr.push(averageDistance(robots));
        robots = robots.map((r) => stepRobot(r, bounds));
    }
    return arr;
};

export const resultsHard: number[] = simulateHard(
    input,
    inputBounds,
    inputBounds[0] * inputBounds[1]
);

export const averageHard =
    resultsHard.reduce((acc, cur) => acc + cur, 0) / resultsHard.length;

export const minIndex = (arr: number[]): number =>
    arr.reduce((acc, cur, i) => (cur < arr[acc] ? i : acc), 0);

export const minHard = minIndex(resultsHard);

export const spread = (robots: Robot[]): U.Coord => {
    const yVals: number[] = robots.map((r) => r.p[0]);
    const xVals: number[] = robots.map((r) => r.p[1]);
    return [
        Math.max(...yVals) - Math.min(...yVals),
        Math.max(...xVals) - Math.min(...xVals),
    ];
};

export const iterate = <T>(x: T, f: (arg0: T) => T, n: number): T[] => {
    if (n < 0) {
        return [];
    }
    const arr: T[] = [x];
    for (let i = 0; i < n; i++) {
        x = f(x);
        arr.push(x);
    }
    return arr;
};
