# foovar

[![CircleCI](https://circleci.com/gh/all-user/foovar/tree/master.svg?style=svg)](https://circleci.com/gh/all-user/foovar/tree/master)

Refer to Stylus variables in JS.

## Installation

```bash
$ npm i --save-dev foovar
```

## Usage

### in Stylus CLI

```bash
$ stylus -u foovar path/to/source.styl
```

### in webpack with stylus-loader

`webpack.config.js`
```javascript
{
  stylus: {
    use: [require('foovar')()]
  }
}
```

### Export Variables

#### `foovar(path: string, options: hash)`

Generate variables file.

`vars.styl`
```stylus
foo = 10px
bar = 'some text'
foovar('src/StyleVariables.js')
```

Path resolving is absolute path if path start with `/`. Otherwise relative from `process.cwd()`.

##### `options.include: string`
Export only matched name.
```stylus
foovar('src/StyleVariables.js', {
  include: '^\$foo\-' // start with `$foo-`
})
```

##### `options.exclude: string`
Export only unmatched name.

##### `options.noGeneratedLog: boolean`
Don't display message to console if true.

### Import variables
If you export as follows,
```stylus
foo = 10px
foovar('src/StyleVariables.js')
```
It can be used as follows.
```javascript
const vars = require('./src/StyleVariables.js');

vars.foo(); // 10
vars.foo.type // px
vars.foo.css // 10px
```
