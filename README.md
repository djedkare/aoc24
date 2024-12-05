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
X = await import("./dist/code04.js");
```

in the REPL to import my modules. Mind the `.js` extension - the source files also refer to each other as `.js` now.

I couldn't figure out how to get `tsc` to transpile both a `src` and a `test` dir in the project root though, so now the tests live in the `src` dir too. Could be worse I guess.

I added `.js` to the imports of days 1-3, but maybe I broke something anyways. At least I doubt that the path to `input03.txt` used in `code03.ts` still works.

All this rewriting, just to be able to use a standard unit testing framework, took me over 100 minutes.
