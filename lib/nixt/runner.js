/**
 * External dependencies.
 */

const clone = require('clone');
const { spawn } = require('child_process');

/**
 * Internal dependencies.
 */

const Batch = require('./batch');
const World = require('./world');
const expect = require('./expectations');
const middlewares = require('./middlewares');
const Result = require('./result');
const respond = require('./respond');

/**
 * The primary entry point for every Nixt test.
 * It provides public interface that the users will interact with.
 * Every `Runner` instance can be cloned and this way one can build
 * the so called "templates".
 *
 * Options:
 *
 *  - colors: default - true,       Strip colors from stdout and stderr when `false`
 *  - newlines: default - true,     Strip new lines from stdout and stderr when `false`
 *
 * Examples:
 *
 *  Instantiating the class:
 *
 *    nixt() // -> Runner
 *    new nixt // -> Runner
 *
 *  Simple stdout assertion:
 *
 *    nixt({ colors: false, newlines: false })
 *    .exec('todo clear')
 *    .exec('todo Buy milk')
 *    .run('todo ls')
 *    .stdout('Buy milk')
 *    .end(fn);
 *
 *  Stdout assertion:
 *
 *    nixt({ colors: false, newlines: false })
 *    .exec('todo clear')
 *    .run('todo')
 *    .stderr('Please enter a todo')
 *    .end(fn);
 *
 *  So repeating "todo clear" is simply ugly. You can avoid this by
 *  creating a "template".
 *
 *    var todo = nixt().before(clearTodos);
 *
 *  Later on:
 *
 *    todo.clone().exec...
 *
 * For more examples check the "README" file.
 *
 * @see Batch
 * @param {Object} options
 * @constructor
 */

function Runner(options) {
  if (!(this instanceof Runner)) return new Runner(options);
  options = options || {};
  this.options = options;
  this.batch = new Batch();
  this.world = new World();
  this.expectations = [];
  this.prompts = [];
  this.responses = [];
  this.baseCmd = '';
  this.standardInput = null;
}

/**
 * Register a before filter.
 *
 * @param {Function} fn
 * @returns {Runner} for chaining
 * @see Batch#addBefore
 * @api public
 */

Runner.prototype.before = function (fn) {
  this.batch.addBefore(fn);
  return this;
};

/**
 * Register an after filter.
 *
 * @param {Function} fn
 * @returns {Runner} for chaining
 * @see Batch#addAfter
 * @api public
 */

Runner.prototype.after = function (fn) {
  this.batch.addAfter(fn);
  return this;
};

/**
 * Set the current working directory for
 * the command that will be executed.
 *
 * @param {String} path
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.cwd = function (path) {
  this.world.cwd = path;
  return this;
};

/**
 * Specify a base command.
 *
 * Very convenient when testing the same executable
 * again and again.
 *
 * @param {String} command
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.base = function (cmd) {
  this.baseCmd = cmd;
  return this;
};

/**
 * Set data to pass to stdin.
 *
 * @param {String} data
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.stdin = function (data) {
  this.standardInput = data || '';
  return this;
};

/**
 * Set environment variable.
 *
 * @param {String} key
 * @param {String} value
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.env = function (key, val) {
  this.world.env[key] = val;
  return this;
};

/**
 * Specify a command to run.
 *
 * @param {String} command
 * @returns {Runner} for chaining
 * @see Batch#main
 * @api public
 */

Runner.prototype.run = function (cmd, fn) {
  this.batch.main(this.execFn(this.baseCmd + cmd));
  if (fn) this.end(fn);
  return this;
};

