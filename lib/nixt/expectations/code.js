/**
 * Internal dependencies.
 */

var assert = require('../utils').assert;

/**
 * Exit code expectation.
 *
 * @param {Number} exit code
 * @constructor
 */

function Code(code) {
  this.code = +code;
}

/**
 * Verify the expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

Code.prototype.assert = function(result) {
  var actual = result.code();

  return assert(this.code, actual,
    '[' + this.constructor.name + '] `' + result.cmd + '`: Expected exit code: "' + this.code + '", actual: "' + actual + '"'
  );
};

/**
 * Primary export.
 */

module.exports = Code;
