
/**
 * @constructor
 */

function Result(formatter, err, cmd) {
  this.err = err;
  this.cmd = cmd;
  this.stdout = formatter.stdout;
  this.stderr = formatter.stderr;
  this.code = err ? err.code : 0;
  this.killed = err && err.killed;
}

/**
 * Primary export.
 */

module.exports = Result;
