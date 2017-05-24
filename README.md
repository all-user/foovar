<!-- TITLE/ -->

<h1>foovar</h1>

<!-- /TITLE -->


[![CircleCI](https://circleci.com/gh/all-user/foovar/tree/master.svg?style=svg)](https://circleci.com/gh/all-user/foovar/tree/master)
<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/foovar" title="View this project on NPM"><img src="https://img.shields.io/npm/v/foovar.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/foovar" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/foovar.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Refer to Stylus variables in JS

<!-- /DESCRIPTION -->


## Installation

```bash
$ npm i --save foovar
```

## Usage

### in Stylus CLI

```bash
$ stylus -u foovar path/to/src.styl
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

Path resolving is absolute if start with `/`. Otherwise relative from `process.cwd()`.

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

##### `options.compress: boolean`
Compress the exporting file if true.

##### `options.plainObject: boolean | 'value' | 'css' | 'type'`
Export plain object. (but not object literal)

##### `options.propertyCase: 'raw' | 'camel' | 'pascal' | kebab | 'snake' | 'header' | 'constant'`
Set case of property name. Default value is `camel` case.

When you set `raw`, foovar does not change property name.

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

### Convert to plain object

```stylus
foo = 10px 20px 30px 40px
bar = { baz: 1em }

foovar('src/StyleDefinitions.js')
```

You can use `foovar.convertToPlainObject` method as following.

```javascript
const StyleDefinitions = require('./src/StyleDefinitions.js');
const convertToPlainObject = require('foovar/lib/convertToPlainObject');

const obj = convertToPlainObject(StyleDefinitions);

// {
//   foo: [10, 20, 30, 40],
//   bar: {
//     baz: 1
//   }
// }
```

#### `options.from: 'value' | 'css' | 'type'`

Default is `'value'`, other options are `'css'` and `'type'`.

```javascript
const obj = convertToPlainObject(StyleDefinitions, { from: 'css' });

// {
//   foo: ['10px', '20px', '30px', '40px'],
//   bar: {
//     baz: '1em'
//   }
// }
```

```javascript
const obj = convertToPlainObject(StyleDefinitions, { from: 'type' });

// {
//   foo: ['px', 'px', 'px', 'px'],
//   bar: {
//     baz: 'em'
//   }
// }
```


<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/all-user/foovar/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://memowomome.hatenablog.com">Keita Okamoto</a> — <a href="https://github.com/all-user/foovar/commits?author=all-user" title="View the GitHub contributions of Keita Okamoto on repository all-user/foovar">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?



<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://memowomome.hatenablog.com">Keita Okamoto</a> — <a href="https://github.com/all-user/foovar/commits?author=all-user" title="View the GitHub contributions of Keita Okamoto on repository all-user/foovar">view contributions</a></li>
<li><a href="https://github.com/KeitaO">KeitaO</a> — <a href="https://github.com/all-user/foovar/commits?author=KeitaO" title="View the GitHub contributions of KeitaO on repository all-user/foovar">view contributions</a></li></ul>



<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://memowomome.hatenablog.com">Keita Okamoto</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
