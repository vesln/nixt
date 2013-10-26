/**
 * The primary entry point for every Nixt test.
 * It provides public interface that the users will interact with.
 * Every `Runner` instance can be cloned and this way templates are being
 * supported. The class can be instantiated with or without the `new` keyword.
 *
 * @constructor
 */

function Runner() {
  if (!(this instanceof Runner)) return new Runner;
}

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
 * TODO: implement
 *
 * @param {Regex|String} pattern
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.stdout = function(pattern) {
};

/**
 * Register a "stderr" expectation.
 *
 * TODO: implement
 *
 * @param {Regex|String} pattern
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.stderr = function(pattern) {
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
 * cd into a directory.
 *
 * TODO: implement
 *
 * @param {String} path
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.cd = function(path) {
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
 * TODO: implement
 *
 * @param {Function} `fn`
 * @returns {Runner} `this`
 * @api public
 */

Runner.prototype.end = function(fn) {
};

/**
 * Primary export.
 */

module.exports = Runner;
