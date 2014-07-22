/**
 * External dependencies.
 */

var S = require('string');

/**
 * Read interactive prompts on a stream and
 * write the associated response to another
 *
 * Largely borrowed from @jprichardson's module "node-suppose"
 * https://github.com/jprichardson/node-suppose/
 *
 * @param {Stream} Readable Stream to listen for prompts on.
 * @param {Stream} Writable Stream to write respones to.
 * @param {Array} An array of prompts {Regex|String}
 * @param {Array} An array of responses {String}
 * @api public
 */

exports.run = function(readable, writable, expects, responses) {
  var needNew = true, buffer = '', match = false;
  var expect = '', response = '';

  readable.on('data', function(data){
    buffer += data.toString();
    if (needNew) {
      expect = expects.shift();
      response = responses.shift();
      needNew = false;
    }

    if (typeof expect === 'string') {
      match = S(buffer).endsWith(expect);
    } else if (typeof expect === 'object') {
      match = (buffer.match(expect) != null);
    }

    if (match) {
      needNew = true;
      writable.write(response);
      match = false;

      if (expects.length === 0 && responses.length === 0) {
        writable.end();
      }
    }

  });
};