/**
 * Force an execution timeout.
 *
 * @param {Number} ms
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.timeout = function (ms) {
  this.world.timeout = ms;
  this.expect(expect.time(ms));
  return this;
};

/**
 * Register a "stdout" expectation.
 *
 * @param {Regex|String} pattern
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.stdout = function (pattern) {
  this.expect(expect.stdout(pattern));
  return this;
};

/**
 * Register a "stderr" expectation.
 *
 * @param {Regex|String} pattern
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.stderr = function (pattern) {
  this.expect(expect.stderr(pattern));
  return this;
};

/**
 * Register an exit code expectation.
 *
 * @param {Number} code
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.code = function (code) {
  this.expect(expect.code(code));
  return this;
};

/**
 * Check if a file or a directory exists.
 *
 * @param {String} path
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.exist = function (path) {
  this.expect(expect.exists(path));
  return this;
};

/**
 * Check if a file or a directory does not exist.
 *
 * @param {String} path
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.notExist = function(path) {
  this.expect(expect.notExists(path));
  return this;
};

/**
 * Match the content of a file.
 *
 * @param {Regex|String} pattern
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.match = function (file, pattern) {
  this.expect(expect.match(file, pattern));
  return this;
};

/**
 * Create a new directory.
 *
 * @param {String} path
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.mkdir = function (path) {
  this.batch.add(middlewares.mkdir(path));
  return this;
};

/**
 * Execute a command.
 *
 * @param {String} command
 * @param {World} world - env vars, cwd
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.exec = function (cmd, world) {
  world = world || this.world;
  this.batch.add(middlewares.exec(cmd, world));
  return this;
};

/**
 * Create a new file with the given `content`.
 *
 * @param {String} path
 * @param {String} data [optional]
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.writeFile = function (path, data) {
  this.batch.add(middlewares.writeFile(path, data));
  return this;
};

/**
 * Remove a directory.
 *
 * @param {String} path
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.rmdir = function (path) {
  this.batch.add(middlewares.rmdir(path));
  return this;
};

/**
 * Remove a file.
 *
 * @param {String} path
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.unlink = function (path) {
  this.batch.add(middlewares.unlink(path));
  return this;
};

/**
 * Register an interactive prompt
 *
 * @param {Regex|String} pattern
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.on = function (pattern) {
  this.prompts.push(pattern);
  return this;
};

/**
 * Register an interactive prompt response
 *
 * @param {String} response
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.respond = function (response) {
  this.responses.push(response);
  return this;
};

/**
 * Run the test.
 *
 * @param {Function} fn
 * @returns {Runner} for chaining
 * @api public
 */

Runner.prototype.end = function (fn) {
  if (!this.batch.hasMain()) {
    throw new Error('Please provide a command to run. Hint: `nixt#run`');
  }
  this.batch.run(fn);
};

/**
 * Clone the runner. Give basic support for templates.
 *
 * @returns {Runner} clone of the current instance
 * @api public
 */

Runner.prototype.clone = function () {
  return clone(this, false);
};

/**
 * Register an expectation.
 *
 * @param {Function} fn
 * @api public
 */

Runner.prototype.expect = function (fn) {
  this.expectations.push(fn);
  return this;
};

/**
 * Return a function that will execute
 * the command.
 *
 * @returns {Function}
 * @api private
 */

Runner.prototype.execFn = function (cmd) {
  const self = this;
  const args = require('shell-quote').parse(cmd);
  const bin = args.shift(0);

  return function (fn) {
    // Allow .run('') without attempting
    if (cmd === '') { fn(undefined); return; }

    const child = spawn(bin, args, self.world);
    let stdout = '';
    let stderr = '';
    let err;

    if (self.standardInput != null) {
      child.stdin.end(self.standardInput);
    }

    if (self.world.timeout) {
      setTimeout(() => {
        child.kill();
        err = { killed: true };
      }, self.world.timeout);
    }

    respond.run(child.stdout, child.stdin, self.prompts, self.responses);

    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });

    child.on('close', (code) => {
      let error = null;
      const result = new Result(cmd, code, self.options).parse(stdout, stderr, err);

      for (let i = 0, len = self.expectations.length; i < len; i++) {
        error = self.expectations[i](result);
        if (error) break;
      }

      fn(error);
    });
  };
};

/**
 * Primary export.
 */

module.exports = Runner;
