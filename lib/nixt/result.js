/**
 * Internal dependencies.
 */

var utils = require('./utils');

/**
 * @constructor
 */

function Result(err, stdout, stderr, options) {
  options = options || {};
  this.err = err;
  this.stdoutRaw = stdout;
  this.stderrRaw = stderr;
  this.cmd = options.cmd;
  this.stdout = utils.strip(stdout);
  this.stderr = utils.strip(stderr);
  this.code = this.err ? this.err.code : 0;
  this.killed = this.err && this.err.killed;
}

/**
 * Primary export.
 */

module.exports = Result;
