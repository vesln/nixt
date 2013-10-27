/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var Out = require('./out');

/**
 * Stderr expectation.
 *
 * @constructor
 */

function Stderr() {
  Out.apply(this, arguments);
}

/**
 * Inherit from `Out`.
 */

inherits(Stderr, Out);

/**
 * Verify expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

Stderr.prototype.assert = function(result) {
  return this.verify(result, result.stderr);
};

/**
 * Primary export.
 */

module.exports = Stderr;
