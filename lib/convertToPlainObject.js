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
    case 'css':
      return convertToPlainObjectFromCss(foovarValue);
    case 'type':
      return convertToPlainObjectFromType(foovarValue);
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

function convertToPlainObjectFromCss(foovarValue) {
  if (foovarValue instanceof _FoovarValue2.default) {
    var foovarCss = foovarValue.css;
    var foovarType = foovarValue.type;
    foovarValue = foovarValue();
    if (foovarValue == null) {
      return foovarValue;
    } else if (foovarType === 'tuple' || foovarType === 'list' || foovarType === 'hash') {
      return convertToPlainObjectFromCss(foovarValue);
    } else {
      return foovarCss;
    }
  } else {
    if (foovarValue == null || typeof foovarValue === 'string' || typeof foovarValue === 'number') {
      return foovarValue;
    } else if (Array.isArray(foovarValue)) {
      return foovarValue.map(convertToPlainObjectFromCss);
    } else {
      return Object.keys(foovarValue).reduce(function (acc, k) {
        acc[k] = convertToPlainObjectFromCss(foovarValue[k]);
        return acc;
      }, {});
    }
  }
}

function convertToPlainObjectFromType(foovarValue) {
  if (foovarValue instanceof _FoovarValue2.default) {
    var foovarType = foovarValue.type;
    foovarValue = foovarValue();
    if (foovarValue == null) {
      return foovarValue;
    } else if (foovarType === 'tuple' || foovarType === 'list' || foovarType === 'hash') {
      return convertToPlainObjectFromType(foovarValue);
    } else {
      return foovarType;
    }
  } else {
    if (foovarValue == null || typeof foovarValue === 'string' || typeof foovarValue === 'number') {
      return foovarValue;
    } else if (Array.isArray(foovarValue)) {
      return foovarValue.map(convertToPlainObjectFromType);
    } else {
      return Object.keys(foovarValue).reduce(function (acc, k) {
        acc[k] = convertToPlainObjectFromType(foovarValue[k]);
        return acc;
      }, {});
    }
  }
}

module.exports = convertToPlainObject;