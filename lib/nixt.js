/**
 * Primary exports.
 */

module.exports = require('./nixt/runner');
module.exports.register = require('./nixt/plugin');
module.exports.version = require('../package.json').version;
