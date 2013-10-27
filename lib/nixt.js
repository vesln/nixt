/**
 * Primary export.
 */

module.exports = require('./nixt/runner');

/**
 * Module version.
 */

module.exports.version = require('../package.json').version;

/**
 * Plugin support.
 */

module.exports.register = require('./nixt/plugin');
