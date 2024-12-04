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
