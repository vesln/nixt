/**
 * Internal dependencies.
 */

var utils = require('./utils');

/**
 * @param {String} command
 * @param {Object} error
 * @param {String} stdout
 * @param {String} stderr
 * @constructor
 */

function Result(cmd, err, stdout, stderr) {
  this.cmd = cmd;
  this.err = err;
  this.stdoutRaw = stdout;
  this.stderrRaw = stderr;
  this.stdout = utils.strip(stdout);
  this.stderr = utils.strip(stderr);
}

/**
 * @returns {Number}
 * @api public
 */

Result.prototype.code = function() {
  return this.err
    ? this.err.code
    : 0;
};

Result.prototype.killed = function() {
  return this.err && this.err.killed;
};

/**
 * Expose `Result`.
 */

module.exports = Result;
