/**
 * External dependencies.
 */

var clone = require('clone');

/**
 * Internal dependencies.
 */

var Command = require('./command');
var TimeExpectation = require('./expectations/time');
var CodeExpectation = require('./expectations/code');
var StdoutExpectation = require('./expectations/stdout');
var StderrExpectation = require('./expectations/stderr');

/**
 * The primary entry point for every Nixt test.
 * It provides public interface that the users will interact with.
 * Every `Runner` instance can be cloned and this way templates are being
 * supported.
 *
 * Options:
 *
 *  - colors: true/false,   [true] - Strip colors from stdout and stderr
 *  - newLines: true/false, [true] - Strip new lines from stdout and stderr
 *
 * @param {Object} options
 * @constructor
 */

function Runner(options) {
  if (!(this instanceof Runner)) return new Runner(options);
  this.options = options || {};
  this.options.colors = this.options.colors || true;
  this.options.newLines = this.options.newLines || true;
  this.expectations = [];
  this.beforeFilters = [];
  this.afterFilters = [];
}

/**
 * Register a before filter.
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.before = function(fn) {
  this.beforeFilters.push(fn);
  return this;
};

/**
 * Register an after filter.
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.after = function(fn) {
  this.afterFilters.push(fn);
  return this;
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
 * Force an execution timeout.
 *
 * @param {Number} ms
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.timeout = function(ms) {
  this.command().timeout(ms);
  this.expectations.push(new TimeExpectation);
  return this;
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
 * Run the test.
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.end = function(fn) {
  var command = this.command();
  var expectations = this.expectations;
  var batch = this.beforeFilters.slice(0);

  batch.push(function() {
    command.execute(function(result) {
      var err = null;

      for (var i = 0, len = expectations.length; i < len; i++) {
        err = expectations[i].assert(result);
        if (err) break;
      }

      fn(err);
    });
  });

  batch = batch.concat(this.afterFilters.slice(0));

  function next() {
    var fn = batch.shift()
    if (!fn) return;
    if (fn.length) return fn(next);
    fn();
    next();
  }

  next();
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
