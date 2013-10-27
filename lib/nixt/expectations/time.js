/**
 * Internal dependencies.
 */

var assert = require('../utils').assert;

/**
 * No timeout expectation.
 *
 * @constructor
 */

function Time() {}

/**
 * Verify the expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

Time.prototype.assert = function(result) {
  return assert(!result.killed(),
    '[' + this.constructor.name + '] `' + result.cmd + '`: Command execution terminated (timeout)'
  );
};

/**
 * Primary export.
 */

module.exports = Time;
