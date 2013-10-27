/**
 * Command-line response formatter.
 *
 * Options:
 *
 *  - colors: Leave colors, default: true
 *  - newlines: Leave newlines, default: true
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

/**
 * Acknowledgments
 *
 * StripColorCodes - MIT License
 *
 * @param {String} str
 * @returns {String}
 * @api private
 */

Formatter.prototype.format = function(str) {
  str = str.replace(/\r?\n|\r$/, '');

  if (this.newlines === false) {
    str = str.replace(/\r?\n|\r/g, '');
  }

  if (this.colors === false) {
    str = str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
  }

  return str;
};

/**
 * Primary exports.
 */

module.exports = Formatter;
