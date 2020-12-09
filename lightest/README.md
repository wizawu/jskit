# lightest [![](https://badge.fury.io/js/lightest.svg)](https://www.npmjs.com/package/lightest)

A lite alternative to [Mocha](https://mochajs.org/) in 100 LOC.

### Installation

```
npm install lightest
```

### Usage

Check out the [example](https://github.com/wizawu/lightest/blob/main/test/test_index.js).

```bash
$ node test/test_index.js


  Suite A
    1) add
    ✓ minus (0ms)

  Suite B
    ✓ multiply (0ms)
    2) divide


  2 passing (0ms)
  2 failing

  1) Suite A add:

    2 deepStrictEqual 1

  2) Suite B divide:

    Infinity deepStrictEqual 1


```
