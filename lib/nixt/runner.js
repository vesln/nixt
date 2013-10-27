/**
 * External dependencies.
 */

var clone = require('clone');

/**
 * Internal dependencies.
 */

var Command = require('./command');
var CodeExpectation = require('./expectations/code');
var StdoutExpectation = require('./expectations/stdout');
var StderrExpectation = require('./expectations/stderr');

/**
 * The primary entry point for every Nixt test.
 * It provides public interface that the users will interact with.
 * Every `Runner` instance can be cloned and this way templates are being
 * supported.
 *
 * Example:
 *
 *  Runner(options)
 *  new Runner(options);
 *
 * Options:
 *
 *  - colors: true/false, [true] - Strip colors from stdout and stderr
 *  - nl: true/false, [false] - Strip new lines from stdout and stderr
 *
 * @param {Object} options
 * @constructor
 */

function Runner(options) {
  if (!(this instanceof Runner)) return new Runner(options);
  this.expectations = [];
}

/**
 * Register a before filter.
 *
 * TODO: implement
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.before = function(fn) {
};

/**
 * Register an after filter.
 *
 * TODO: implement
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.after = function(fn) {
};

/**
 * Set the current working directory for
 * the command that will be executed.
 *
 * @param {String} path
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.cwd = function(path) {
  this.command().cwd(path);
  return this;
};

/**
 * Pipe.
 *
 * TODO: implement
 *
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.pipe = function() {
};

/**
 * Force an execution timeout.
 *
 * TODO: implement
 *
 * @param {Number} ms
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.timeout = function(ms) {
};

/**
 * Specify a command to run.
 *
 * @param {String} command
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.run = function(command) {
  this.command().command(command);
  return this;
};

/**
 * Register a "stdout" expectation.
 *
 * @param {Regex|String} pattern
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.stdout = function(pattern) {
  this.expectations.push(new StdoutExpectation(pattern));
  return this;
};

/**
 * Register a "stderr" expectation.
 *
 * @param {Regex|String} pattern
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.stderr = function(pattern) {
  this.expectations.push(new StderrExpectation(pattern));
  return this;
};

/**
 * Register an exit code expectation.
 *
 * @param {Number} code
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.code = function(code) {
  this.expectations.push(new CodeExpectation(code));
  return this;
};

/**
 * Match the content of a file.
 *
 * TODO: implement
 *
 * @param {Regex|String} pattern
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.match = function(file, pattern) {
};

/**
 * Check if a file or a directory exists.
 *
 * TODO: implement
 *
 * @param {String} path
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.exist = function(path) {
};

/**
 * Create a new directory.
 *
 * TODO: implement
 *
 * @param {String} path
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.mkdir = function(path) {
};

/**
 * Create a new file with the given `content`.
 *
 * TODO: implement
 *
 * @param {String} path
 * @param {String} content [optional]
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.touch = function(path, content) {
};

/**
 * Remove a directory or a file.
 *
 * TODO: implement
 *
 * @param {String} path
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.rm = function(path) {
};

/**
 * Type.
 *
 * TODO: implement
 *
 * @param {String} input
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.type = function(input) {
};

/**
 * Run the test.
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.end = function(fn) {
  var self = this;

  this.command().execute(function(result) {
    var err = null;

    for (var i = 0, len = self.expectations.length; i < len; i++) {
      err = self.expectations[i].assert(result);
      if (err) break;
    }

    fn(err);
  });
};

/**
 * Clone the runner. Give basic support for templates.
 *
 * @returns {Runner} clone of the current instance
 * @api public
 */

Runner.prototype.clone = function() {
  return clone(this, false);
};

/**
 * Return the current command (or create a new one
 * if none exists yet).
 *
 * @returns {Command}
 * @api private
 */

Runner.prototype.command = function() {
  this._command = this._command || new Command;
  return this._command;
};

/**
 * Primary export.
 */

module.exports = Runner;
