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
module.exports = {
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

foovar('src/StyleDefinitions.js')
```

Path resolving is absolute path if path start with `/`. Otherwise relative from `process.cwd()`.

##### `options.include: string`
Export only matched name.
```stylus
foovar('src/StyleDefinitions.js', {
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
foo-bar = 10px

foovar('src/StyleDefinitions.js')
```
It can be used as follows.
```javascript
const vars = require('./src/StyleDefinitions.js');

vars.fooBar(); // 10
vars.fooBar.type // px
vars.fooBar.css // 10px
```

## Examples

|Stylus:`$var-name`| JS:`varName()`| JS:`varName.type`| JS:`varName.css`|
|:----|:---------|:------------|:-----------|
|`'some text'`|`'some text'`|`'string'`|`'some text'`|
|`20px`|`20`|`'px'`|`'20px'`|
|`50%`|`50`|`'%'`|`'50%'`|
|`200ms`|`200`|`'ms'`|`'200ms'`|
|`255`|`255`|`undefined`|`'255'`|
|`auto`|`'auto'`|`'ident'`|`'auto'`|
|`#112233`|`[17,34,51,1]`|`'rgba'`|`'#112233'`|
|`#11223344`|`[17,34,51,0.26666666666666666]`|`'rgba'`|`'#11223344'`|
|`rgba(11,22,33,.4)`|`[11,22,33,0.4]`|`'rgba'`|`'rgba(11,22,33,0.4)'`|
|`hsl(11,22%,33%)`|`[11,22,33,1]`|`'hsla'`|`'hsla(11,22%,33%,1)'`|
|`hsla(11,22%,33%,.4)`|`[11,22,33,0.4]`|`'hsla'`|`'hsla(11,22%,33%,0.4)'`|
|`cubic-bezier(1,0,1,0)`|`[1,0,1,0]`|`'cubic-bezier'`|`'cubic-bezier(1,0,1,0)'`|
|`10px 20px 30px 40px`|`[FoovarValue instance x 4]`|`'tuple'`|`undefined`|
|`1em, 2em, 3em, 4em`|`[FoovarValue instance x 4]`|`'list'`|`undefined`|
|`{ foo: 1em }`|`{ foo: FoovarValue instance }`|`'hash'`|`undefined`|

### Get inner value of `tuple`, `list`, `hash`

```stylus
foo = 10px 20px 30px 40px
bar = { baz: 1em }

foovar('src/StyleDefinitions.js')
```

```javascript
const StyleDefinitions = require('./src/StyleDefinitions.js');

StyleDefinitions.foo()[0]() // 10
StyleDefinitions.foo()[1].type // 'px'
StyleDefinitions.foo()[2].css // '30px'

StyleDefinitions.bar().baz() // 1
StyleDefinitions.bar().baz.type // 'em'
StyleDefinitions.bar().baz.css // '1em'
```
