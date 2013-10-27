/**
 * Command-line response formatter.
 *
 * @param {Object} options
 * @constructor
 */

function Formatter(options) {
  options = options || {};
  this.colors = options.colors;
  this.newlines = options.newlines;
}

/**
 * Format the command-line result.
 *
 * @param {String} stdout
 * @param {String} stderr
 * @api public
 */

Formatter.prototype.load = function(stdout, stderr) {
  this.stdout = this.format(stdout);
  this.stderr = this.format(stderr);
};

Formatter.prototype.format = function(str) {
  str = str.replace(/\r?\n|\r$/, '');

  if (this.newlines === false) {
    str = str.replace(/\r?\n|\r/g, '');
  }

  return str;
};

/**
 * Primary exports.
 */

module.exports = Formatter;
