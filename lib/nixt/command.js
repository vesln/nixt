/**
 * Core dependencies.
 */

var exec = require('child_process').exec;

/**
 * Internal dependencies.
 */

var Result = require('./result');

/**
 * Command to execute.
 *
 * This class is a simple wrapper of `child_process#exec`. All it does is
 * executing the command with the supplied options and then return a new
 * `Result`. It delegates the formatting of stdout and stderr to `Formatter`.
 *
 * @param {Formatter} formatter
 * @see child_process#exec
 * @see Formatter
 * @see Result
 * @constructor
 */

function Command(formatter) {
  this.formatter = formatter;
}

/**
 * Set a command to be executed.
 *
 * @param {String} command
 * @api public
 */

Command.prototype.set = function(cmd) {
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
 * Execute the command, load stdout and stderr into
 * the formatter and return a new `Result`.
 *
 * @param {Function} fn
 * @api public
 */

Command.prototype.exec = function(fn) {
  var self = this;
  var options = { cwd: this.dir, timeout: this.ms };

  exec(this.cmd, options, function(err, stdout, stderr) {
    self.formatter.load(stdout, stderr);
    fn(new Result(self.formatter, err, self.cmd));
  });
};

/**
 * Primary export.
 */

module.exports = Command;
