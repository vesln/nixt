/**
 * Internal dependencies.
 */

var Runner = require('./runner');

/**
 * Primitive plugin support.
 *
 * It will add the supplied `fn to Runner's prototype.
 *
 * Examples
 *
 *  register({ name: fn, otherName: fn2 }); - will register both `fn` and `fn2`
 *  register(name, fn); - will register `fn`
 *
 * @param {String|Object} name
 * @param {Function} `fn`
 * @api public
 */

module.exports = function(name, fn) {
  var reg = null;

  if (Object(name) !== name) {
    reg = Object.create(null);
    reg[name] = fn;
  } else {
    reg = name;
  }

  Object.keys(reg).forEach(function(key) {
    Runner.prototype[key] = reg[key];
  });
};
