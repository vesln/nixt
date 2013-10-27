/**
 * External dependencies.
 */

var AssertionError = require('assertion-error');

/**
 * Strip the last new line of the given string.
 *
 * @param {String} str
 * @returns {String}
 * @api public
 */

exports.strip = function(str) {
  return str.replace(/\n$/, '');
};

/**
 * Assert that `actual` is === to `expected. If it will return (note return not throw)
 * an `AssertionError`.
 *
 * Assertion error is a constructor for test and validation frameworks that implements
 * standardized Assertion Error specification.
 *
 * For more info go visit https://github.com/chaijs/assertion-error
 *
 * @param {Mixed} actual
 * @param {Mixed} expected [optional]
 * @param {String} error message
 * @api public
 */

exports.assert = function(actual, expected, message) {
  if (arguments.length === 2) {
    message = expected;
    expected = true;
  }

  if (actual !== expected) {
    return new AssertionError(message);
  }
};
