/**
 * Core dependencies.
 */

var fs = require('fs');

/**
 * External dependencies.
 */

var AssertionError = require('assertion-error');

/**
 * Return an exit code expectation.
 *
 * @param {Number} expected exit code.
 * @returns {Function}
 * @api public
 */

exports.code = function(code) {
  return function(result) {
    if (code !== result.code) {
      return error(result, 'Expected exit code: "' + code + '", actual: "' + result.code + '"');
    }
  };
};

/**
 * Return no timeout expectation.
 *
 * @returns {Function}
 * @api public
 */

exports.time = function() {
  return function(result) {
    if (result.killed()) {
      return error(result, 'Command execution terminated (timeout)');
    }
  };
};

/**
 * Return a stderr expectation.
 *
 * @param {String|RegExp} expected string or regular express to match
 * @returns {Function}
 * @api public
 */

exports.stderr = function(expected) {
  return function(result) {
    var msg = 'Expected stderr to match "' + expected + '". Actual: "' + result.stderr + '"';
    return assertOut(result.stderr, expected, result, msg);
  };
};

/**
 * Return a stdout expectation.
 *
 * @param {String|RegExp} expected string or regular express to match
 * @returns {Function}
 * @api public
 */

exports.stdout = function(expected) {
  return function(result) {
    var msg = 'Expected stdout to match "' + expected + '". Actual: "' + result.stdout + '"';
    return assertOut(result.stdout, expected, result, msg);
  };
};

/**
 * Verify that a `path` exists.
 *
 * @param {String} path
 * @returns {Function}
 * @api public
 */

exports.exists = function(path) {
  return function(result) {
    if (fs.existsSync(path) !== true) {
      return error(result, 'Expected "' + path + '" to exist.');
    }
  };
};

/**
 * Verify that `path`'s data matches `data`.
 *
 * @param {String} path
 * @param {String|RegExp} data
 * @returns {Function}
 * @api public
 */

exports.match = function(path, data) {
  return function(result) {
    var contents = fs.readFileSync(path, { encoding: 'utf8' });
    var statement = data instanceof RegExp
      ? data.test(contents)
      : data === contents;

    if (statement !== true) {
      return error(result, 'Expected "' + path + '" to match "' + data + '", but it was: "' + contents + '"');
    }
  };
};

/**
 * Assert stdout or stderr.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {Result} result
 * @param {String} error message
 * @returns {AssertionError|null}
 * @api private
 */

function assertOut(actual, expected, result, message) {
  var statement = expected instanceof RegExp
    ? expected.test(actual)
    : expected === actual;

  if (statement !== true) {
    return error(result, message);
  }
}

/**
 * Create and return a new `AssertionError`.
 * It will assign the given `result` to it, it will also prepend the executed command
 * to the error message.
 *
 * Assertion error is a constructor for test and validation frameworks that implements
 * standardized Assertion Error specification.
 *
 * For more info go visit https://github.com/chaijs/assertion-error
 *
 * @param {Result} result
 * @param {String} error message
 * @returns {AssertionError}
 * @api private
 */

function error(result, message) {
  var error = new AssertionError('`' + result.cmd + '`: ' + message);
  error.result = result;
  return error;
}
