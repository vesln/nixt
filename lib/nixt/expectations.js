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
    return assert(code, result.code,
      '`' + result.cmd + '`: Expected exit code: "' + code + '", actual: "' + result.code + '"'
    );
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
    return assert(!result.killed(),
      '`' + result.cmd + '`: Command execution terminated (timeout)'
    );
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
    return assertOut(result.stderr, expected,
      '`' + result.cmd + '`: Expected stderr to match "' + expected + '". Actual: "' + result.stderr + '"'
    );
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
    return assertOut(result.stdout, expected,
      '`' + result.cmd + '`: Expected stdout to match "' + expected + '". Actual: "' + result.stdout + '"'
    );
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
    var message = '`' + result.cmd + '`: Expected "' + path + '" to exist.';
    return assert(fs.existsSync(path), message);
  };
};

/**
 * Assert stdout or stderr.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} error message
 * @returns {AssertionError|null}
 * @api private
 */

function assertOut(actual, expected, message) {
  var statement = expected instanceof RegExp
    ? expected.test(actual)
    : expected === actual;

  return assert(statement, message);
}

/**
 * Assert that `actual` is === to `expected. If it will return (note return not throw)
 * an `AssertionError`.
 *
 * Assertion error is a constructor for test and validation frameworks that implements
 * standardized Assertion Error specification.
 *
 * For more info go visit https://github.com/chaijs/assertion-error
 *
 * @param {Mixed} actual
 * @param {Mixed} expected [optional]
 * @param {String} error message
 * @api private
 */

function assert(actual, expected, message) {
  if (arguments.length === 2) {
    message = expected;
    expected = true;
  }

  if (actual !== expected) {
    return new AssertionError(message);
  }
}
