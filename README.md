# object-path-cli [![](https://badge.fury.io/js/object-path-cli.svg)](https://www.npmjs.com/package/object-path-cli)

### Installation

```
npm install -g object-path-cli
```

### Usage

```
cat some.json | object-path-cli <path> [convertor]
```

### Example

```
cat package.json | object-path-cli version
cat package.json | object-path-cli version parseInt
cat package.json | object-path-cli bin toUpperCase
cat package.json | object-path-cli bin 'substr(2)'
```
