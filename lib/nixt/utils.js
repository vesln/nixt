/**
 * Strip the last new line of the given string.
 *
 * @param {String} str
 * @returns {String}
 * @api public
 */

exports.strip = function(str) {
  return str.replace(/\n$/, '');
};
