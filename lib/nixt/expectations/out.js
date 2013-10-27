/**
 * Internal dependencies.
 */

var assert = require('../utils').assert;

/**
 * Base expectation for std(out|err).
 *
 * @param {String|RegExp} expected
 * @constructor
 */

function Out(expected) {
  this.expected = expected;
}

/**
 * Verify an expectation.
 *
 * @param {Result} result
 * @param {String} actual
 * @api private
 */

Out.prototype.verify = function(result, actual) {
  var exp = null;

  if (this.expected instanceof RegExp) {
    exp = this.expected.test(actual);
  } else {
    exp = this.expected === actual;
  }

  return assert(exp,
    '[' + this.constructor.name + '] `' + result.cmd + '`: Expected "' + this.expected + '" to match "' + actual + '"'
  );
};

/**
 * Primary export.
 */

module.exports = Out;
