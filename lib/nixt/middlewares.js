/**
 * Core dependencies.
 */

var exec = require('child_process').exec;
var fs = require('fs');

exports.mkdir = function(path) {
  return function(next) {
    fs.mkdir(path, done(next));
  };
};

exports.writeFile = function(path, data) {
  return function(next) {
    fs.writeFile(path, done(next));
  };
};

exports.rmdir = function(path) {
  return function(next) {
    fs.rmdir(path, done(next));
  };
};

exports.unlink = function(path) {
  return function(next) {
    fs.unlink(path, done(next));
  };
};

exports.exec = function(cmd) {
  return function(next) {
    exec(cmd, next);
  };
};

function done(next) {
  return function(err) {
    if (err) throw err;
    next();
  };
}
