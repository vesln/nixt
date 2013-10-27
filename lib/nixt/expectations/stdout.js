/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var Out = require('./out');

/**
 * Stdout expectation.
 *
 * @constructor
 */

function Stdout() {
  Out.apply(this, arguments);
}

/**
 * Inherit from `Out`.
 */

inherits(Stdout, Out);

/**
 * Verify expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

Stdout.prototype.assert = function(result) {
  return this.verify(result, result.stdout);
};

/**
 * Primary export.
 */

module.exports = Stdout;
