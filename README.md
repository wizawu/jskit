# lightest [![](https://badge.fury.io/js/lightest.svg)](https://www.npmjs.com/package/lightest) [![](https://travis-ci.org/wizawu/lightest.svg)](https://travis-ci.org/wizawu/lightest)

A lite alternative to [Mocha](https://mochajs.org/) in 100 LOC. And it's TypeScript-friendly.

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
