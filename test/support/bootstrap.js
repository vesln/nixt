/**
 * Core dependencies.
 */

var join = require('path').join;

/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

var nixt = require('../..');

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Nixt template that has the fixtures dir as a CWD.
 */

var nfixt = nixt().cwd(join(__dirname, '..', 'fixtures'));

/**
 * A helper method that will return a new
 * nixt instance with the fixtures path as a CWD.
 *
 * @returns {Runner}
 * @api public
 */

global.nfixt = function() {
  return nfixt.clone();
};
