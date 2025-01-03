[Advent of Code 2024](https://adventofcode.com/2024)

# Thoughts, Complaints, and Learnings

## Day 1

```
> let x = ['123', '456']
undefined
> x.map(parseInt)
[ 123, NaN ]
> x.map((s) => parseInt(s))
[ 123, 456 ]
```

Turns out that `map` can provide up to 3 arguments to its argument function:

- the array element
- its index
- the entire array

And `parseInt` can deal with multiple arguments: it takes an optional base.

So `['123', '456'].map(parseInt)` becomes `[parseInt('123', 0), parseInt('456', 1)]`.

Both base-0 and base-1 are bogus, but 0 somehow defaults to base-10.

What's the learning here? To always specify the number of args that the argument function to `map` takes?

## Day 4

I still don't really understand the environment with `node`, `tsc`, `ts-node` etc.
For the first 4 days I was using `npx ts-node` for my REPL, and as I understand, the `.ts` files were never
transpiled but interpreted directly.
But then I wanted unit tests, and for some reason, `Mocha` couldn't deal with that setup.
After a lot of wrestling my tools and changing all config files, I have arrived at a new setup:

```
npm run build:watch
```

to automatically run `tsc` on file changes,

```
node
```

for the REPL, and

```javascript
X = await import('./dist/code04.js');
```

in the REPL to import my modules. Mind the `.js` extension - the source files also refer to each other as `.js` now.

I couldn't figure out how to get `tsc` to transpile both a `src` and a `test` dir in the project root though, so now the tests live in the `src` dir too. Could be worse I guess.

I added `.js` to the imports of days 1-3, but maybe I broke something anyways. At least I doubt that the path to `input03.txt` used in `code03.ts` still works.

All this rewriting, just to be able to use a standard unit testing framework, took me over 100 minutes.

## Day 5

This took me 6 hours in total. First, I played around with Mocha for a while (nothing wrong with that), and then, I had two bugs in my solution to the hard problem that didn't show on the sample input:

For the hard problem, I generated a table of transitive predecessors (meaning, if there are constraints `a|b` and `b|c` in the input, `a` must also come before `c` in the page update). But this is not correct: only if `b` is itself included in the update must `a` come before `c`. I went on to use this table in an incorrect sorting function: JavaScript's built-in `sort(compareFn)` function, comparing by wether one page is a transitive predecessor of the other. This is incorrect, I thought (wrongly): if `a` and `b` are not predecessors of one another, that doesn't mean that their ordering in the output doesn't matter, it means that their ordering will be determined through other constraints. Which is bullshit, because that's exactly what the transitive closure of the predecessor table ensures: one lookup to check wether _any_ set of constraints constrains the 2 pages. So I changed it to a handwritten bubblesort implementation to make sure that all constraints would be checked. This sorting function hangs on cycles, so I was finally made aware of them, which finally allowed me to fix my solution. Funnily enough, I actually had a test case verify that my DFS implementation doesn't hang when it encounters a loop, thinking that that wouldn't happen anyways. I should have checked for loops in the problem input.

I used `Map` and `Set` today. Nice data structures that lend themselves to method chaining. Although my `node` didn't have all methods listed on MDN. I'll have to remember to check the availability when looking there.

Also, I learned about iterables today. Hopefully, I'll get more opportunities to use

```javascript
for (const x of someIterable) { ... }
```

in the coming days.

I look forward to day 6 not taking me 6 hours.

## Day 6

Less than 6 hours indeed. Even though types like `[number, number]` in TypeScript look like the tuples of Python, Ocaml, Haskell etc., they're really not. Arrays are objects in JavaScript, and their equality is identity. That bit me twice today:

### Switch Case

```javascript
switch(x) {
    case a:
        ...
}
```

checks `x === a` under the hood. So in a statement like

```javascript
switch(x) {
    case [0, 1]:
        ...
    case [-1, 0]:
        ...
    ...
}
```

with `x: [number, number]`, the switch will check wether `x` has the same adress as any of the case tuples, which is never the case.

### Set (also applies to other data structures)

Similarly, a `Set` of tuples is a set of tuple adresses under the hood, which was not my intended behavior.

### A Solution

If you need to perform an operation on tuples `x` and `y` that checks equality, perform it on `JSON.stringify(x)` and `JSON.stringify(y)` instead, as strings are a builtin type and thus not objects:

```javascript
const s = new Set([]);
const x = [0, 1];
const y = [0, 1];

s.add(JSON.stringify(x));
s.has(JSON.stringify(y)); // true
```

## Day 12

The "`Set` with `JSON.stringify`" trick sucks for more complex data than `[number, number]` as it blinds the type system. For today's hard puzzle I used a set to store values of type `[[number, number], [number, number]]`. When I forgot to add the second tuple to the value and put in `[number, number]`, nothing alerted me to my mistake.

## Day 15

JavaScript's `switch` statement has the same stupid fallthrough default as C's:

```javascript
let b;
switch (s) {
    case 'f':
        b = false;
    case 't':
        b = true;
}
// b is true here whether s is 't' or 'f'
```
