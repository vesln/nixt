/**
 * Core dependencies.
 */

var exec = require('child_process').exec;

/**
 * Internal dependencies.
 */

var Result = require('./result');

/**
 * @constructor
 */

function Command() {}

/**
 * Set a command to be executed.
 *
 * @param {String} command
 * @api public
 */

Command.prototype.command = function(cmd) {
  this.cmd = cmd;
};

/**
 * Set a command timeout.
 *
 * @param {Number}
 * @api public
 */

Command.prototype.timeout = function(ms) {
  this.ms = ms;
};

/**
 * Set the current working directory for
 * the command.
 *
 * @param {String} path
 * @api public
 */

Command.prototype.cwd = function(cwd) {
  this.dir = cwd;
};

/**
 * @param {Function} `fn`
 * @api public
 */

Command.prototype.execute = function(fn) {
  var self = this;
  var options = { cwd: this.dir, timeout: this.ms };
  exec(this.cmd, options, function(err, stdout, stderr) {
    fn(new Result(self.cmd, err, stdout, stderr));
  });
};

/**
 * Primary export.
 */

module.exports = Command;
