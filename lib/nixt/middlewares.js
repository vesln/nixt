/**
 * Core dependencies.
 */

var exec = require('child_process').exec;
var fs = require('fs');

/**
 * Asynchronous mkdir(2)
 *
 * @param {String} path
 * @returns {Function} middleware
 * @api public
 */

exports.mkdir = function(path) {
  return function(next) {
    fs.mkdir(path, done(next));
  };
};

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * `data` can be a string or a buffer.
 *
 * @param {String} path
 * @param {Buffer|String} data
 * @returns {Function} middleware
 * @api public
 */

exports.writeFile = function(path, data) {
  return function(next) {
    fs.writeFile(path, data, done(next));
  };
};

/**
 * Asynchronous rmdir(2).
 *
 * @param {String} path
 * @returns {Function} middleware
 * @api public
 */

exports.rmdir = function(path) {
  return function(next) {
    fs.rmdir(path, done(next));
  };
};

/**
 * Asynchronous unlink(2).
 *
 * @param {String} path
 * @returns {Function} middleware
 * @api public
 */

exports.unlink = function(path) {
  return function(next) {
    fs.unlink(path, done(next));
  };
};

/**
 * Run a command in a shell.
 *
 * @param {String} the command to run
 * @returns {Function} middleware
 * @api public
 */

exports.exec = function(cmd) {
  return function(next) {
    exec(cmd, next);
  };
};

/**
 * Callback generator for middlewares. Throw an error if any.
 *
 * @param {Function} next
 * @returns {Function}
 * @api public
 */

function done(next) {
  return function(err) {
    if (err) throw err;
    next();
  };
}
