/**
 * Command-line response formatter.
 *
 * Options:
 *
 *  - colors      Leave colors,   default: true
 *  - newlines    Leave newlines, default: true
 *
 * Notes:
 *
 *  - Probably it doesn't make a lot of sense to store the result into
 *    the given instance. It could be just a simple helper, however
 *    by using the current design the communication between `Runner`
 *    `Command` and `Result` is quite simplified.
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
  this.stdout = this.strip(stdout);
  this.stderr = this.strip(stderr);
};

/**
 * `Formatter#strip` will do the following:
 *
 * - Remove the last new line symbol from the string (always)
 * - Strip new lines (optional, see `options`)
 * - Strip colors (optional, see `options`)
 *
 * Acknowledgments:
 *
 *  - StripColorCodes - MIT License
 *
 * @param {String} str
 * @returns {String}
 * @api private
 */

Formatter.prototype.strip = function(str) {
  str = str.replace(/\r?\n$/, '');

  if (this.newlines === false) {
    str = str.replace(/\r?\n/g, '');
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
