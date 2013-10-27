/**
 * Internal dependencies.
 */

var Command = require('./command');
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
 *
 * @param {Object} options
 * @constructor
 */

function Runner(options) {
  if (!(this instanceof Runner)) return new Runner(options);
  this.expectations = [];
}

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
 * Specify a command to run.
 *
 * TODO: implement
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
 * Clone the runner. Basic support for templates.
 *
 * TODO: implement
 *
 * @returns {Runner} clone of the current instance
 * @api public
 */

Runner.prototype.clone = function() {
};

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
 * TODO: implement
 *
 * @param {Number} code
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.code = function(code) {
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
 * Match the content of a file.
 *
 * TODO: implement
 *
 * @param {Regex|String} pattern
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.match = function(pattern) {
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
 * Type.
 *
 * TODO: implement
 *
 * @param {String} input
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.stdin = function(input) {
};

/**
 * Run the test.
 *
 * TODO: handle multiple errors
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.end = function(fn) {
  var self = this;

  this.command().execute(function(result) {
    var err = null;

    self.expectations.forEach(function(expectation) {
      err = expectation.assert(result);
    });

    fn(err);
  });
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
