/**
 * External dependencies.
 */

var clone = require('clone');

function World(env, cwd) {
  this.env = env || clone(process.env);
  this.cwd = cwd;
}

module.exports = World;
