'use strict';

var _FoovarValue = require('./FoovarValue.js');

var _FoovarValue2 = _interopRequireDefault(_FoovarValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertToPlainObject(foovarValue, options) {
  options = Object.assign({
    from: 'value'
  }, options);

  switch (options.from) {
    case 'value':
      return convertToPlainObjectFromValue(foovarValue);
  }
}

function convertToPlainObjectFromValue(foovarValue) {
  if (foovarValue instanceof _FoovarValue2.default) {
    foovarValue = foovarValue();
  }
  if (foovarValue == null || typeof foovarValue === 'string' || typeof foovarValue === 'number') {
    return foovarValue;
  } else if (Array.isArray(foovarValue)) {
    return foovarValue.map(convertToPlainObjectFromValue);
  } else {
    return Object.keys(foovarValue).reduce(function (acc, k) {
      acc[k] = convertToPlainObjectFromValue(foovarValue[k]);
      return acc;
    }, {});
  }
}
module.exports = convertToPlainObject;